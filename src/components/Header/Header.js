import React, { useRef, useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSearchBarReducer } from '../../hooks/useSearchBarReducer/useSearchBarReducer.js';
import { useFetch } from '../../hooks/useFetch/useFetch.js';
import {
	BrowserRouter as Router,
	NavLink,
	Link,
	useLocation,
	Redirect,
} from 'react-router-dom';
import { ReactComponent as PeopleIcon } from '../../assets/icons/people.svg';
import { ReactComponent as Gears } from '../../assets/icons/gears.svg';
import { ReactComponent as LogOut } from '../../assets/icons/log-out.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo-test.svg';
import { ReactComponent as LogoWhite } from '../../assets/icons/logo-white.svg';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import { Store } from '../../Store';
import '../../index.scss';

const UserMenu = ({ username }) => {
	const [state, dispatch] = useContext(Store);
	const [isOpen, setIsOpen] = useState(false);
	const root = useRef();

	const buttonsExit = () => {
		setIsOpen(false);
		dispatch({
			type: 'SET_DATA',
			field: 'username',
			payload: '',
		});
		dispatch({
			type: 'SET_DATA',
			field: 'notViewedReports',
			payload: 0,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'searchCheckHistory',
			payload: '',
		});
		dispatch({
			type: 'SET_DATA',
			field: 'searchCheckHistoryLength',
			payload: 0,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'reportUsers',
			payload: 0,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'reportUsersLength',
			payload: '',
		});
	};

	useEffect(() => {
		const checkingRoot = (e) => {
			if (root.current) {
				root.current.contains(e.target) || setIsOpen(false);
			}
			return false;
		};

		document.addEventListener('click', checkingRoot);

		return () => {
			document.removeEventListener('click', checkingRoot);
		};
	}, [isOpen]);

	return (
		<>
			<div ref={root} className={isOpen ? 'dropdown active' : 'dropdown'}>
				<div className='dropdown__header'>
					<button
						className={
							isOpen ? 'dropdown__btn active' : 'dropdown__btn'
						}
						onClick={() => setIsOpen((prevState) => !prevState)}
					>
						{username}
					</button>
				</div>
				{isOpen && (
					<div className='dropdown__body'>
						<Link
							onClick={() => setIsOpen(false)}
							className='dropdown__item'
							to='/profile'
						>
							<Gears className='dropdown__logo' />
							Настройки
						</Link>
						<Link
							onClick={() => buttonsExit()}
							className='dropdown__item'
							to='/main'
						>
							<LogOut className='dropdown__logo' />
							Выход
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

const AuthButtons = () => {
	return (
		<>
			<li>
				<NavLink className='nav__btn' to='/login'>
					Войти
				</NavLink>
			</li>
			<li>
				<NavLink className='nav__btn' to='/login'>
					Зарегистрироваться
				</NavLink>
			</li>
		</>
	);
};

const MobileHeader = () => {
	const reducerStates = useSearchBarReducer();
	const currentLoc = useLocation();
	const locationPathURLS = {
		'/check': 'steam',
		'/report': 'bd',
	};
	const localFetch = useFetch(
		locationPathURLS[currentLoc.pathname],
		reducerStates
	);

	const getCurrentPath = (path) => {
		return Boolean(
			Object.keys(locationPathURLS).find((item) => item === path)
		);
	};

	return (
		<>
			<nav className='nav'>
				<ul className='nav__item'>
					<li>
						<NavLink className='nav__logo' to='/report'>
							<LogoWhite />
						</NavLink>
					</li>
					<li>
						<NavLink className='nav__icon' to='/profile'>
							<PeopleIcon />
						</NavLink>
					</li>
				</ul>

				{getCurrentPath(currentLoc.pathname) && (
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
			</nav>
		</>
	);
};

function Header() {
	const [state, dispatch] = useContext(Store);
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

	return (
		<>
			<div className={isMobile ? 'header' : 'header mobile'}>
				{isMobile ? (
					<nav className='nav'>
						<ul className='nav__item'>
							<li>
								<NavLink className='nav__logo' to='/main'>
									<Logo />
								</NavLink>
							</li>
						</ul>
						<ul className='nav__item'>
							{state.username && (
								<>
									<li className='nav__link'>
										<NavLink
											to='/check'
											activeClassName='selected'
										>
											Проверка
										</NavLink>
									</li>
									<li className='nav__link'>
										<NavLink
											to='/report'
											activeClassName='selected'
										>
											Отчеты
											{state.notViewedReports > 0 && (
												<span className='report__count'>
													{state.notViewedReports > 9
														? '9+'
														: state.notViewedReports}
												</span>
											)}
										</NavLink>
									</li>
								</>
							)}
						</ul>
						<ul
							className={
								state.username
									? 'nav__item nav__item--right active'
									: 'nav__item nav__item--right'
							}
						>
							{state.username ? (
								<UserMenu username={state.username} />
							) : (
								<AuthButtons />
							)}
						</ul>
					</nav>
				) : (
					<MobileHeader />
				)}
			</div>
		</>
	);
}

export { Header };
