import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const StudentCtx=createContext(null);
const StudentProvider = ({children}) => {
    const [students,setStudents]=useState([]);
    const history=useHistory();
    useEffect (()=>{
     
        const getStudentData=async()=>{
            //mock API:https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Users 
          const response=await fetch("https://node-mentor-student-backend.vercel.app/students/all",{
              method:"GET",
              headers:{
                "x-auth-token":localStorage.getItem("token")
              }
             })
               const data=await response.json();
              //  console.log (data)
              if(data){
                setStudents(data.data);
                //  console.log (data.data)
              }
            }
            if(!localStorage.getItem("token")){
              history.push("/")
             }else{
              getStudentData();
             }
      })
    return (
       <StudentCtx.Provider 
       value={{students,setStudents}}
       >
        {children}
       </StudentCtx.Provider>
        
      );
}
 export const StudentAppStates=()=>{
    return useContext(StudentCtx)
 }
export default StudentProvider;