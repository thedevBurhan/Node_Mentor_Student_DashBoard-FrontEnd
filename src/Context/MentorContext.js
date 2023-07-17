import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const MentorCtx=createContext(null);
const MentorProvider = ({children}) => {
    const[mentor,setMentor]=useState([]);
    const history=useHistory();
    useEffect (()=>{
   
        const getMentorData=async()=>{
            
          const response=await fetch("https://node-mentor-student-backend.vercel.app/mentors/all",{
              method:"GET",
              headers:{
                "x-auth-token":localStorage.getItem("token")
              }
             })
               const data=await response.json();
              //  console.log (data)
              if(data){
                setMentor(data.data);
                //  console.log (data.data)
              }
            }
            if(!localStorage.getItem("token")){
              history.push("/")
             }else{
            getMentorData();
             }
      })
    return (
       <MentorCtx.Provider 
       value={{mentor,setMentor}}
       >
        {children}
       </MentorCtx.Provider>
        
      );
}
 export const MentorAppStates=()=>{
    return useContext(MentorCtx)
 }
export default MentorProvider;