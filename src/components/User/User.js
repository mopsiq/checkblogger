import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as PeopleIcon } from '../../assets/icons/people.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as ReadyStatsIcon } from '../../assets/icons/report.svg';
import { Store } from '../../Store';
import '../../index.scss';

const delimiterString = (string) => {
	const arrayString = String(string).split('');
	let count = arrayString.length;
	if (arrayString.length <= 3) return string;

	arrayString.forEach(() => {
		if (count - 3 <= 0) {
			return false;
		} else {
			count -= 3;
			arrayString.splice(count, 0, ' ');
		}
	});

	return arrayString.join('');
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

const UserButtonsField = ({ typeButton, textButton, icon, onClickFunc }) => {
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

const User = React.memo(
	({
		// activeFocus,
		avatar,
		realname,
		username,
		followers,
		children,
		downloaded,
		payment,
	}) => {
		// console.log('User render');
		return (
			<div
				className={
					!downloaded && payment !== 'false'
						? 'account new'
						: 'account'
				}
			>
				<div className='account__info'>
					<img
						// className={
						// 	activeFocus ? 'account__img active' : 'account__img'
						// }
						className={'account__img'}
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
	}
);

export {
	User,
	UserTextInfo,
	UserButtonsField,
	ReadyStatsIcon,
	TrashIconButton,
};
