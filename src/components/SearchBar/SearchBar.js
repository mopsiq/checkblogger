import React, { useState, useEffect, useRef } from 'react';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
	BodyScrollOptions,
} from 'body-scroll-lock';
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

const ErrorBlock = ({ errorMessage }) => {
	const errorStatus = {
		'HTTP error':
			'Что-то пошло не так.. Попробуйте перезагрузить страницу ',
		'Invalid data': 'Такого пользователя нет :(',
	};
	return (
		<>
			<p className='error'>{errorStatus[errorMessage]}</p>
		</>
	);
};

const FunctionalButtonsPart = () => {
	return (
		<>
			<TrashIconButton />,
			<UserButtonsField
				textButton={'Проверить'}
				icon={<Package className='bundle__icon' />}
			/>
		</>
	);
};
const Spinner = () => {
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
		<>
			{error ? (
				<ErrorBlock errorMessage={error} />
			) : (
				<User focus={focus} dataFields={info}>
					{info.loccityid < 500 ? (
						<p className='account__inactive'>
							&#60;500 подписчиков, невозможно проверить
							пользователя
						</p>
					) : (
						<FunctionalButtonsPart />
					)}
				</User>
			)}
		</>
	);
};

const ResultSearch = ({ info, loader, focus, error }) => {
	return (
		<div className='result'>
			{loader ? (
				<UserBlock info={info} error={error} focus={focus} />
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
				// root.current.contains(e.target) || setFocus('');
				root.current.contains(e.target) ||
					(stateFields.value &&
						enableBodyScroll(document.body, {
							reserveScrollBarGap: false,
						}));
			}
			return false;
		};

		document.addEventListener('click', checkingRoot);

		return () => {
			document.removeEventListener('click', checkingRoot);
		};
	}, [setValue, setFocus, stateFields.value]);

	const changeInFocus = () => {
		setFocus(true);
		disableBodyScroll(document.body, { reserveScrollBarGap: true });
	};

	const changeInBlur = () => {
		setFocus('');
		enableBodyScroll(document.body, {
			reserveScrollBarGap: false,
		});
	};
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
						onFocus={() => changeInFocus()}
						onBlur={() => changeInBlur()}
					/>
				</div>
				{stateFields.value ? (
					<ResultSearch
						info={data}
						loader={stateFields.isLoaded}
						focus={stateFields.activeFocus}
						error={stateFields.isError}
					/>
				) : null}
			</form>
		</>
	);
}

export { SearchBar };
