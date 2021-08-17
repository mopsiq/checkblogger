import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import img from '../../assets/img/test.png';
import { ReactComponent as PeopleIcon } from '../../assets/icons/people.svg';
import { ReactComponent as Package } from '../../assets/icons/group.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import '../../index.scss';

const Profile = ({ statusField }) => {
	return (
		<div className='account'>
			{/* <div className='account__item'> */}
			<img
				className={statusField ? 'account__img active' : 'account__img'}
				alt='profile'
				src={img}
			></img>
			{/* </div> */}
			<div className='account__info'>
				<div className='account__name'>Имя Пользователя</div>
				<div className='account__url'>@instagram__account</div>
			</div>
			<div className='account__count'>
				<PeopleIcon className='account__icon' />
				<span>5 355</span>
			</div>
			<span className='account__status'>
				Требуется оплата для получения полного отчета
			</span>
			<button>
				<TrashIcon className='trash__icon' />
			</button>
			<Link className='account__btn' to='/main'>
				<Package className='bundle__icon' />
				Оплатить
			</Link>
		</div>
	);
};

const InstagramAccounts = ({ statusField }) => {
	return (
		<>
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
			<Profile statusField={statusField} />
		</>
	);
};

function Verification() {
	const [value, setValue] = useState('');
	const [activeFocus, setActiveFocus] = useState(false);

	return (
		<>
			<div className='container'>
				<SearchBar
					value={value}
					setValue={setValue}
					setFocus={setActiveFocus}
				/>
				<div
					className={
						activeFocus ? 'verification active' : 'verification'
					}
				>
					<div className='verification__header'>
						<div className='verification__noname'>
							<p className='verification__text'>Аккаунт</p>
						</div>
						<div className='verification__noname'>
							<p className='verification__text verification__text--right'>
								Подписчики
							</p>
						</div>
					</div>
					<div className='verification__body'>
						<InstagramAccounts statusField={activeFocus} />
					</div>
				</div>
			</div>
		</>
	);
}

export { Verification };
