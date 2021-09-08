import React, { useState, useEffect, useMemo, useContext } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { User, CheckUserField } from '../../components/User/User.js';
import { useSearchBarReducer } from '../../hooks/useSearchBarReducer/useSearchBarReducer.js';
import { Pagination } from '../../components/Pagination/Pagination.js';
import { Store } from '../../Store';
import spinner from '../../assets/img/spinner.gif';
import '../../index.scss';

const VerificationHeaderSubtitles = () => {
	return (
		<>
			<div className='verification__noname verification__noname--start'>
				<p className='verification__text'>Аккаунт</p>
			</div>
			<div className='verification__noname'>
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
						statusField={statusField}
						avatar={item['avatar_url']}
						realname={item['real_name']}
						username={item.username}
						followers={item.loccityid || item.followers}
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

const MainBlock = ({ state, reducerStates }) => {
	return (
		<>
			{state.searchCheckHistoryLength === 0 ||
			state.searchCheckHistory.length === 0 ? (
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
								data={state.searchCheckHistory}
							/>
						</>
					</div>
				</>
			)}
		</>
	);
};

function Verification() {
	const reducerStates = useSearchBarReducer();
	const [state, dispatch] = useContext(Store);
	let PageSize = 10;

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return state.searchCheckHistoryLength;
	}, [currentPage]);

	useEffect(() => {
		async function fetchDataID(name) {
			if (name === '') return;
			reducerStates.dispatchChange('isLoaded', false);
			try {
				const response = await fetch(
					`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&vanityurl=${name}`
				);
				const responseJSON = await response.json();
				const steamID = await responseJSON.response.steamid;

				const userProfile = await fetch(
					`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${steamID}`
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
									? 'verification active'
									: 'verification'
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
