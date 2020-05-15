import React, { useState } from "react";
import Table from "./components/Table";
import { Form, FormValues } from "./components/Form";
import { api } from "./api";
import "./App.css";

export interface Participant extends FormValues {
  id: number,
}

const App: React.FC = () => {
  const [participants, setParticipants] = useState(api.Participants);
  const [selected, setSelected] = useState<Participant | null | undefined>(null);

  function addParticipant(participant: FormValues) {
    let newParticipant = {
      id: participants.length + 1,
      ...participant,
    };

    setParticipants((participants) => [...participants, newParticipant]);
  }

  function setParticipant(id: number) {
    let participant = participants.find(participant => participant.id === id) 
    if (participant) {
      setSelected(participant)
    }
  }

  function editParticipant(participant: FormValues) {
    if (selected) {
      const participantIndex = participants.indexOf(selected)
      const editedParticipant = {id: selected.id, ...participant}
      let newParticipants = [...participants]

      newParticipants[participantIndex] = editedParticipant;
      setParticipants(newParticipants)
    }
  }

  return (
    <div className="App">
      <h1>Header</h1>
      <div className="content">
        <h2>List of participants</h2>
        <Form onSubmit={addParticipant} submitButtonText="Add new" />
        <Table items={participants} onClick={setParticipant}/>
        <Form onSubmit={editParticipant} submitButtonText="Save" data={selected} onCancel={() => setSelected(null)} />
      </div>
    </div>
  );
};

export default App;
