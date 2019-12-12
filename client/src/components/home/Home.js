import React from 'react';
import cover from './cover.png';
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className='cover'>
        <img className='cover-image' alt='cover' src={cover} />
      </div>
      <h1 className='greeting'>Welcome to Subliminal Audio Store</h1>
    </div>
  );
};

export default Home;
