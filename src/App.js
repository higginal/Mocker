import React from 'react';
import './css/App.css';
import Mock from './Mock';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ShareModal from './ShareModal';
import logo from './images/yellow_brown_logo.png'

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <Top />
      <footer color="lightgrey">developed by Avery Higgins, 2020</footer>

    </div>
  );
}

class Top extends React.Component {


  state = { message: "" }
  callbackFunction = (childData) => { this.setState({ message: childData }) }

  //handleChange = val => setValue(val);



  render() {



    return (

      <Container>

        <div className="Header">
        
          <h1 className="logo">
            <img src={logo} alt="Logo"/>Mocker
          </h1>

          <ToggleButtonGroup type="radio" name="pages" size="lg" defaultValue="Create" className="btnGrp" >
            <ToggleButton variant="danger" value="About" disabled="true">About</ToggleButton>

            <ShareModal teamInfo={this.state.message}><ToggleButton variant="danger" value="Share" active>Share</ToggleButton> </ShareModal>

            <ToggleButton variant="danger" value="Create" active>Create</ToggleButton>
            <ToggleButton variant="danger" value="Load" disabled="true">Load</ToggleButton>
            <ToggleButton variant="danger" value="More" disabled="true">More</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Mock parentCallback={this.callbackFunction} />


      </Container>


    );
  }
}

export default App;

