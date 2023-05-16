import React from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error.gif";

const NoPage = () => {
  const history = useHistory();
  return (
    <div className="NoPage">
      <h1>404 No Page Found</h1>
      <h3>Worng url please click below button</h3>
      <button onClick={() => history.push("/")}>Go to Home Page</button>
      <img src={Error} alt="Loading..." />
    </div>
  );
};

export default NoPage;
