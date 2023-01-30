import { useState } from "react"
import NoteContext from "./noteContext"
//NoteContext is a context api created
const NoteState=(props)=>{
  
    const notesinitial=[{
                "_id": "63a862e9eb28051d55c6d66",
                "user": "63a82569cb7e0fe4ceb26c31",
                "tittle": "new note",
                "description": "finish this playlist fast!",
                "tag": "personal",
                "date": "2022-12-25T14:49:13.372Z",
                "__v": 0
              },]
    const [notes,setNotes]=useState(notesinitial);  //something needed to initialize the state , but its get updated by respone of getNotes
    // const host=process.env.REACT_APP_BASE_URL+
    //get all notes
    const getNotes=async()=>{
        //api call
        const response=await fetch(process.env.REACT_APP_BASE_URL+'/notes/fetchallnotes',
        {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json=await response.json();
        setNotes(json)  //initialnotes are overwritting 
    }
    //add note
    const addNote=async(tittle,description,tag)=>{
      // console.log("adding a new note") 

      //api call
      const response=await fetch(process.env.REACT_APP_BASE_URL+'/notes/addnote',
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify({tittle,description,tag})
      });

      //logic
      const json=await response.json();
      setNotes(notes.concat(json)); //concat adds the array and push updates the array
    }
    //delete note
    const deleteNote=async(id)=>{
      //api call
      const response=await fetch(process.env.REACT_APP_BASE_URL+`/notes/deletenote/${id}`,
      {
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        } //no need of body in delete call
      });
      console.log("deleting node with id "+id);

      //delete from fronend - necessary because it deletes from db but diplayed notes is not updated
      const newNote=notes.filter((note)=>{return note._id!==id});
      setNotes(newNote);
    }
    //edit note
    const editNote=async(id,tittle,description,tag)=>{
      // console.log("edited this "+id)
      //api call
      const response=await fetch(process.env.REACT_APP_BASE_URL+`/notes/updatenote/${id}`, 
      {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify({tittle,description,tag})   //stringify converts json  to string type objects (as in body)
      });
      // const json=await response.json(); 

      //logic for edit in front end,we had to change in copy of notes
      const newNotes=JSON.parse(JSON.stringify(notes)); //creates a deep copy (parse converts string obj to json again)
      for (let index = 0; index < newNotes.length; index++) {
        if(newNotes[index]._id===id){
          newNotes[index].tittle=tittle;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;  //change that note in copy whose id is equal
        }
      }
      setNotes(newNotes);
    }
    // console.log(notes);
    return ( //syntax for using context api
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;