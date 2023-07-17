import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


const Base = ({ title, description, children }) => {
  const history = useHistory();
  return (
    <div className="main-component base-component">
      <header>
        <h1 className="heading">{title}</h1>
        <div className="LogOut">
        <Button variant="outlined" startIcon={<LogoutRoundedIcon /> } onClick={() => history.push("/")}>Logout</Button>
        </div>
       
        <div>
          <ButtonGroup variant="text" aria-label="text button group" margin="10px">

            <Button onClick={() => history.push("/DashBoard")}>Home</Button>
            <Button onClick={() => history.push("/students")}>
              Student Dashboard
            </Button>
            <Button onClick={() => history.push("/add")}>Add Student</Button>
            <Button onClick={() => history.push("/mentor")}>
              Mentor Dashboard
            </Button>
            <Button onClick={() => history.push("/adds")}> Add Mentor</Button>
    
          </ButtonGroup>
        </div>
      </header>
      <main className="main-segment">
        <h2 style={{ color: "gray" ,margin:"15px"}}>{description}</h2>
        <br />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Base;
