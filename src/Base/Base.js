import React from "react";
import {useHistory} from "react-router-dom"


const Base = ({title,description,children}) => {
  const history=useHistory();
    return (
        <div className="main-component base-component">
          <header>
            <h1 className="heading">{title}</h1>
            <div className="Nav">
            <button onClick={()=>history.push("/")}>Home</button>
            <button onClick={()=>history.push("/students")}>Student Dashboard</button>
            <button onClick={()=>history.push("/add")}>Add Student</button>
            <button onClick={()=>history.push("/mentor")}>Mentor Dashboard</button>
            <button onClick={()=>history.push("/adds")}> Add Mentor</button>
            </div>
           
          </header>
           <main className="main-segment">
            <h2 style={{color:"gray"}}>{description}</h2>
            <br/>
            <div>
               {children}
            </div>
           </main>
        </div>
      );
}
 
export default Base;