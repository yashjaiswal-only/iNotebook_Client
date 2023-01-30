import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]=useState({tittle:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.tittle,note.description,note.tag);
        props.showAlert("Noted Added Successfully","success")
        setNote({tittle:"",description:"",tag:""});
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});  ///(...)note me jo tha vo rhega, bas jo bhi change hora hai uss input ka name uss input ke value ke equal hojaye
    }

  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="tittle" className="form-label">
            Tittle
          </label>
          <input
            className="form-control"    type="text" value={note.tittle}
            id="tittle" name="tittle"
            aria-describedby="emailHelp" onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your Notes with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text" value={note.description}
            className="form-control"
            id="description"    name="description"  onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text" value={note.tag}
            className="form-control"
            id="tag"    name="tag"  onChange={onChange}
          />
        </div>
       
        <button disabled={note.tittle.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
