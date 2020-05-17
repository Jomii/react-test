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
  const [nextId, setNextId] = useState(participants.length + 1);

  function addParticipant(participant: FormValues) {
    let newParticipant = {
      id: nextId,
      ...participant,
    };

    setParticipants((participants) => [...participants, newParticipant]);
    setNextId(nextId + 1);
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

  function removeParticipant(id: number) {
    const participant = participants.find(participant => participant.id === id) 
    
    if (participant) {
      const participantIndex = participants.indexOf(participant);
      let newParticipants = [...participants]
      newParticipants.splice(participantIndex, 1)
      
      setParticipants(newParticipants)
    }
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand" >
          <div className="logo d-inline-block align-bottom mr-3"></div>
          Nord Software
        </div>
      </nav>

      <div className="content mt-5">
        <h3 className="mb-4">List of participants</h3>
        <Form onSubmit={addParticipant} submitButtonText="Add new" secondaryStyle={true} />
        <Table items={participants} onClick={setParticipant} onDelete={removeParticipant}/>
        <Form onSubmit={editParticipant} submitButtonText="Save" data={selected} onCancel={() => setSelected(null)} />
      </div>
    </div>
  );
};

export default App;
