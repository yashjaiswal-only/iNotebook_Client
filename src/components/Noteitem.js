import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;


  const { note ,updateNote} = props;
  return (
    //one row contains 12 points
      <div className="card col-md-3 my-3 mx-1" >  
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title"> {note.tittle}</h5>
            {/* <span onClick={()=>{deleteNote(note._id)}}>delete</span>
            <span onClick={()=>{updateNote(note)}}>edit</span> */}
            {/* <img src="../trash-can-regular.png" style={{width:"2px",height:"2px"}}/> how to get this image*/}  
            <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);
            props.showAlert("Deleted Successfully","success")
          }}></i>
            <i className="far fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div> 
          <p className="card-text"> {note.description}</p>
        </div>
      </div>
  );
};

export default Noteitem;
