import React from 'react';
import './css/App.css';
import Mock from './Mock';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ShareModal from './ShareModal';
import Button from 'react-bootstrap/Button';
import logo from './images/yellow_brown_logo.png';
import initialData from './initial-data.js';
import playerFile2 from './testPlayers.json'

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

function createMockTable(mocks, mockIndex, callbackFunction) {

  return (<Mock parentCallback={callbackFunction} />);
}

class Top extends React.Component {


  state = {
    prevArrow: false,
    nextArrow: false,
    mocks: {},
    currentMock: 0,
    totalRounds: 1,
    message: "t",
    currentMockObj: null
  }

  callbackFunction = (childData) => { // this.setState({ ...this.state, message: childData }) 
  }

  changeMockPageData = (newState, index) => {
    console.log(index)
    //this.setState({ ...this.state, message: "ok boom" }, () => console.log(this.state.message))
    var numIndex = index

    this.setState({
      ...this.state,
      message: 'ok boom',
      mocks: {
        ...this.state.mocks,
        [index]: newState
      }

    }, () => console.log(this.state.mocks))


    //console.log(this.state.message)
    //console.log(this.state.mocks[index].columns['team-column'].teamIds)

    //console.log("ok")
  }

  //handleChange = val => setValue(val);

  addMockPage = () => {

    let index = this.state.totalRounds
    this.state.totalRounds++;
    //console.log(index)
    var filledTeamIds = []
    var defaultOrder = {}
    var counter = 0;

    initialData.draftOrder[index].map(function (value) {

      defaultOrder['team-' + counter] = (
        {
          id: 'team-' + counter,
          content: value
        }
      )
      console.log(value)
      filledTeamIds.push('team-' + counter)
      counter++;
    }
    )

    console.log(defaultOrder)

    //console.log(filledTeamIds)

    this.state.mocks[index] =
      {
        'teams': defaultOrder,
        'players': {},
        allPlayerIds: playerFile2['ids'],

        columns: {
          'team-column': {
            id: 'team-column',
            title: 'Teams',
            teamIds: filledTeamIds
          },

          'player-column': {
            id: 'player-column',
            title: 'Picked Players',
            playerIds: []
          },

          'player-pool': {
            id: 'player-pool',
            title: 'Player Pool',
            playerIds: []
          }
        },

        columnOrder: ['team-column', 'player-column', 'player-pool']

      }




  }


  constructor() {
    super()
    this.state.mocks[0] = initialData

    let defaultOrder = {};
    let filledTeamIds = []

    var counter = 0;

    initialData.draftOrder[0].map(function (value) {

      defaultOrder['team-' + counter] = (
        {
          id: 'team-' + counter,
          content: value
        }
      )

      filledTeamIds.push('team-' + counter)
      counter++;
    }
    )

    const allPlayers = {}

    this.state.mocks[0] = {
      ...this.state.mocks[0],
      teams: defaultOrder,
      columns: {
        ...this.state.mocks[0].columns,
        'team-column': {
          ...this.state.mocks[0].columns['team-column'],
          teamIds: filledTeamIds
        },
        'player-pool': {
          ...this.state.mocks[0].columns['player-pool'],
          playerIds: initialData.allPlayerIds
        }
      }
    }


  }


  render() {
    if (this.state.currentMock > 0) {
      this.state.prevArrow = true;
    }
    if (this.state.currentMock < this.state.totalRounds - 1) {
      this.state.nextArrow = true;
    }
    return (

      <Container>

        <div className="Header">

          <h1 className="logo">
            <img src={logo} alt="Logo" />Mocker
          </h1>

          <ToggleButtonGroup type="radio" name="pages" size="lg" defaultValue="Create" className="btnGrp" >
            <ToggleButton variant="danger" value="About" disabled="true">About</ToggleButton>

            <ShareModal teamInfo={this.state.message}><ToggleButton variant="danger" value="Share" active>Share</ToggleButton> </ShareModal>

            <ToggleButton variant="danger" value="Create" active>Create</ToggleButton>
            <ToggleButton variant="danger" value="Load" disabled="true">Load</ToggleButton>
            <ToggleButton variant="danger" value="More" disabled="true">More</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <Mock parentCallback={this.callbackFunction} changeMockCallback={this.changeMockPageData} mockPage={this.state.mocks[this.state.currentMock]} mockIndex={this.state.currentMock} />

        { //createMockTable(this.mocks, this.mockIndex, this.callbackFunction)

          /* this.state.mocks.map((mock, index) => {
 
             if (index === this.state.currentMock) {
               console.log(this.state.mocks[index]['columns']['player-column'].playerIds)
               this.state.currentMockObj = <Mock parentCallback={this.callbackFunction} changeMockCallback={this.changeMockPageData} mockPage={this.state.mocks[index]} mockIndex={index}/>
               return this.state.currentMockObj
               //return <Mock parentCallback={this.callbackFunction} mockPage={this.state.mocks[index]} />
             }
 
 
           })
           */
        }

        <Button disabled={!this.state.prevArrow} onClick={() => {
          this.state.currentMock--
          this.setState(this.state)
        }}>&#8249;</Button>

        <Button onClick={() => {
          //console.log(this.state.currentMock)
          this.addMockPage()
          this.state.prevArrow = true
          this.state.currentMock++
          this.setState(this.state)

        }}>+</Button>

        <Button disabled={!this.state.nextArrow} onClick={() => {
          this.state.currentMock++
          this.setState(this.state)
        }} >&#8250;</Button>
      </Container>


    );
  }
}

export default App;

