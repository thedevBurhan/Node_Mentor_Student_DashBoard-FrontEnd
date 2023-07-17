// import React, { useState } from "react";
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { toast } from "react-toastify";
import { StudentAppStates } from "../../Context/StudentContext.js";


const Students = () => {
  const{students,setStudents}=StudentAppStates();
  const history = useHistory();
  // console.log(students); 
  //  Delete functions


  const deleteStudDetail = async (id) => {
    // console.log(id);
      // toast message
    toast('Deleted Successfully',{position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    icon: '👍',
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"});
    const response = await fetch(
      // `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users/${studid}`,
      `https://node-mentor-student-backend.vercel.app/students/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token":localStorage.getItem("token")
        },
      }
    );
    const data = await response.json();
    const datas=data.data;
    // console.log(datas)
    if (datas) {
      const remainingStudents = students.filter(
        (students, idx) => students.id !== id
      );
      setStudents(remainingStudents);
    }
  };


  return (
    <Base
      title={"Students Dashboard"}
      description={"This page content all student data"}
    >
      <p>If there is no content <b>refresh</b> the Page..</p>
      <p>
        <b>Note:</b>If you make any <b>changes</b> go to Home/Dashboard and
        refresh the tab to see changes...
      </p>
      <br />
      <div className="card-container">
        {students.map((students, idx) => (
          <div className="card" key={idx}>
            <div className="content">
              <h3 style={{ color: "gray" }}>{students.name}</h3>
              <div className="value">
                <p>
                  <b>Batch:</b> {students.batch}
                </p>
                <p>
                  <b>Gender:</b> {students.gender}
                </p>
                <p>
                  <b>Qualification: </b>
                  {students.qualification}
                </p>
              </div>
            </div>
            <div className="control">
              <Button  variant="outlined" startIcon={<EditNoteOutlinedIcon /> } onClick={() => history.push(`/edit/${idx}`)}>
                Edit
              </Button>{" "}
              <Button  variant="outlined" startIcon={<DeleteOutlineOutlinedIcon /> } onClick={()=>  deleteStudDetail(students._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Students;
