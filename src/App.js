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

  maxRounds = 3;
  maxMockPages = false;

  state = {
    prevArrow: false,
    nextArrow: false,
    mocks: {},
    currentMock: 0,
    totalRounds: 1,
    message: {
      ids: [],
      teams: [],
      pickedPlayers: [],
      players: []
    },
    currentMockObj: null,
    globalPlayerPool: {}
  }

  callbackFunction = (childData) => { // this.setState({ ...this.state, message: childData }) 
  }

  changeMockPageData = (newState, index) => {
    //this.setState({ ...this.state, message: "ok boom" }, () => console.log(this.state.message))
    var numIndex = index

    this.setState({
      ...this.state,
      globalPlayerPool: newState.columns['player-pool'].playerIds,
      message: {
        ids: newState.columns['team-column'].teamIds,
        teams: newState.teams,
        pickedPlayers: newState.columns['player-column'].playerIds,
        players: newState.players
      },
      mocks: {
        ...this.state.mocks,
        [index]: newState
      }

    })

    //this.state.globalPlayerPool = (this.state.mocks[this.state.currentMock].columns['player-pool'].playerIds)


    //console.log(this.state.mocks[index].columns['team-column'].teamIds)

    //console.log("ok")
  }

  //handleChange = val => setValue(val);

  addMockPage() {

    let index = this.state.totalRounds
    this.state.totalRounds++;
    //console.log(index)
    let filledTeamIds2 = [];
    let defaultOrder2 = {};
    var counter = 32 * index;

    initialData.draftOrder[index].map(function (value) {

      defaultOrder2['team-' + counter] = (
        {
          id: 'team-' + counter,
          content: value
        }
      )

      filledTeamIds2.push('team-' + counter)
      counter++;
    }
    )





    //console.log(filledTeamIds)
    //this.state.globalPlayerPool = initialData.allPlayerIds

    this.state.mocks[index] =
      {
        'teams': defaultOrder2,
        'players': initialData.players,
        allPlayerIds: playerFile2['ids'],

        columns: {
          'team-column': {
            id: 'team-column',
            title: 'Teams',
            teamIds: filledTeamIds2
          },

          'player-column': {
            id: 'player-column',
            title: 'Picked Players',
            playerIds: []
          },

          'player-pool': {
            id: 'player-pool',
            title: 'Player Pool',
            playerIds: this.state.globalPlayerPool
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
    this.state.globalPlayerPool = initialData.allPlayerIds

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
          playerIds: this.state.globalPlayerPool
        }
      }
    }


  }


  render() {

    this.state.prevArrow = this.state.currentMock > 0;
    this.state.nextArrow = this.state.currentMock < this.state.totalRounds - 1;
    this.maxMockPages = this.state.totalRounds >= 3;

    /*
    if (this.state.currentMock > 0) {
      this.state.prevArrow = true;
    } else {
      this.state.prevArrow = false;
    }
    if (this.state.currentMock < this.state.totalRounds - 1) {
      this.state.nextArrow = true;
    } {

    }
    */


    return (


      <Container>

        <div className="Header">

          <h1 className="logo">
            <img src={logo} alt="Logo" />Mocker
          </h1>

          <ToggleButtonGroup type="radio" name="pages" size="lg" defaultValue="Create" className="btnGrp" >
            <ToggleButton variant="danger" value="About" disabled="true">About</ToggleButton>

            <ShareModal teamInfo={this.state.message} allData={this.state}><ToggleButton variant="danger" value="Share" active>Share</ToggleButton> </ShareModal>

            <ToggleButton variant="danger" value="Create" active>Create</ToggleButton>
            <ToggleButton variant="danger" value="Load" disabled="true">Load</ToggleButton>
            <ToggleButton variant="danger" value="More" disabled="true">More</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <Mock parentCallback={this.callbackFunction} changeMockCallback={this.changeMockPageData} mockPage={this.state.mocks[this.state.currentMock]} mockIndex={this.state.currentMock}
          teamSetup={this.state.mocks[this.state.currentMock].teams} />

        <b>Round {this.state.currentMock + 1}</b><br/>

        <Button disabled={!this.state.prevArrow} onClick={() => {

          this.state.currentMock--
          this.setState({
            ...this.state,
            //globalPlayerPool: this.state.mocks[this.state.currentMock].columns['player-pool'].playerIds,
            mocks: {
              ...this.state.mocks,
              [this.state.currentMock]: {
                ...this.state.mocks[this.state.currentMock],
                columns: {
                  ...this.state.mocks[this.state.currentMock].columns,
                  'player-pool': {
                    ... this.state.mocks[this.state.currentMock].columns['player-pool'],
                    playerIds: this.state.globalPlayerPool
                  }
                }
              }
            }
          })


        }}>&#8249;</Button>

        <Button onClick={() => {
          //console.log(this.state.currentMock)
          this.addMockPage()
          //this.state.prevArrow = true
          this.state.currentMock++
          this.setState(this.state)

        }} disabled = {this.maxMockPages}>+</Button>

        <Button disabled={!this.state.nextArrow} onClick={() => {

          this.state.currentMock++
          this.setState({
            ...this.state,
            //globalPlayerPool: this.state.mocks[this.state.currentMock].columns['player-pool'].playerIds,
            mocks: {
              ...this.state.mocks,
              [this.state.currentMock]: {
                ...this.state.mocks[this.state.currentMock],
                columns: {
                  ...this.state.mocks[this.state.currentMock].columns,
                  'player-pool': {
                    ... this.state.mocks[this.state.currentMock].columns['player-pool'],
                    playerIds: this.state.globalPlayerPool
                  }
                }
              }
            }
          })
        }} >&#8250;</Button>
      </Container>


    );
  }
}

export default App;

