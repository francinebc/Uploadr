import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import './Entrance.css';

const Entrance: React.FC = () => {
	return (
		<Container className='main-container'>
			<Jumbotron>
				<p className='hello'>hello</p>
			</Jumbotron>
		</Container>
	);
};

export default Entrance;
