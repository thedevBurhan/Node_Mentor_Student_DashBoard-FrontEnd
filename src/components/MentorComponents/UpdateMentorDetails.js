import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Base from "../../Base/Base";
import { Button, TextField,Snackbar, IconButton  } from "@mui/material";
import * as yup from 'yup'
import { useFormik } from "formik";
import  { MentorAppStates } from "../../Context/MentorContext";
// form validation
export const filedValidationScheme=yup.object({
  name:yup.string().required("Please fill student name"),
  batch:yup.string().required("Please fill student batch").min(5,"Please pass a valid batch name"),
  gender:yup.string().required("Please fill student gender"),
  experience:yup.string().required("Please fill student experience")
  })
function UpdateMentorDetails() {
  const {mentor,setMentor}=MentorAppStates()
  const history = useHistory();
  const { id } = useParams();
  const editMentor = mentor[id];
    console.log(editMentor)

  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:editMentor.name,
      batch:editMentor.batch,
      gender:editMentor.gender,
      experience:editMentor.experience
    },
    validationSchema:filedValidationScheme,
    onSubmit:(editMentor)=>{
      // console.log("onsubmit",editMentor)
      updateMentorDetails(editMentor)
      // console.log("updateMentorDetails",editMentor)
    }
  })
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
    history.push("/mentor");
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



  async function updateMentorDetails(UpdateMentorData) {
     console.log(UpdateMentorData);
    const response = await fetch(
     // `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Mentor/${editMentor.id}`,
     `https://node-mentor-student-backend.vercel.app/mentors/edit/${editMentor._id}`, 
     {
        method: "PUT",
        body: JSON.stringify(UpdateMentorData),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":localStorage.getItem("token")
        },
      }
    );
    const data = await response.json();
    // console.log(UpdateMentorData);
    const datas=data;
    // console.log(datas);
    if (datas)  {
      mentor[id] = UpdateMentorData;
      setMentor([...mentor]);
      // history.push("/mentor");
      handleClick();
    }
  }

  return (
    <Base
      title={"Edit The Mentors Details"}
      description={"We can able to edit a mentors details here... "}
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
          label="Experience in years"
          id="outlined-size-small"
          name="experience"
          type="experience"
          onBlur={handleBlur}
          size="small"
          value={values.experience}
          onChange={handleChange}
        />
       <div style={{color:"crimson",fontSize:"small"}}>{touched.experience &&errors ? errors.experience:""}</div>
        <Button variant="text"type="submit" >Update Mentor Detail</Button>
        {/* pop-up message */}
     <Snackbar open={open} autoHideDuration={1000}  onClose={handleClose} message="Updated Successfully" action={action}/>
     </form> 
     </div>
    </Base>
  );
}

export default UpdateMentorDetails;
