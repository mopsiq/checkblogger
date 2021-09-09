import React, { useState, useEffect, useContext, useMemo } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import {
	User,
	ReportUserField,
	PendingReport,
} from '../../components/User/User.js';
import { useSearchBarReducer } from '../../hooks/useSearchBarReducer/useSearchBarReducer.js';
import { Pagination } from '../../components/Pagination/Pagination.js';
import { Store } from '../../Store';
import spinner from '../../assets/img/spinner.gif';
import '../../index.scss';

const VerificationHeaderSubtitles = ({}) => {
	return (
		<>
			<div className='verification__noname verification__noname--start'>
				<p className='verification__text'>Аккаунт</p>
			</div>
			<div className='verification__noname'>
				<p className='verification__text'>Подписчики</p>
			</div>
			<div className='verification__noname'>
				<p className='verification__text'>Вовлеченность</p>
			</div>
			<div className='verification__noname'>
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

const MainBlock = ({ state, reducerStates }) => {
	return (
		<>
			{state.reportUsersLength === 0 || state.reportUsers.length === 0 ? (
				<>
					<div className='verification__header'>
						<SearchingHelp />
					</div>
				</>
			) : (
				<>
					<div className='verification__header'>
						<VerificationHeaderSubtitles />
					</div>

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
								id={index}
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
	let PageSize = 10;

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return state.reportUsersLength;
	}, [currentPage]);

	useEffect(() => {
		async function fetchDataID(name) {
			if (name === '') return;
			reducerStates.dispatchChange('isLoaded', false);
			try {
				const response = await fetch(
					`http://localhost:9000/steamApiKey/?name=${name}`
				);
				const responseJSON = await response.json();
				const steamID = await responseJSON.response.steamid;

				const userProfile = await fetch(
					`http://localhost:9000/steamApiUser/?steamdID=${steamID}`
				);
				if (userProfile.status !== 200) throw new Error('HTTP error');
				const userJSON = await userProfile.json();
				const data = await userJSON.response.players[0];
				if (data === undefined) throw new Error('Invalid data');
				reducerStates.dispatchChange('isError', false);
				reducerStates.dispatchChange('isLoaded', true);
				reducerStates.dispatchChange('data', data);
			} catch (error) {
				reducerStates.dispatchChange('isError', error.message);
				reducerStates.dispatchChange('isLoaded', true);
			}
		}

		fetchDataID(reducerStates.localStates.value);

		return () => {
			reducerStates.dispatchChange('data', {});
		};
	}, [reducerStates.localStates.value]);

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
