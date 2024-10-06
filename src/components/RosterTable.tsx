import React, { useContext } from "react";
import { RosterContext } from "../context/RosterContext";

const RosterTable: React.FC = () => {
  const { state, dispatch } = useContext(RosterContext);

  const handleEdit = (player: any) => {
    dispatch({ type: "SELECT_PLAYER", payload: player });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_PLAYER", payload: id });
  };

  return (
    <>
      <h4>Player List</h4>
      <table className="table table-hover table-responsive">
        <thead className="thead-dark border">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Jersey Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.number}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(player)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(player.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RosterTable;
