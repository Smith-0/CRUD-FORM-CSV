import React from "react";
import PlayerForm from "../components/PlayerForm.tsx";
import RosterTable from "../components/RosterTable.tsx";
import { RosterProvider } from "../context/RosterContext";
import Card from "../components/shared/Card.tsx";

const Roster: React.FC = () => {
  return (
    <RosterProvider>
      <div className="container mt-5">
        <Card>
          <h2 className="text-center">Team Roster Management</h2>
          <PlayerForm />
        </Card>
        <Card>
          <RosterTable />
        </Card>
      </div>
    </RosterProvider>
  );
};

export default Roster;
