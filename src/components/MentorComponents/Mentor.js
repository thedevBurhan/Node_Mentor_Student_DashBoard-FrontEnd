
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { toast } from "react-toastify";
import{ MentorAppStates } from "../../Context/MentorContext";

const Mentor = () => {
  const {mentor,setMentor}=MentorAppStates()
  // console.log(mentor)
  const history = useHistory();
  //  Delete functions

  const deleteMenDetail = async (menid) => {
    // console.log(menid);
    toast('Deleted Successfully',{position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    icon: '👍',
    draggable: true,
    progress: undefined,
    theme: "dark"});
    const response = await fetch(
      //`https://6460bf97ca2d89f7e75dd6d0.mockapi.io/Mentor/${menid}`,
      `https://node-mentor-student-backend.vercel.app/mentors/delete/${menid}`,
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
         <p>If there is no content <b>refresh</b> the Page..</p>
       <p><b>Note:</b>If you make any <b>changes</b> go to Home/Dashboard and refresh the tab to see changes...</p>
      <br/>
      <div className="card-container">
        {mentor.map((mentor, idx) => (
          <div className="card" key={idx}>
            <div className="content">
              <h3 style={{ color: "gray" }}>{mentor.name}</h3>
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
              <Button  variant="outlined" startIcon={<EditNoteOutlinedIcon /> } fontSize="small" onClick={() => history.push(`/edits/${idx}`)}>
                Edit
              </Button>{" "}
              <Button  variant="outlined" startIcon={<DeleteOutlineOutlinedIcon /> } onClick={() => deleteMenDetail(mentor._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Mentor;
