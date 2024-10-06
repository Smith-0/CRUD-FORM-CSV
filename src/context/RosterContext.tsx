import React, { createContext, useReducer, useEffect, ReactNode } from "react";

// Define player type
type Player = {
  id: number;
  name: string;
  position: string;
  number: number;
};

// Define initial state and actions
type State = {
  players: Player[];
  selectedPlayer: Player | null;
};

// Actions
type Action =
  | { type: "ADD_PLAYER"; payload: Player }
  | { type: "EDIT_PLAYER"; payload: Player }
  | { type: "DELETE_PLAYER"; payload: number }
  | { type: "SELECT_PLAYER"; payload: Player }
  | { type: "CLEAR_SELECTED_PLAYER" };

// Initial state for context
const initialState: State = {
  players: [],
  selectedPlayer: null,
};

// Create context
export const RosterContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer to manage players
const rosterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PLAYER":
      return { ...state, players: [...state.players, action.payload] };
    case "EDIT_PLAYER":
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id ? action.payload : player
        ),
      };
    case "DELETE_PLAYER":
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
      };
    case "SELECT_PLAYER":
      return { ...state, selectedPlayer: action.payload };
    case "CLEAR_SELECTED_PLAYER":
      return { ...state, selectedPlayer: null };
    default:
      return state;
  }
};

// Load initial state from localStorage
const loadStateFromLocalStorage = (): Player[] => {
  try {
    const storedState = localStorage.getItem("rosterPlayers");
    return storedState ? JSON.parse(storedState) : [];
  } catch (error) {
    console.error("Error loading state from localStorage", error);
    return [];
  }
};

// Save state to localStorage
const saveStateToLocalStorage = (players: Player[]) => {
  try {
    localStorage.setItem("rosterPlayers", JSON.stringify(players));
  } catch (error) {
    console.error("Error saving state to localStorage", error);
  }
};

// Context provider
export const RosterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(rosterReducer, {
    players: loadStateFromLocalStorage(), // Load from localStorage on init
    selectedPlayer: null,
  });

  // Save players to localStorage whenever they change
  useEffect(() => {
    saveStateToLocalStorage(state.players);
  }, [state.players]);

  return (
    <RosterContext.Provider value={{ state, dispatch }}>
      {children}
    </RosterContext.Provider>
  );
};
