import React from 'react';

import './App.css';

import { Header } from './features/Header/Header';
import { Subreddits } from './features/Subreddits/Subreddits';
import { Home } from './features/Home/Home';

function App() {
  return (
    <>
      <Header/>
      <Subreddits/>
      <main>
        <Home/>
      </main>
      
    
    </>
  );
}

export default App;
