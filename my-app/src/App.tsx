import React from 'react';
import Main from "./main/main";
import Popup from "./popup/popup";
import './App.scss'
import Header from "./header/header";

const App = () => {

  return (
      <div className='app'>
        <Header/>
        <Main/>
        <Popup/>
      </div>
  );
};

export default App;
