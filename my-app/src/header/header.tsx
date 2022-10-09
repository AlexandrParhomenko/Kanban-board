import React, {useEffect, useState} from 'react';
import './header.scss'

const Header = () => {
  const [userName, setUserName] = useState<string>(localStorage.getItem('userName') || '')

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'user')
  }, [userName])

  return (
      <header className='header'>
        <div className='header__content'>
          <img src={require('../assets/png/header-logo.png')} height='50px' width='50px'
               alt='header-logo'/>
          <a className='header__text'>Kanban-board</a>
          <a className='header__text'>Your name: {userName}</a>
        </div>
      </header>
  );
};

export default Header;
