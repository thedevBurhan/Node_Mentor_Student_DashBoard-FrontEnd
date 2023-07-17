import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Base from "../../Base/Base";
import { Button, TextField,Snackbar, IconButton  } from "@mui/material";
import * as yup from 'yup'
import { useFormik } from "formik";
import { StudentAppStates } from "../../Context/StudentContext.js";
// form validation
export const filedValidationScheme=yup.object({
  name:yup.string().required("Please fill student name"),
  batch:yup.string().required("Please fill student batch").min(5,"Please pass a valid batch name"),
  gender:yup.string().required("Please fill student gender"),
  qualification:yup.string().required("Please fill student qualification")
  })

function UpdateStudentsDetails() {
  const{students,setStudents}=StudentAppStates();
  const { id } = useParams();

  const editStudent = students[id];
  // console.log(editStudent)
  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:editStudent.name,
      batch:editStudent.batch,
      gender:editStudent.gender,
      qualification:editStudent.qualification
    },
    validationSchema:filedValidationScheme,
    onSubmit:(editStudent)=>{
      // console.log("onsubmit",editStudent)
      updateStudentDetails(editStudent)
      // console.log("updateStudentDetails",editStudent)
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

  async function updateStudentDetails(updateStudentData) {
  //  console.log(updateStudentData);
    const response = await fetch(
      // `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users/${editStudent.id}`,
      `https://node-mentor-student-backend.vercel.app/students/edit/${editStudent._id}`,
      {
        method: "PUT",
      body: JSON.stringify(updateStudentData),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":localStorage.getItem("token")
        },
      }
    );
    const data = await response.json();
    // console.log(updateStudentData);
    const datas=data;
    // console.log(datas);
    if (datas) {
      students[id] = updateStudentData;
      setStudents([...students]);
      // history.push("/students");
         handleClick();
    }
  }

  return (
    <Base
      title={"Edit The Students Details"}
      description={"We can able to edit a students details here... "}
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
        <Button variant="text"type="submit" >Update Student Detail</Button>
        {/* pop-up message */}
     <Snackbar open={open} autoHideDuration={1000}  onClose={handleClose} message="Updated Successfully" action={action}/>
     </form> 
      </div>
    </Base>
  );
}

export default UpdateStudentsDetails;
