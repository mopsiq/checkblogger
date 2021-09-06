import React, { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { User, SearchBarField } from '../../components/User/User.js';
import spinner from '../../assets/img/spinner.gif';
import '../../index.scss';

const ErrorBlock = ({ errorMessage }) => {
	const errorStatus = {
		'HTTP error':
			'Что-то пошло не так.. Попробуйте перезагрузить страницу ',
		'Invalid data':
			'Упс... Похоже, вы неправильно ввели юзернейм. Попробуйте еще раз!',
	};
	return (
		<>
			<p className='error'>{errorStatus[errorMessage]}</p>
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
				<User
					focus={focus}
					avatar={info.avatar}
					realname={info.realname}
					username={info.personaname}
					followers={info.loccityid}
				>
					{info.loccityid < 500 ? (
						<p className='account__inactive'>
							&#60;500 подписчиков, невозможно проверить
							пользователя
						</p>
					) : (
						<SearchBarField info={info} typeButton='solo' />
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

	const changeInBlur = (e) => {
		e.preventDefault();
		setTimeout(() => {
			setFocus('');
			setValue('');
		}, 100);

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
						onBlur={(e) => changeInBlur(e)}
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
