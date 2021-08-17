import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import spinner from '../../assets/img/spinner.gif';
import '../../index.scss';

const ResultsBlock = () => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className='result'>
			{!isLoading && (
				<div className='result__loading'>
					<img
						className='result__spinner'
						src={spinner}
						alt='spinner'
					></img>
				</div>
			)}
		</div>
	);
};
function SearchBar({ value, setValue, setFocus }) {
	const activeFocus = value ? true : false;
	const root = useRef();

	useEffect(() => {
		const checkingRoot = (e) => {
			if (root.current) {
				root.current.contains(e.target) || setValue('');
				root.current.contains(e.target) || setFocus('');
			}
			return false;
		};

		document.addEventListener('click', checkingRoot);

		return () => {
			document.removeEventListener('click', checkingRoot);
		};
	}, [setValue, setFocus]);

	return (
		<>
			<form
				ref={root}
				// onClick={(e) => e.currentTarget === e.target && setValue('')}
				className={!activeFocus ? 'search' : 'search active'}
			>
				<div className='search__container'>
					<SearchIcon className='search__icon' />
					<input
						spellCheck='false'
						placeholder='Введите юзернейм блогера'
						className='search__input'
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onFocus={() => setFocus(true)}
					/>
				</div>
				{activeFocus ? <ResultsBlock /> : null}
			</form>
		</>
	);
}

export { SearchBar };
