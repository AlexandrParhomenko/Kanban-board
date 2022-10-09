import React, {useEffect, useState} from 'react';
import './popup.scss'

const Popup: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true)
  const [inputValue, setInputValue] = useState<string>('')
  const clickHandler = () => {
    localStorage.setItem('userName', inputValue);
    setVisible(false);
  }

  return (
      <div>
        {visible && !localStorage.getItem('userName')
            ? <div className='popup'>
              <div className='popup__content'>
                <a className='popup__title'>Приветствуем на Kanban-board. Пожалуйста введите ваше имя:</a>
                <input value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       placeholder='Имя'
                       className='popup__input'
                       type='text'/>
                <button className='popup__button'
                        onClick={clickHandler}
                >Отправить
                </button>
              </div>
            </div>
            : ''
        }
      </div>
  );
};

export default Popup;
