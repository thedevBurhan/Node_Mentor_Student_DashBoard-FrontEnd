import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Base from "../Base/Base";

function UpdateMentorDetails({ mentor, setMentor, editIdx }) {
  const history = useHistory();
  const { id } = useParams();
  const editMentor = mentor[id];
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    setName(editMentor.name);
    setBatch(editMentor.batch);
    setGender(editMentor.gender);
    setExperience(editMentor.experience);
    console.log(mentor);
  }, [editMentor]);

  async function updateMentorDetails() {
    const updatedObject = {
      name: name,
      batch: batch,
      gender: gender,
      experience: experience,
    };
    const response = await fetch(
      `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Mentor/${editMentor.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedObject),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(updatedObject);
    if (data) {
      mentor[id] = updatedObject;
      setMentor([...mentor]);
      history.push("/mentor");
    }
  }

  return (
    <Base
      title={"Edit The Mentors Details"}
      description={"We can able to edit a mentors details here... "}
    >
      <div className="cards">
        <input
          placeholder="Enter Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Batch"
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <input
          placeholder="Gender"
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          placeholder="experience"
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <button onClick={updateMentorDetails}>Update Mentor Detail</button>
      </div>
    </Base>
  );
}

export default UpdateMentorDetails;
