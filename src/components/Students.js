import React, { useState } from "react";
import Base from "../Base/Base";
import { useHistory } from "react-router-dom";

const Students = ({ students, setStudents }) => {
  // console.log(students)
  const history = useHistory();
  //  Delete functions

  const deleteStudDetail = async (studid) => {
    // console.log(studObj);

    const response = await fetch(
      `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users/${studid}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data) {
      const remainingStudents = students.filter(
        (students, idx) => students.id !== studid
      );
      setStudents(remainingStudents);
    }
  };
  return (
    <Base
      title={"Students Dashboard"}
      description={"This page content all student data"}
    >
       <p><b>Note:</b>If you make any <b>changes</b> go to Home/Dashboard and refresh the tab to see changes...</p>
      <br/>
      <div className="card-container">
        {students.map((students, idx) => (
          <div className="card" key={idx}>
            <div className="content">
              <h3 style={{ color: "Red" }}>{students.name}</h3>
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
              <button onClick={() => history.push(`/edit/${students.id}`)}>
                Edit
              </button>{" "}
              <button onClick={() => deleteStudDetail(students.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Students;
