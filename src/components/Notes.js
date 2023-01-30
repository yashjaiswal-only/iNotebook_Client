import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote} = context; 
  const [note, setNote] = useState({
    _id:"",
    etittle: "",
    edescription: "",
    etag: "default",
  });
  let navigate=useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token'))    getNotes();
    else navigate('/login')
    // else console.log("login please")   
  },[]); //runs getNotes function on render
  //second parameter of useeffect is dependencies(on change of which function occurs)

  const ref = useRef(null);
  const refClose = useRef(null);  //can we multiple references to elements
  const updateNote = (currentnote) => {
    ref.current.click();  
    setNote({_id:currentnote._id,etittle:currentnote.tittle,edescription:currentnote.description,etag:currentnote.tag});
  };
  const handleClick = (e) => {
    // e.preventDefault();  //no need as update button is not a part of form
    editNote(note._id,note.etittle,note.edescription,note.etag) 
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); ///(...)note me jo tha vo rhega, bas jo bhi change hora hai uss input ka name uss input ke value ke equal hojaye
  };
  return (
    <>
      <Addnote showAlert={props.showAlert}/>

      {/* button to launch modal - click when updateNote is called */}
      <button
        type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etittle" className="form-label">
                    Tittle
                  </label>
                  <input
                    className="form-control" value={note.etittle}
                    type="text"
                    id="etittle"
                    name="etittle"
                    aria-describedby="emailHelp"
                    onChange={onChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"  value={note.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control" value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal" ref={refClose}
              >
                Close 
              </button>
              <button type="button" disabled={note.etittle.length<3 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <h1>Your notes</h1>
        <div className="container">{notes.length===0 && "No Notes to display"}</div>
        
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note}  showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
