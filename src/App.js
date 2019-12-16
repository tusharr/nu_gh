import React from 'react';
import './App.css';
import GithubIssueSearch from './components/GithubIssueSearch';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit this file <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        
      </header> */}
      <GithubIssueSearch />
    </div>
  );
}

export default App;
// 8800a71721f051e1fa2e6e646929a4a9c7727b8d