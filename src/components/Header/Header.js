import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import { ReactComponent as Gears } from '../../assets/icons/gears.svg';
import { ReactComponent as LogOut } from '../../assets/icons/log-out.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo-test.svg';
import '../../index.scss';

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		console.log(isOpen);
	}, [isOpen]);

	return (
		<>
			<div className={isOpen ? 'dropdown active' : 'dropdown'}>
				<div className='dropdown__header'>
					<button
						className={
							isOpen ? 'dropdown__btn active' : 'dropdown__btn'
						}
						onClick={() => setIsOpen((prevState) => !prevState)}
					>
						Username
					</button>
				</div>
				{isOpen && (
					<div className='dropdown__body'>
						<Link className='dropdown__item' to='/'>
							<Gears className='dropdown__logo' />
							Настройки
						</Link>
						<Link className='dropdown__item' to='/'>
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
				<NavLink className='nav__btn' to='/'>
					Войти
				</NavLink>
			</li>
			<li>
				<NavLink className='nav__btn' to='/'>
					Зарегистрироваться
				</NavLink>
			</li>
		</>
	);
};

function Header() {
	const user = true;
	const activeCount = 5;

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
					<li className='nav__link'>
						<NavLink to='/check' activeClassName='selected'>
							Проверка
						</NavLink>
					</li>
					<li className='nav__link'>
						<NavLink to='/report' activeClassName='selected'>
							Отчёты
							<span className='report__count'>
								{activeCount > 9 ? '9+' : activeCount}
							</span>
						</NavLink>
					</li>
				</ul>
				<ul
					className={
						user
							? 'nav__item nav__item--right active'
							: 'nav__item nav__item--right'
					}
				>
					{user ? <UserMenu /> : <AuthButtons />}
				</ul>
			</nav>
		</div>
	);
}

export { Header };
