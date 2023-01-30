import Notes from "./Notes"

const Home = (props) => {
    

  return (
    <div style={{backgroundColor:"#519595",height:'100vh',width:'100%'}}>
        <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
