import React from 'react';
import image from '../../assets/img/saly.png';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as LogoWhite } from '../../assets/icons/logo-white.svg';
import { NavLink } from 'react-router-dom';
import '../../index.scss';

function Main() {
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

	return (
		<>
			<div className='container main--page'>
				<div className='main'>
					{!isMobile && <LogoWhite className='main__logo' />}

					<div className='main__container'>
						<h1 className='main__title'>
							Проверь будущее своего бренда
						</h1>
						<h3 className='main__subtitle'>
							Сервис глубокой аналитики качества блогеров
						</h3>
						<div className='main__authbtn'>
							<NavLink
								className='nav__btn nav__btn--main'
								to='/login'
							>
								Зарегистрироваться
							</NavLink>
							<NavLink
								className='nav__btn nav__btn--main'
								to='/login'
							>
								Войти
							</NavLink>
						</div>
					</div>

					<img className='main__img' alt='saly' src={image}></img>
				</div>
			</div>
		</>
	);
}

export { Main };
