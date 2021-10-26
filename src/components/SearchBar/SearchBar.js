import React, { useCallback, useEffect, useRef, memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { User } from '../../components/User/User.js';
import { useSearchBarReducer } from '../../hooks/useSearchBarReducer/useSearchBarReducer.js';
import { useFetch } from '../../hooks/useFetch/useFetch.js';
import {
	SearchBarField,
	PendingReport,
	ReportUserField,
} from '../User/UserTypesFields/UserTypesFields';
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

const GetterComponent = ({ info }) => {
	const listFields = (data) => {
		switch (data) {
			case 'ReportUserField':
				return (
					<ReportUserField
						indicatorOne={info.involment}
						indicatorSecond={info.qualityAudience}
						state={info}
						field={'reportUsers'}
						id={info.id}
					/>
				);
			case 'SearchField':
				return (
					<SearchBarField
						info={info}
						typeButton='solo'
						textButton={info?.steamid ? 'Проверить' : 'Оплатить'}
					/>
				);
			case 'PendingField':
				return <PendingReport date={info['data_created']} />;
			default:
				return false;
		}
	};
	return (
		<>
			{info['status_payment'] &&
				JSON.parse(info['status_payment']) &&
				listFields('ReportUserField')}
			{info['status_payment'] &&
				!JSON.parse(info['status_payment']) &&
				listFields('PendingField')}
			{info['steamid'] && listFields('SearchField')}
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
							<GetterComponent info={info} />
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

const SearchBar = memo(({ requestName, stateFields, data, reducer }) => {
	// function SearchBar({ stateFields, setValue, setFocus, data }) {
	const root = useRef();
	const reducerStates = useSearchBarReducer();
	const localFetch = useFetch(requestName, reducerStates);

	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });
	// console.log('SearchBar rendering');

	useEffect(() => {
		const checkingRoot = (e) => {
			if (root.current) {
				root.current.contains(e.target) ||
					(reducerStates.localStates.value &&
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
	}, [reducerStates.localStates.value]);

	const setOnValue = useCallback((e) => {
		reducerStates.dispatch({
			type: 'HANDLE_INPUT',
			field: 'value',
			payload: e,
		});
	}, []);

	const setOnFocus = useCallback((e) => {
		reducerStates.dispatch({
			type: 'BOOLEAN_CHANGE',
			field: 'activeFocus',
			payload: e,
		});
	}, []);

	const changeInFocus = (e) => {
		setOnFocus(true);

		disableBodyScroll(document.body, { reserveScrollBarGap: true });
	};

	const changeInBlur = (e) => {
		e.preventDefault();
		setTimeout(() => {
			setOnFocus('');
			setOnValue('');
		}, 150);
		enableBodyScroll(document.body, {
			reserveScrollBarGap: false,
		});
	};

	const changeInValue = (e) => {
		setOnValue(e.target.value);
	};

	return (
		<>
			<form
				className={
					reducerStates.localStates.value ? 'search active' : 'search'
				}
			>
				<div
					ref={root}
					className={
						reducerStates.localStates.value && !isMobile
							? 'search__container active'
							: 'search__container'
					}
				>
					<SearchIcon className='search__icon' />
					<input
						spellCheck='false'
						placeholder={
							isMobile
								? 'Введите юзернейм блогера'
								: 'Поиск аккаунта'
						}
						className='search__input'
						value={reducerStates.localStates.value}
						onChange={(e) => changeInValue(e)}
						onFocus={(e) => changeInFocus(e)}
						onBlur={(e) => changeInBlur(e)}
					/>
				</div>
				{reducerStates.localStates.value ? (
					<ResultSearch
						info={reducerStates.localStates.data}
						loader={reducerStates.localStates.isLoaded}
						focus={reducerStates.localStates.activeFocus}
						error={reducerStates.localStates.isError}
					/>
				) : null}
			</form>
		</>
	);
	// }
});
export { SearchBar };
