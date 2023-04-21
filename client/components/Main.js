import React from 'react';
import { Link } from 'react-router-dom';
import { avocadoPic } from './Images';

const Main = () => {
	return (
		<div className="main">
			<div className="item-list">
				<Link to="/signup"> </Link>
			</div>
			<div className="welcome-page">
				<div className="welcome">
					<p>
						{' '}
						<img className="welcome-image" src={avocadoPic} />
					</p>
					<p>
						Hi, I'm Palta! Welcome to Grace Shopper Pet Store, a one-stop shop
						for all your pet's needs.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Main;
