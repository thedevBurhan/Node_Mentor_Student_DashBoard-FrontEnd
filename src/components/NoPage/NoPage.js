import React from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error.gif";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Button } from "@mui/material";

const NoPage = () => {
  const history = useHistory();
  return (
    <div className="NoPage">
      <h1>404 No Page Found</h1>
      <h3>Worng url please click below button</h3>
      <Button  variant="outlined" startIcon={<SentimentVeryDissatisfiedIcon /> } onClick={() => history.push("/")}>
      Go to Home Page
              </Button>
      <img src={Error} alt="Loading..." />
    </div>
  );
};

export default NoPage;
