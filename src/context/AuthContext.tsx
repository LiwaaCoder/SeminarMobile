import React from "react";
import { User } from "../types";

const defaultState: {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
} = {
  user: undefined,
  setUser: () => {},
};

const AuthContext = React.createContext(defaultState);

export default AuthContext;
