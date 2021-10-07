import React, { useState, useContext, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import { User } from '../../components/User/User.js';
import {
	ReportUserField,
	PendingReport,
} from '../../components/User/UserTypesFields/UserTypesFields.js';
import { useSearchBarReducer } from '../../hooks/useSearchBarReducer/useSearchBarReducer.js';
import { Pagination } from '../../components/Pagination/Pagination.js';
import { Store } from '../../Store';
import spinner from '../../assets/img/spinner.gif';
import '../../index.scss';
import { useFetch } from '../../hooks/useFetch/useFetch.js';

const VerificationHeaderSubtitles = ({}) => {
	return (
		<>
			<div className='accounts__subtitle accounts__subtitle--start'>
				<p className='verification__text'>Аккаунт</p>
			</div>
			<div className='accounts__subtitle'>
				<p className='verification__text'>Подписчики</p>
			</div>
			<div className='accounts__subtitle'>
				<p className='verification__text'>Вовлеченность</p>
			</div>
			<div className='accounts__subtitle'>
				<p className='verification__text'>Качественная аудитория</p>
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
			{state.reportUsersLength === 0 || state.reportUsers.length === 0 ? (
				<>
					<div className='accounts__subtitles accounts__subtitles--report'>
						<SearchingHelp />
					</div>
				</>
			) : (
				<>
					{size && (
						<div className='accounts__subtitles accounts__subtitles--report'>
							<VerificationHeaderSubtitles />
						</div>
					)}

					<div className='verification__body'>
						<>
							<InstagramAccounts
								statusField={
									reducerStates.localStates.activeFocus
								}
								data={state.reportUsers}
							/>
						</>
					</div>
				</>
			)}
		</>
	);
};

const InstagramAccounts = ({ statusField, data }) => {
	return (
		<>
			{data.slice(0, 10).map((item, index) => (
				<li key={item.id}>
					<User
						statusField={statusField}
						avatar={item['avatar_url']}
						realname={item['real_name']}
						username={item.username}
						followers={item.followers}
						downloaded={item['date_download']}
						payment={item['status_payment']}
					>
						{JSON.parse(item['status_payment']) ? (
							<ReportUserField
								indicatorOne={item.involment}
								indicatorSecond={item.qualityAudience}
								state={data}
								field={'reportUsers'}
								id={item.id}
							/>
						) : (
							<PendingReport date={item['data_created']} />
						)}
					</User>
				</li>
			))}
		</>
	);
};

function Report() {
	const reducerStates = useSearchBarReducer();
	const [state, dispatch] = useContext(Store);
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });
	let PageSize = 10;

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return state.reportUsersLength;
	}, [currentPage]);

	const localFetch = useFetch('bd', reducerStates);

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
								stateFields={reducerStates.localStates}
								setValue={(e) =>
									reducerStates.dispatch({
										type: 'HANDLE_INPUT',
										field: 'value',
										payload: e,
									})
								}
								setFocus={(e) =>
									reducerStates.dispatch({
										type: 'BOOLEAN_CHANGE',
										field: 'activeFocus',
										payload: e,
									})
								}
								data={reducerStates.localStates.data}
							/>
						)}

						<div
							className={
								reducerStates.localStates.activeFocus ||
								reducerStates.localStates.value
									? 'report active'
									: 'report'
							}
						>
							{state.reportUsers.length === 0 || state.loaded ? (
								<SpinnerPage />
							) : (
								<MainBlock
									state={state}
									reducerStates={reducerStates}
									size={isMobile}
								/>
							)}
							<Pagination
								className={
									state.reportUsers.length === 0
										? 'pagination-bar hidden'
										: 'pagination-bar'
								}
								currentPage={currentPage}
								totalCount={state.reportUsersLength}
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

export { Report };
