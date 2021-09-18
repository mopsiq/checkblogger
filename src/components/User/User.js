import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
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

const SearchBarField = ({ info, typeButton, textButton }) => {
	const [states, dispatch] = useContext(Store);
	const ids =
		states.searchCheckHistory &&
		states.searchCheckHistory.map((item) => item.id);
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
				textButton={textButton}
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
	const [states, dispatch] = useContext(Store);
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });
	const currentColor = isMobile ? '#A6AEBA' : '#DB84A4';

	const indicatorWidth = (n, color) => {
		return {
			background: `linear-gradient(white, white) padding-box, conic-gradient(${color} ${n}%, #F1F2F8 ${n}%) border-box`,
		};
	};
	const click = (id) => {
		const newStates = states;
		if (newStates.reportUsers[id]['date_download'] !== '') {
			return false;
		}
		newStates.reportUsers[id]['date_download'] = '09.09.2021';
		newStates.notViewedReports -= 1;

		dispatch({
			type: 'SET_DATA',
			field: 'notViewedReports',
			payload: newStates.notViewedReports,
		});
	};

	const currentItemIndex = states.reportUsers.findIndex(
		(item) => item.id === id
	);
	return (
		<>
			<div className='accounts__indicators'>
				<div className='account__indicator'>
					<div
						className='indicator'
						style={indicatorWidth(indicatorOne, currentColor)}
					>
						<p>{indicatorOne}%</p>
					</div>
					{!isMobile && (
						<p className='account__text'>Вовлеченность</p>
					)}
				</div>
				<div className='account__indicator'>
					<div
						className='indicator'
						style={indicatorWidth(indicatorSecond, currentColor)}
					>
						<p>{indicatorSecond}%</p>
					</div>
					{!isMobile && (
						<p className='account__text'>Качественная аудитория</p>
					)}
				</div>
			</div>
			<TrashIconButton
				state={states.reportUsers}
				field={field}
				id={currentItemIndex}
			/>
			<UserButtonsField
				textButton={'Скачать отчет'}
				icon={<ReadyStatsIcon className='bundle__icon' />}
				onClickFunc={() => click(currentItemIndex)}
			/>
		</>
	);
};

const CheckUserField = ({ state, field, id }) => {
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

	const click = () => {
		console.log('click verification but');
	};
	return (
		<>
			{isMobile ? (
				<>
					<UserTextInfo />
					<TrashIconButton state={state} field={field} id={id} />
					<UserButtonsField
						textButton={'Оплатить'}
						icon={<Package className='bundle__icon' />}
						onClickFunc={click}
					/>
				</>
			) : (
				<>
					<TrashIconButton state={state} field={field} id={id} />
					<UserButtonsField
						textButton={'Оплатить'}
						icon={<Package className='bundle__icon' />}
						onClickFunc={click}
					/>
					<UserTextInfo />
				</>
			)}
		</>
	);
};

const PendingReport = () => {
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

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
			{isMobile ? (
				<>
					<div className='account__payment'>
						<p>
							Ожидаемая дата готовности:
							<span className='account__date'>{getDate()}</span>
						</p>
					</div>
					<div className='account__status'>
						<CLockIcon className='clock__icon' />
						<p className='account__status--text'>
							Аккаунт на проверке
						</p>
					</div>
				</>
			) : (
				<>
					<div className='account__status'>
						<CLockIcon className='clock__icon' />
						<p className='account__status--text'>
							Аккаунт на проверке
						</p>
					</div>
					<div className='account__payment'>
						<p>
							Ожидаемая дата готовности:
							<span className='account__date'>{getDate()}</span>
						</p>
					</div>
				</>
			)}
		</>
	);
};

const TrashIconButton = ({ state, field, id }) => {
	const [states, dispatch] = useContext(Store);
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });
	const fieldLength = field + 'Length';

	const removeItem = (event, designationElement) => {
		event.preventDefault();

		if (state[id]['date_download'] === '') {
			dispatch({
				type: 'SET_DATA',
				field: 'notViewedReports',
				payload: (states.notViewedReports -= 1),
			});
		}
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
			{isMobile ? (
				<button
					onClick={(e) => removeItem(e, id)}
					className='button__icon'
				>
					<TrashIcon className='trash__icon' />
				</button>
			) : (
				<button
					onClick={(e) => removeItem(e, id)}
					className='account__remove'
				></button>
			)}
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
	downloaded,
	payment,
}) => {
	const [states, dispatch] = useContext(Store);
	return (
		<div
			className={
				!downloaded && payment !== 'false' ? 'account new' : 'account'
			}
		>
			<div className='account__info'>
				<img
					className={
						activeFocus ? 'account__img active' : 'account__img'
					}
					alt='profile'
					src={avatar}
				></img>
				<div className='account__initials'>
					<div className='account__name'>{realname}</div>
					<div className='account__url'>@{username}</div>
				</div>
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
