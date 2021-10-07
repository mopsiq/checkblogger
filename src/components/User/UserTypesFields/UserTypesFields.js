import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Package } from '../../../assets/icons/group.svg';
import { ReactComponent as ReadyStatsIcon } from '../../../assets/icons/report.svg';
import { ReactComponent as CLockIcon } from '../../../assets/icons/clock.svg';
import { UserButtonsField, UserTextInfo, TrashIconButton } from '../User';
import { Store } from '../../../Store';
import '../../../index.scss';

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
			{isMobile && <UserTextInfo />}
			<TrashIconButton state={state} field={field} id={id} />
			<UserButtonsField
				textButton={'Оплатить'}
				icon={<Package className='bundle__icon' />}
				onClickFunc={click}
			/>
			{!isMobile && <UserTextInfo />}
		</>
	);
};

const PendingReport = ({ date }) => {
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

	const reverseDateString = (date) => {
		const dateStringInArray = date.split('');
		const daysIsDate = date.slice(0, 2);
		const monthsIsDate = date.slice(3, 5);
		dateStringInArray.splice(0, 2, ...monthsIsDate);
		dateStringInArray.splice(3, 2, ...daysIsDate);
		return dateStringInArray.join('');
	};

	const getDate = (date) => {
		const dateCreateAcc = new Date(reverseDateString(date));
		const expectedDate = new Date(
			dateCreateAcc.setDate(dateCreateAcc.getDate() + 2)
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
							<span className='account__date'>
								{getDate(date)}
							</span>
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
							<span className='account__date'>
								{getDate(date)}
							</span>
						</p>
					</div>
				</>
			)}
		</>
	);
};

export {
	ReadyStatsIcon,
	ReportUserField,
	SearchBarField,
	PendingReport,
	CheckUserField,
};
