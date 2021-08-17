import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import '../../index.scss';

function Report() {
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
				<div className='report'>
					<h3>Reporting page</h3>
				</div>
			</div>
		</>
	);
}

export { Report };
