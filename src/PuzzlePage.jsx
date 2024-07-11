import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './PuzzlePage.css';

const PuzzlePage = () => {
  const [circomCode, setCircomCode] = useState('// Write your Circom code here');

  const handleCodeChange = (newValue, event) => {
    setCircomCode(newValue);
  };

  const handleSendCode = () => {
    const backendUrl = 'http://your-backend-url.com/api/circom'; 
    console.log(JSON.stringify({ circomCode }));

    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ circomCode }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Circom code sent successfully.');
          
        } else {
          console.error('Failed to send Circom code.');
          
        }
      })
      .catch(error => {
        console.error('Error sending Circom code:', error);
        
      });
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>zkQuest</h1>
        <nav>
          <button>Courses</button>
          <button>Ask Question</button>
          <button>Register</button>
          <button>Sign In</button>
        </nav>
      </header>
      <div className="content-container">
        <div className="puzzle-container">
          <h2>Chapter 2: Contracts</h2>
          <p>
            Solidity's code is encapsulated in contracts. A <span className="highlight">contract</span> is the fundamental
            building block of Ethereum applications — all variables and functions belong to a contract, and this will be the
            starting point of all your projects.
          </p>
          <pre>
            <code>
              contract HelloWorld &#123;<br />
              &#125;
            </code>
          </pre>
          <h3>Version Pragma</h3>
          <p>
            All solidity source code should start with a "version pragma" — a declaration of the version of the Solidity
            compiler this code should use. This is to prevent issues with future compiler versions potentially introducing
            changes that would break your code.
          </p>
          <p>
            For the scope of this tutorial, we'll want to be able to compile our smart contracts with any compiler version in
            the range of 0.5.0 (inclusive) to 0.6.0 (exclusive). It looks like this: <code>pragma solidity &gt;=0.5.0 &lt;0.6.0;</code>.
          </p>
        </div>
        <div className="editor-container">
          <MonacoEditor
            height="100%"
            language="circom"
            value={circomCode} 
            onChange={handleCodeChange} 
            theme="vs-dark"
          />
          
        </div>
      </div>
      <footer className="footer">
        <button>Back</button>
        <button onClick={handleSendCode}>Send Circom Code</button>
        <button>Next</button>
      </footer>
    </div>
  );
};

export default PuzzlePage;
