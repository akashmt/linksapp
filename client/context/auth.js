import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_LOCAL } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // config axios
  axios.defaults.baseURL = API_LOCAL;
  // axios.defaults.headers.common = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Accept: "application/json",
  // };

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      setState({ ...state, user: as.user, token: as.token });
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
