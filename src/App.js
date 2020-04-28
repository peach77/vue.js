import React from 'react';
import Header from './Header';
import Main from './Main';
import { HashRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

export default App;
