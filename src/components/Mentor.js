import React, { useState } from "react";
import Base from "../Base/Base";
import { useHistory } from "react-router-dom";
const Mentor = ({ mentor, setMentor }) => {
  // console.log(mentor)
  const history = useHistory();
  //  Delete functions

  const deleteMenDetail = async (menid) => {
    // console.log(studObj);

    const response = await fetch(
      `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Mentor/${menid}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data) {
      const remainingmentor = mentor.filter(
        (mentor, idx) => mentor.id !== menid
      );
      setMentor(remainingmentor);
    }
  };
  return (
    <Base
      title={"Mentor Dashboard"}
      description={"This page content all mentor data"}
    >
       <p><b>Note:</b>If you make any <b>changes</b> go to Home/Dashboard and refresh the tab to see changes...</p>
      <br/>
      <div className="card-container">
        {mentor.map((mentor, idx) => (
          <div className="card" key={idx}>
            <div className="content">
              <h3 style={{ color: "Red" }}>{mentor.name}</h3>
              <div className="value">
                <p>
                  <b>Batch:</b> {mentor.batch}
                </p>
                <p>
                  <b>Gender:</b> {mentor.gender}
                </p>
                <p>
                  <b>Experience in years: </b>
                  {mentor.experience}
                </p>
              </div>
            </div>
            <div className="control">
              <button onClick={() => history.push(`/edits/${mentor.id}`)}>
                Edit
              </button>{" "}
              <button onClick={() => deleteMenDetail(mentor.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Mentor;
