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
            ? <div className='popup'>
              <div className='popup__content'>
                <span className='popup__title'>Приветствуем на Kanban-board. Пожалуйста введите ваше имя:</span>
                <input value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       placeholder='Имя'
                       className='popup__input'
                       type='text'/>
                <button className='add__button'
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
