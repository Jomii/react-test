import React, { useState } from 'react';
import Table from './components/Table';
import { api } from './api';
import './App.css';

function App() {
  const [participants, setParticipants] = useState(api.Participants);

  return (
    <div className="App">
      <h1>Header</h1>
      <div className="content">
        <h2>List of participants</h2>
        <Table items={participants} />
      </div>
    </div>
  );
}

export default App;
