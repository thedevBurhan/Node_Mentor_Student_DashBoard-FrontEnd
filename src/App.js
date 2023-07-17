import "./App.css";
import AddStudents from "./components/StudentComponents/AddStudents";
import Students from "./components/StudentComponents/Students";
import {Switch,Route} from "react-router-dom"
import UpdateStudentsDetails from "./components/StudentComponents/UpdateStudentsDetails";
import NoPage from "./components/NoPage/NoPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Mentor from "./components/MentorComponents/Mentor";
import AddMentor from "./components/MentorComponents/AddMentor";
import UpdateMentorDetails from "./components/MentorComponents/UpdateMentorDetails"
import Loginpage from "./components/Login/login";
import NewResgister from "./components/Login/SignIn";


function App() {
  return (

    <div className="App">
      <Switch>
      <Route exact path="/">
          <Loginpage
           />
        </Route>
        <Route  path="/SignIn">
          <NewResgister/>
        </Route>
      <Route  path="/DashBoard">
          <Dashboard/>
        </Route>
        <Route path="/students">
        <Students
         />
        </Route>
        <Route path="/add">
          <AddStudents
          />
        </Route>
        <Route path="/edit/:id/">
          <UpdateStudentsDetails
         />
        </Route>
        <Route path="/mentor">
        <Mentor
         />
        </Route>
        <Route path="/adds">
          <AddMentor
          />
        </Route>
        <Route path="/edits/:id/">
          <UpdateMentorDetails
           />
        </Route>
       
        <Route path="**">
          <NoPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
