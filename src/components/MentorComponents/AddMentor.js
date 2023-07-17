import React, { useState } from "react";
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom";
import { Button, IconButton, Snackbar, TextField } from "@mui/material";
import * as yup from 'yup'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MentorAppStates } from "../../Context/MentorContext";
// form validation
export const filedValidationScheme=yup.object({
  name:yup.string().required("Please fill mentor name"),
  batch:yup.string().required("Please fill mentor batch").min(5,"Please pass a valid batch name"),
  gender:yup.string(),
  experience:yup.string().required("Please fill mentor experince")
  })
const AddMentor = () => {
  const {mentor,setMentor}=MentorAppStates()
  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:"",
      batch:"",
      gender:"",
      experience:""
    },
    validationSchema:filedValidationScheme,
    onSubmit:(newMentorData)=>{
      // console.log("onsubmit",newMentorData)
      genderMessage();
      createMentor(newMentorData)
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
    theme: "light"})
  }
}
  const createMentor = async (newmentor) => {
   
    const response = await fetch(
      // "https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Mentor",
      "https://node-mentor-student-backend.vercel.app/mentors/addNewData",
      {
        method: "POST",
        body: JSON.stringify(newmentor),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":localStorage.getItem("token")
        },
      }
    );
    const data = await response.json();
    // console.log(data)
    const datas=data;
    setMentor([...mentor, datas]);
    // history.push("/mentor");
    handleClick();
  };

  return (
    <Base
      title={"Add New mentor Details"}
      description={"We can able to add new mentor details here... "}
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
        <Button variant="text" type="submit">Add Mentor Detail</Button>
       {/* pop-up message */}
        <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} message="Added Successfully" action={action}/>
    
     </form> 
      </div>
    </Base>
  );
};

export default AddMentor;
