import React from "react";
import CreateMessage from "../components/CreateMessage";
import Header from "../components/Header";
import "../styles/App.css";

import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../hooks/useAuth";
import MessageList from "../components/MessageList";

const App = () => {
  const user = useAuth();
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <div className="app">
        <Header />
        <CreateMessage />
        <MessageList />
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
