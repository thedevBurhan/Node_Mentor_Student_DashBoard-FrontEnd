import "./App.css";
import React,{useEffect, useState} from "react";
import data from "./Data/data";
import Base from "./Base/Base";
import AddStudents from "./components/AddStudents";
import Students from "./components/Students";
import {Switch,Route} from "react-router-dom"
import UpdateStudentsDetails from "./components/UpdateStudentsDetails";
import NoPage from "./components/NoPage";
import Dashboard from "./components/Dashboard";
import data1 from "./Data/data1";
import Mentor from "./components/Mentor";
import AddMentor from "./components/AddMentor";
import UpdateMentorDetails from "./components/UpdateMentorDetails"
function App() {
  const [students,setStudents]=useState([]);
  const[mentor,setMentor]=useState([]);
  useEffect (()=>{
   
    const getStudentData=async()=>{
        
      const response=await fetch("https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users",{
          method:"GET",
         })
           const data=await response.json();
          //  console.log (data)
          if(data){
            setStudents(data);
          }
        }
        getStudentData();
  },[])
  useEffect (()=>{
   
    const getMentorData=async()=>{
        
      const response=await fetch("https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Mentor",{
          method:"GET",
         })
           const data=await response.json();
          //  console.log (data)
          if(data){
            setMentor(data);
          }
        }
        getMentorData();
  },[])
  
  
  return (

    <div className="App">
      <Switch>
      <Route exact path="/">
          <Dashboard/>
        </Route>
        <Route path="/students">
        <Students
         students={students}
         setStudents={setStudents} />
        </Route>
        <Route path="/add">
          <AddStudents
          students={students}
          setStudents={setStudents}/>
        </Route>
        <Route path="/edit/:id/">
          <UpdateStudentsDetails
           students={students}
           setStudents={setStudents}/>
        </Route>
        <Route path="/mentor">
        <Mentor
         mentor={mentor}
         setMentor={setMentor} />
        </Route>
        <Route path="/adds">
          <AddMentor
           mentor={mentor}
           setMentor={setMentor}/>
        </Route>
        <Route path="/edits/:id/">
          <UpdateMentorDetails
            mentor={mentor}
            setMentor={setMentor}/>
        </Route>
        <Route path="**">
          <NoPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
