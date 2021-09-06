import React, { useContext } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ReactComponent as PeopleIcon } from '../../assets/icons/people.svg';
import { ReactComponent as Package } from '../../assets/icons/group.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as ReadyStatsIcon } from '../../assets/icons/report.svg';
import { ReactComponent as CLockIcon } from '../../assets/icons/clock.svg';
import { Store } from '../../Store';
import '../../index.scss';

const delimiterString = (string) => {
	const arrayString = String(string).split('');
	let count = arrayString.length;
	if (arrayString.length <= 3) return string;

	arrayString.forEach((_) => {
		if (count - 3 <= 0) {
			return false;
		} else {
			count -= 3;
			arrayString.splice(count, 0, ' ');
		}
	});

	return arrayString.join('');
};

const SearchBarField = ({ info, typeButton }) => {
	const [states, dispatch] = useContext(Store);
	const ids = states.searchCheckHistory.map((item) => item.id);
	let maxID = Math.max(...ids);
	maxID < 0 ? (maxID = 0) : (maxID += 1);
	const newItems = {
		id: maxID,
		real_name: info?.realname,
		username: info?.personaname,
		followers: info?.loccityid,
		avatar_url: info?.avatar,
	};

	const addNewItem = (e) => {
		e.preventDefault();
		const state = states.searchCheckHistory;
		state.splice(0, 0, newItems);

		dispatch({
			type: 'SET_DATA',
			field: 'searchCheckHistory',
			payload: state,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'searchCheckHistoryLength',
			payload: states.searchCheckHistoryLength + 1,
		});
	};

	return (
		<>
			<UserButtonsField
				info={info}
				typeButton={typeButton}
				textButton={'Проверить'}
				icon={<Package className='bundle__icon' />}
				onClickFunc={addNewItem}
			/>
		</>
	);
};

const ReportUserField = ({
	indicatorOne,
	indicatorSecond,
	state,
	field,
	id,
}) => {
	const indicatorWidth = (n) => {
		return {
			background: `linear-gradient(white, white) padding-box, conic-gradient(#A6AEBA ${n}%, #F1F2F8 ${n}%) border-box`,
		};
	};
	const click = () => {
		console.log('click verification but');
	};
	return (
		<>
			<div className='accounts__indicators'>
				<div
					className='account__indicator'
					style={indicatorWidth(indicatorOne)}
				>
					<p>{indicatorOne}%</p>
				</div>
				<div
					className='account__indicator'
					style={indicatorWidth(indicatorSecond)}
				>
					<p>{indicatorSecond}%</p>
				</div>
			</div>
			<UserTextInfo />
			<TrashIconButton state={state} field={field} id={id} />
			<UserButtonsField
				textButton={'Скачать отчет'}
				icon={<ReadyStatsIcon className='bundle__icon' />}
				onClickFunc={click}
			/>
		</>
	);
};

const CheckUserField = ({ state, field, id }) => {
	const click = () => {
		console.log('click verification but');
	};
	return (
		<>
			<UserTextInfo />
			<TrashIconButton state={state} field={field} id={id} />
			<UserButtonsField
				textButton={'Оплатить'}
				icon={<Package className='bundle__icon' />}
				onClickFunc={click}
			/>
		</>
	);
};

const PendingReport = () => {
	const getDate = () => {
		const date = new Date().toString();
		const currentDate = new Date(date);
		const expectedDate = new Date(
			currentDate.setDate(currentDate.getDate() + 2)
		);
		const day = expectedDate.getDate();
		const month = expectedDate.getMonth() + 1;
		const year = expectedDate.getFullYear();

		return `${+day <= 9 ? '0' + day : day}.${
			+month <= 9 ? '0' + month : month
		}.${year}`;
	};

	return (
		<>
			<div className='account__payment'>
				<p>
					Ожидаемая дата готовности:
					<span className='account__date'>{getDate()}</span>
				</p>
			</div>
			<div className='account__status'>
				<CLockIcon className='clock__icon' />
				<p className='account__status--text'>Аккаунт на проверке</p>
			</div>
		</>
	);
};

const TrashIconButton = ({ state, field, id }) => {
	const [states, dispatch] = useContext(Store);
	const fieldLength = field + 'Length';

	const removeItem = (designationElement) => {
		state.splice(designationElement, 1);
		dispatch({
			type: 'SET_DATA',
			field: field,
			payload: state,
		});
		dispatch({
			type: 'SET_DATA',
			field: fieldLength,
			payload: states[fieldLength] - 1,
		});
	};
	return (
		<>
			<button onClick={() => removeItem(id)} className='button__icon'>
				<TrashIcon className='trash__icon' />
			</button>
		</>
	);
};

const UserTextInfo = () => {
	return (
		<>
			<span className='account__payment'>
				Требуется оплата для получения полного отчета
			</span>
		</>
	);
};

const UserButtonsField = ({
	info,
	typeButton,
	textButton,
	icon,
	onClickFunc,
}) => {
	return (
		<>
			<button
				onClick={(e) => onClickFunc(e)}
				className={
					typeButton ? `account__btn ${typeButton}` : 'account__btn'
				}
			>
				{icon}
				{textButton}
			</button>
		</>
	);
};

const User = ({
	activeFocus,
	avatar,
	realname,
	username,
	followers,
	children,
}) => {
	const [states, dispatch] = useContext(Store);

	const hover = (e) => {
		// console.log('init');
		// console.log(e);
	};
	return (
		<div onMouseLeave={(e) => hover(e)} className='account new'>
			<img
				className={activeFocus ? 'account__img active' : 'account__img'}
				alt='profile'
				src={avatar || 'https://via.placeholder.com/48'}
			></img>
			<div className='account__info'>
				<div className='account__name'>{realname || 'John Doe'}</div>
				<div className='account__url'>@{username || 'johndo123'}</div>
			</div>
			<div className='account__count'>
				<PeopleIcon className='account__icon' />
				<span>{delimiterString(followers ? followers : '0')}</span>
			</div>
			{children}
		</div>
	);
};

export {
	User,
	UserTextInfo,
	ReadyStatsIcon,
	ReportUserField,
	SearchBarField,
	PendingReport,
	CheckUserField,
};
