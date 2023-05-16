import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Base from "../Base/Base";

function UpdateStudentsDetails({ students, setStudents, editIdx }) {
  const history = useHistory();
  const { id } = useParams();
  const editStudent = students[id];
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");

  useEffect(() => {
    setName(editStudent.name);
    setBatch(editStudent.batch);
    setGender(editStudent.gender);
    setQualification(editStudent.qualification);
    console.log(students);
  }, [editStudent]);

  async function updateStudentDetails() {
    const updatedObject = {
      name: name,
      batch: batch,
      gender: gender,
      qualification: qualification,
    };
    const response = await fetch(
      `https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users/${editStudent.id}`,
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
      students[id] = updatedObject;
      setStudents([...students]);
      history.push("/students");
    }
  }

  return (
    <Base
      title={"Edit The Students Details"}
      description={"We can able to edit a students details here... "}
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
          placeholder="Qualification"
          type="text"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
        <button onClick={updateStudentDetails}>Update Student Detail</button>
      </div>
    </Base>
  );
}

export default UpdateStudentsDetails;
