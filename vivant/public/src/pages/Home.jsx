import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='text-primary text-4xl mt-8'>
        Bienvenue sur vivant
      </div>

      <div className='flex flex-col gap-4 mt-8'>

        <button className='btn btn-primary'>
          <Link to=''>Près de chez vous </Link>
        </button>

        <button className='btn btn-primary'>
          <Link to=''>Par une ville de notre région</Link>
        </button>

        <button className='btn btn-primary'>
          <Link to=''>Depuis la localisation de notre dernier article</Link>
        </button>

      </div>
    </>
  )
};

export default Home;
