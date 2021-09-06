import React from 'react';
import image from '../../assets/img/Chel.png';
import '../../index.scss';

function Main() {
	return (
		<>
			<div className='container main'>
				<div className='main'>
					<div className='main__container'>
						<h1 className='main__title'>
							Проверь будущее своего бренда
						</h1>
						<h3 className='main__subtitle'>
							Сервис глубокой аналитики качества блогеров
						</h3>
					</div>
					<img className='main__img' alt='saly' src={image}></img>
				</div>
			</div>
		</>
	);
}

export { Main };
