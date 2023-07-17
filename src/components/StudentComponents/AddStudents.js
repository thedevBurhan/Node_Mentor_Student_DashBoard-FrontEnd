import React, { useState } from "react";
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom";
import { Button, TextField,Snackbar, IconButton  } from "@mui/material";
import * as yup from 'yup'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { StudentAppStates } from "../../Context/StudentContext.js";
// form validation
export const filedValidationScheme=yup.object({
  name:yup.string().required("Please fill student name"),
  batch:yup.string().required("Please fill student batch").min(5,"Please pass a valid batch name"),
  gender:yup.string(),
  qualification:yup.string().required("Please fill student qualification")
  })

const AddStudents = () => {
  const{students,setStudents}=StudentAppStates();
  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:"",
      batch:"",
      gender:"",
      qualification:""
    },
    validationSchema:filedValidationScheme,
    onSubmit:(newStudent)=>{
      // console.log("onsubmit",newStudent)
      genderMessage();
      createstudent(newStudent)
    }
  })
 
  const history = useHistory();

  // ---------------------------------------------------------------------------------------------------------------------------------------
  // pop-up message 
 const [open,setOpen]=useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    history.push("/students");
  };
  const action=(
    <React.Fragment> 
     <IconButton size="small"
     aria-label="close"
     color="inherit"
     onClick={handleClose}>close</IconButton>
    </React.Fragment>
  );
// pop-up end------------------------------------------------------------------------------------------------------------------------------------------------
// gender meaasge
function genderMessage(){
  if(values.gender === ""){ 
  toast("Add Gender Later",{position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  icon: '🫡',
  draggable: true,
  progress: undefined,
  theme: "light"}
  

)}
  }
  const createstudent = async (newStudentData) => {

    const response = await fetch(
      //"https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users",
      "https://node-mentor-student-backend.vercel.app/students/addNewData",
      {
        method: "POST",
        body: JSON.stringify(newStudentData),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":localStorage.getItem("token")
        },
      }
    );
    const data = await response.json();
    // console.log(data)
    const datas=data;
    setStudents([...students, datas]);
    // history.push("/students");
    handleClick();
  };
  return (
    <Base
      title={"Add New Students Details"}
      description={"We can able to add new students details here... "}
    >
      <div>
        <form onSubmit={handleSubmit} className="cards">
      <TextField
          label="Enter Name"
          id="outlined-size-small"
          name="name"
          type="name"
          size="small"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
        />
       <div style={{color:"crimson",fontSize:"small"}}>{touched.name && errors ? errors.name:""}</div> 
       <TextField
          label="Batch"
          id="outlined-size-small"
          name="batch"
          type="batch"
          size="small"
          onBlur={handleBlur}
          value={values.batch}
          onChange={handleChange}
        />
          <div style={{color:"crimson",fontSize:"small"}}>{touched.batch &&errors ? errors.batch:""}</div>
       <TextField
          label="Gender"
          id="outlined-size-small"
          name="gender"
          type="gender"
          onBlur={handleBlur}
          size="small"
          value={values.gender}
          onChange={handleChange}
        />
          <div style={{color:"crimson",fontSize:"small"}}>{touched.gender &&errors ? errors.gender:""}</div>
       <TextField
          label="Qualification"
          id="outlined-size-small"
          name="qualification"
          type="qualification"
          onBlur={handleBlur}
          size="small"
          value={values.qualification}
          onChange={handleChange}
        />
          <div style={{color:"crimson",fontSize:"small"}}>{touched.qualification &&errors ? errors.qualification:""}</div>
        <Button variant="text"type="submit" >Add Student Detail</Button>
        {/* pop-up message */}
     <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} message="Added Successfully" action={action}/>
     </form>
      </div>
    </Base>
  );
};

export default AddStudents;
