import React, { useState } from "react";
import Table from "./components/Table";
import { Form, FormValues } from "./components/Form";
import { api } from "./api";
import "./App.css";

const App: React.FC = () => {
  const [participants, setParticipants] = useState(api.Participants);

  function addParticipant(participant: FormValues) {
    let newParticipant = {
      id: participants.length + 1,
      ...participant,
    };

    setParticipants((participants) => [...participants, newParticipant]);
  }

  return (
    <div className="App">
      <h1>Header</h1>
      <div className="content">
        <h2>List of participants</h2>
        <Form onSubmit={addParticipant} submitButtonText="Add new" />
        <Table items={participants} />
      </div>
    </div>
  );
};

export default App;
