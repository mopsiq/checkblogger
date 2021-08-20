import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import spinner from '../../assets/img/spinner.gif';
import {
	User,
	TrashIconButton,
	UserButtonsField,
	Package,
	UserTextInfo,
	UserCheckingStats,
	ReadyStatsIcon,
} from '../../components/User/User.js';

import '../../index.scss';

const ErrorBlock = () => {
	return (
		<>
			<h3>error</h3>
		</>
	);
};
const Spinner = ({}) => {
	return (
		<>
			<div className='result__loading'>
				<img
					className='result__spinner'
					src={spinner}
					alt='spinner'
				></img>
			</div>
		</>
	);
};

const UserBlock = ({ info, error, focus }) => {
	return (
		<div>
			{error ? (
				'Error message'
			) : (
				<User focus={focus} dataFields={info}>
					<TrashIconButton />
					<UserButtonsField
						textButton={'Проверить'}
						icon={<Package className='bundle__icon' />}
					/>
				</User>
			)}
		</div>
	);
};

const ResultSearch = ({ info, loader, focus }) => {
	return (
		<div className='result'>
			{loader ? (
				<UserBlock info={info} error={false} focus={focus} />
			) : (
				<Spinner />
			)}
		</div>
	);
};

function SearchBar({ stateFields, setValue, setFocus, data }) {
	const root = useRef();

	useEffect(() => {
		const checkingRoot = (e) => {
			if (root.current) {
				root.current.contains(e.target) || setValue('');
				root.current.contains(e.target) || setFocus('');
			}
			return false;
		};

		document.addEventListener('click', checkingRoot);

		return () => {
			document.removeEventListener('click', checkingRoot);
		};
	}, [setValue, setFocus]);

	return (
		<>
			<form className={stateFields.value ? 'search active' : 'search'}>
				<div ref={root} className='search__container'>
					<SearchIcon className='search__icon' />
					<input
						spellCheck='false'
						placeholder='Введите юзернейм блогера'
						className='search__input'
						value={stateFields.value}
						onChange={(e) => setValue(e.target.value)}
						onFocus={() => setFocus(true)}
					/>
				</div>
				{stateFields.value ? (
					<ResultSearch
						info={data}
						loader={stateFields.isLoaded}
						focus={stateFields.activeFocus}
					/>
				) : null}
			</form>
		</>
	);
}

export { SearchBar };
