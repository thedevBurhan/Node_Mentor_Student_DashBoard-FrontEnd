import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Card, IconButton, Snackbar, TextField } from "@mui/material";
import * as yup from "yup";
import { toast } from "react-toastify";

import { useFormik } from "formik";

// form validation
export const filedValidationScheme = yup.object({
  name: yup.string().required("Please fill Name"),
  email: yup.string().required("Please fill Email"),
  password: yup.string().required("Please fill Password"),
});
const NewResgister = () => {
  const history = useHistory();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: filedValidationScheme,
      onSubmit: (userInfo) => {
        // console.log("onsubmit",userInfo)
        handleSignIn(userInfo);
        toast("It will take Few Seconds to Load....",{position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  icon: '😶‍🌫️',
  draggable: true,
  progress: undefined,
  theme: "light"})}
    });
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // pop-up message
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push("/");
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        close
      </IconButton>
    </React.Fragment>
  );
  // pop-up end------------------------------------------------------------------------------------------------------------------------

  const handleSignIn = async (userInfo) => {
    const res = await fetch(
      `https://node-mentor-student-backend.vercel.app/users/signup`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    localStorage.setItem("token", data.data.token);
    // console.log(userInfo);
    //  history.push("/DashBoard");
    handleClick();
  };
  return (
    <div className="Login">
      
      <h1 className="heading">Sign In</h1> 
        <Card sx={{ maxWidth: 345, mb: 50 }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              sx={{pb:2}}
              label="Enter Name"
              id="outlined-size-small"
              name="name"
              type="name"
              size="small"
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
            />
            <div style={{ color: "crimson", fontSize: "small" }}>
              {touched.name && errors ? errors.name : ""}
            </div>
            <TextField
             sx={{pb:2}}
              label="Email"
              name="email"
              id="outlined-size-small"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              type="email"
              size="small"
            />
            <div style={{ color: "crimson", fontSize: "small" }}>
              {touched.email && errors ? errors.email : ""}
            </div>
            <TextField
            sx={{pb:2}}
              label="Password"
              name="password"
              id="outlined-size-small"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              type="password"
              size="small"
            />
            <div style={{ color: "crimson", fontSize: "small" }}>
              {touched.password && errors ? errors.password : ""}
            </div>
          </CardContent>
          <CardActions sx={{ml:10}}>
           
            <Button type="submit" variant="outlined" size="small">
              Submit
            </Button>
          </CardActions>
          </form>
        </Card>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Signin Successfull"
          action={action}
        />
     
    </div>
  );
};

export default NewResgister;
