import React, { useState, useMemo, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import { User } from '../../components/User/User.js';
import { CheckUserField } from '../../components/User/UserTypesFields/UserTypesFields.js';
import { useSearchBarReducer } from '../../hooks/useSearchBarReducer/useSearchBarReducer.js';
import { useFetch } from '../../hooks/useFetch/useFetch.js';
import { Pagination } from '../../components/Pagination/Pagination.js';
import { Store } from '../../Store';
import spinner from '../../assets/img/spinner.gif';
import '../../index.scss';

const VerificationHeaderSubtitles = () => {
	return (
		<>
			<div className='accounts__subtitle accounts__subtitle--start'>
				<p className='verification__text'>Аккаунт</p>
			</div>
			<div className='accounts__subtitle'>
				<p className='verification__text'>Подписчики</p>
			</div>
		</>
	);
};
const SearchingHelp = () => {
	return (
		<>
			<span className='search__help'>
				Для выполнения проверки воспользуйтесь поиском
			</span>
		</>
	);
};

const InstagramAccounts = ({ statusField, data }) => {
	return (
		<>
			{data.slice(0, 10).map((item, index) => (
				<li key={item.id}>
					<User
						// statusField={statusField}
						avatar={item['avatar_url']}
						realname={item['real_name']}
						username={item.username}
						followers={item.loccityid || item.followers}
						downloaded={''}
						payment={'false'}
					>
						<CheckUserField
							state={data}
							field='searchCheckHistory'
							id={index}
						/>
					</User>
				</li>
			))}
		</>
	);
};

const SpinnerPage = () => {
	return (
		<>
			<div className='result__loading page'>
				<img
					className='result__spinner'
					src={spinner}
					alt='spinner'
				></img>
				<p>Загружаю результаты...</p>
			</div>
		</>
	);
};

const MainBlock = ({ state, reducerStates, size }) => {
	return (
		<>
			{state.searchCheckHistoryLength === 0 ||
			state.searchCheckHistory.length === 0 ? (
				<>
					<div className='accounts__subtitles accounts__subtitles--searching'>
						<SearchingHelp />
					</div>
				</>
			) : (
				<>
					{size && (
						<div className='accounts__subtitles accounts__subtitles--verification'>
							<VerificationHeaderSubtitles />
						</div>
					)}

					<div className='verification__body'>
						<>
							<InstagramAccounts
								// statusField={
								// 	reducerStates.localStates.activeFocus
								// }
								data={state.searchCheckHistory}
							/>
						</>
					</div>
				</>
			)}
		</>
	);
};

const PreLoadBlock = ({ loaded, Component, ...rest }) => {
	if (loaded) {
		return <SpinnerPage />;
	}
	return <Component {...rest} />;
};

function Verification() {
	const reducerStates = useSearchBarReducer();
	const [state, dispatch] = useContext(Store);
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

	let PageSize = 10;

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return state.searchCheckHistoryLength;
	}, [currentPage]);

	const localFetch = useFetch('steam', reducerStates);

	return (
		<>
			{state.error ? (
				<>
					<div className='container'>
						<p>Error block</p>
					</div>
				</>
			) : (
				<>
					<div className='container'>
						{isMobile && (
							<SearchBar
								requestName='steam'
								// stateFields={reducerStates.localStates}
								// setValue={(e) =>
								// 	reducerStates.dispatch({
								// 		type: 'HANDLE_INPUT',
								// 		field: 'value',
								// 		payload: e,
								// 	})
								// }
								// setFocus={(e) =>
								// 	reducerStates.dispatch({
								// 		type: 'BOOLEAN_CHANGE',
								// 		field: 'activeFocus',
								// 		payload: e,
								// 	})
								// }
								// data={reducerStates.localStates.data}
							/>
						)}

						<div
							className='verification'
							// className={
							// 	reducerStates.localStates.activeFocus ||
							// 	reducerStates.localStates.value
							// 		? 'verification active'
							// 		: 'verification'
							// }
						>
							<PreLoadBlock
								loaded={state.loaded}
								Component={MainBlock}
								state={state}
								reducerStates={reducerStates}
								size={isMobile}
							/>
							<Pagination
								className={
									state.searchCheckHistory.length === 0
										? 'pagination-bar hidden'
										: 'pagination-bar'
								}
								currentPage={currentPage}
								totalCount={state.searchCheckHistoryLength}
								pageSize={PageSize}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export { Verification };
