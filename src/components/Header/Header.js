import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	BrowserRouter as Router,
	NavLink,
	Link,
	Redirect,
} from 'react-router-dom';
import { ReactComponent as Gears } from '../../assets/icons/gears.svg';
import { ReactComponent as LogOut } from '../../assets/icons/log-out.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo-test.svg';
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

function Header() {
	const [state, dispatch] = useContext(Store);
	return (
		<div className='header'>
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
								<NavLink to='/check' activeClassName='selected'>
									Проверка
								</NavLink>
							</li>
							<li className='nav__link'>
								<NavLink
									to='/report'
									activeClassName='selected'
								>
									Отчёты
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
		</div>
	);
}

export { Header };
