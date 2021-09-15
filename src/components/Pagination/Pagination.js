import React, { useContext, useEffect } from 'react';
import { Store } from '../../Store';
// import { useFetch } from '../../hooks/useFetch/useFetch.js';

import {
	usePagination,
	DOTS,
} from '../../hooks/usePagination/usePagination.js';
import '../../index.scss';
const Pagination = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	className,
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});
	const firstPageIndex = (currentPage - 1) * pageSize;
	const lastPageIndex = firstPageIndex + pageSize + 20;

	const [state, dispatch] = useContext(Store);
	// useEffect(() => {
	// 	console.log('start paginationRequest');
	// 	const setData = async (url, fieldData) => {
	// 		// dispatch({
	// 		// 	type: 'SET_DATA',
	// 		// 	field: 'loaded',
	// 		// 	payload: true,
	// 		// });
	// 		dispatch({
	// 			type: 'SET_DATA',
	// 			field: fieldData,
	// 			payload: '',
	// 		});
	// 		// dispatch({
	// 		// 	type: 'SET_DATA',
	// 		// 	field: 'loaded',
	// 		// 	payload: true,
	// 		// });

	// 		try {
	// 			const request = await fetch(url);
	// 			if (request.status !== 200) {
	// 				console.log(request);
	// 				throw new Error('HTTP error');
	// 			}
	// 			const requestJSON = await request.json();

	// 			setTimeout(() => {
	// 				dispatch({
	// 					type: 'SET_DATA',
	// 					field: fieldData,
	// 					payload: requestJSON[fieldData].slice(
	// 						firstPageIndex,
	// 						lastPageIndex
	// 					),
	// 				});
	// 				dispatch({
	// 					type: 'SET_DATA',
	// 					field: 'searchCheckHistoryLength',
	// 					payload: requestJSON['searchCheckHistory'].length,
	// 				});
	// 				dispatch({
	// 					type: 'SET_DATA',
	// 					field: 'reportUsersLength',
	// 					payload: requestJSON['reportUsers'].length,
	// 				});

	// 				dispatch({
	// 					type: 'SET_DATA',
	// 					field: 'loaded',
	// 					payload: false,
	// 				});
	// 			}, 3000);
	// 		} catch (error) {
	// 			console.log(error);
	// 			dispatch({ type: 'SET_DATA', field: 'error', payload: true });
	// 			dispatch({ type: 'SET_DATA', field: 'loaded', payload: false });
	// 		}
	// 		console.log('end paginationRequest');
	// 	};
	// 	setData('http://localhost:8000/users/1', 'reportUsers');
	// 	setData('http://localhost:8000/users/1', 'searchCheckHistory');
	// }, [currentPage, firstPageIndex]);

	useEffect(() => {
		console.log('start paginationRequest');
		const setData = async (url, fieldData) => {
			dispatch({
				type: 'SET_DATA',
				field: 'loaded',
				payload: true,
			});
			dispatch({
				type: 'SET_DATA',
				field: 'searchCheckHistory',
				payload: '',
			});
			dispatch({
				type: 'SET_DATA',
				field: 'reportUsers',
				payload: '',
			});

			try {
				const request = await fetch(url);
				if (request.status !== 200) {
					console.log(request);
					throw new Error('HTTP error');
				}
				const requestJSON = await request.json();
				let count = 0;
				requestJSON['reportUsers'].forEach((item) =>
					!item['date_download'] && item['status_payment'] !== 'false'
						? (count += 1)
						: (count += 0)
				);
				dispatch({
					type: 'SET_DATA',
					field: 'username',
					payload: requestJSON.username,
				});
				dispatch({
					type: 'SET_DATA',
					field: 'notViewedReports',
					payload: count,
				});
				setTimeout(() => {
					dispatch({
						type: 'SET_DATA',
						field: 'searchCheckHistory',
						payload: requestJSON['searchCheckHistory'].slice(
							firstPageIndex,
							lastPageIndex
						),
					});
					dispatch({
						type: 'SET_DATA',
						field: 'reportUsers',
						payload: requestJSON['reportUsers'].slice(
							firstPageIndex,
							lastPageIndex
						),
					});
					dispatch({
						type: 'SET_DATA',
						field: 'searchCheckHistoryLength',
						payload: requestJSON['searchCheckHistory'].length,
					});
					dispatch({
						type: 'SET_DATA',
						field: 'reportUsersLength',
						payload: requestJSON['reportUsers'].length,
					});
					dispatch({
						type: 'SET_DATA',
						field: 'loaded',
						payload: false,
					});
				}, 1000);
			} catch (error) {
				console.log(error);
				dispatch({ type: 'SET_DATA', field: 'error', payload: true });
				dispatch({ type: 'SET_DATA', field: 'loaded', payload: false });
			}
			console.log('end paginationRequest');
		};
		setData('https://json-mopsiq-fake.herokuapp.com/users/1');
	}, [currentPage, firstPageIndex]);

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<ul
			className={
				className
					? `pagination-container ${className}`
					: 'pagination-container'
			}
		>
			<li
				className={
					currentPage === 1
						? 'pagination-item disabled'
						: 'pagination-item'
				}
				onClick={onPrevious}
			>
				<div className='arrow left' />
			</li>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<li key={index} className='pagination-item dots'>
							&#8230;
						</li>
					);
				}

				return (
					<li
						className={
							pageNumber === currentPage
								? 'pagination-item select'
								: 'pagination-item'
						}
						onClick={function () {
							onPageChange(pageNumber);
						}}
						key={index}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={
					currentPage === lastPage
						? 'pagination-item disabled'
						: 'pagination-item'
				}
				onClick={onNext}
			>
				<div className='arrow right' />
			</li>
		</ul>
	);
};

export { Pagination };
