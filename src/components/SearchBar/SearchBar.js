import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
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
				<>
					<User
						focus={focus}
						avatar={info.avatar || info['avatar_url']}
						realname={info.realname || info['real_name']}
						username={info.personaname || info.username}
						followers={info.loccityid || info.followers}
						downloaded={''}
						payment={'false'}
					>
						{info.loccityid < 500 ? (
							<p className='account__inactive'>
								&#60;500 подписчиков, невозможно проверить
								пользователя
							</p>
						) : (
							<SearchBarField
								info={info}
								typeButton='solo'
								textButton={
									info?.steamid ? 'Проверить' : 'Оплатить'
								}
							/>
						)}
					</User>
				</>
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
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

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
		}, 150);

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
						placeholder={
							isMobile
								? 'Введите юзернейм блогера'
								: 'Поиск аккаунта'
						}
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
