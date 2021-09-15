import React from 'react';
import {
	BrowserRouter as Router,
	NavLink,
	Link,
	Redirect,
} from 'react-router-dom';
import { ReactComponent as List } from '../../assets/icons/list.svg';
import { ReactComponent as Analytics } from '../../assets/icons/analytics.svg';

const MobileMenu = () => {
	return (
		<>
			<div className='mobile__menu'>
				<div className='mobile__menu mobile__menu--wrapper'>
					<NavLink
						className='mobile__item'
						activeClassName='selected'
						to='/check'
					>
						<List className='list__icon' />
					</NavLink>
					<NavLink
						className='mobile__item'
						activeClassName='selected'
						to='/report'
					>
						<Analytics className='analytics__icon' />
					</NavLink>
				</div>
			</div>
		</>
	);
};

export { MobileMenu };
