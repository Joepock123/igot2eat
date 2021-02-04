import { useVerifyUser } from "authContext";
import React from "react";

const App: React.FC = () => {
  const loggedInStatus = useVerifyUser();
  console.log("loggedInStatus", loggedInStatus);

  return <div className="App">Hello</div>;
};

export default App;
