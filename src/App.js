import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import Header from "./components/Header";
import Input from './components/Input';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Input />
      </div>
    </div>
  );
}

export default App;
