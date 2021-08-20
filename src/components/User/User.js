import React, { useState, useEffect, Children } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ReactComponent as PeopleIcon } from '../../assets/icons/people.svg';
import { ReactComponent as Package } from '../../assets/icons/group.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as ReadyStatsIcon } from '../../assets/icons/report.svg';
import '../../index.scss';

const TrashIconButton = ({}) => {
	return (
		<>
			<button>
				<TrashIcon className='trash__icon' />
			</button>
		</>
	);
};

const UserCheckingStats = () => {
	return (
		<>
			<h3>62</h3>
			<h3>72</h3>
		</>
	);
};

const UserTextInfo = () => {
	return (
		<>
			<span className='account__status'>
				Требуется оплата для получения полного отчета
			</span>
		</>
	);
};

const UserButtonsField = ({ textButton, icon }) => {
	return (
		<>
			<Link className='account__btn' to='/main'>
				{icon}
				{textButton}
			</Link>
		</>
	);
};

const User = ({ activeFocus, dataFields, children }) => {
	const delimiterString = (string) => {};
	return (
		<div className='account'>
			{/* <div className='account__item'> */}
			<img
				className={activeFocus ? 'account__img active' : 'account__img'}
				alt='profile'
				src={dataFields.avatar || 'https://via.placeholder.com/48'}
			></img>
			{/* </div> */}
			<div className='account__info'>
				<div className='account__name'>
					{dataFields.realname || 'John Doe'}
				</div>
				<div className='account__url'>
					@{dataFields.personaname || 'johndo123'}
				</div>
			</div>
			<div className='account__count'>
				<PeopleIcon className='account__icon' />
				<span>{dataFields.loccityid || '5 355'}</span>
			</div>
			{children}
		</div>
	);
};

export {
	User,
	TrashIconButton,
	UserButtonsField,
	Package,
	UserTextInfo,
	UserCheckingStats,
	ReadyStatsIcon,
};
