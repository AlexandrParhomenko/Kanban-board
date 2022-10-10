import React, {useEffect, useState} from 'react';
import './popup.scss'
import Main from "../main/main";

const Popup: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true)
  const [inputValue, setInputValue] = useState<string>('')
  const clickHandler = () => {
    localStorage.setItem('userName', inputValue);
    setVisible(false);
  }

  return (
      <div className='wrapper'>
        {visible && !localStorage.getItem('userName')
            ? <div className='popup login'>
              <div className='popup__content'>
                <span className='popup__title'>Welcome to Kanban-board. Please enter your name:</span>
                <input value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       placeholder='Name'
                       className='popup__input'
                       type='text'/>
                <button className='popup__button'
                        onClick={clickHandler}
                >Отправить
                </button>
              </div>
            </div>
            : <Main/>
        }
      </div>
  );
};

export default Popup;
