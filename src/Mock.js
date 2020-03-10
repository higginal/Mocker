import React from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import './css/Mock.css';
import TeamColumn from './TeamColumn';
import PlayerColumn from './PlayerColumn';
import PlayerPool from './PlayerPool';
import initialData from './initial-data.js';
import styled from 'styled-components';
import PlayersFile from './players.json';


const DraftTable = styled.div`
    display: flex;
    width: 80%;
    margin: auto;
    overflow-y: scroll;
    border-style: solid;
    border-radius: 10px;
    margin-bottom: 2%;
`;



export default class Mock extends React.Component {

    state = initialData;

    sendData = (playerColumnIds) => {
        //console.log(this.state.columns['player-column'].playerIds)
        //console.log(this.state.columns['player-pool'].playerIds)
        this.props.parentCallback({
            ids: this.props.mockPage.columns['team-column'].teamIds,
            teams: this.props.mockPage.teams,
            pickedPlayers: playerColumnIds,
            players: this.props.mockPage.players
        });
        

    }

    refreshTable = () => {

        this.setState(this.state)

    }

    constructor(props) {

        super(props)

        this.state = props.mockPage

        /*
        let defaultOrder = {};
        let filledTeamIds = []

        var counter = 0;

        initialData.draftOrder.map(function (value) {

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

        console.log(PlayersFile['players']['Tua-T'])

        this.state = {
            ...this.state,
            teams: defaultOrder,
            columns: {
                ...this.state.columns,
                'team-column': {
                    ...this.state.columns['team-column'],
                    teamIds: filledTeamIds
                },
                'player-pool': {
                    ...this.state.columns['player-pool'],
                    playerIds: this.state.allPlayerIds
                }
            }
        }

        */
        // this.sendData(this.state.columns['player-column'].playerIds)

    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (source.droppableId === "team-column" && destination.droppableId !== "team-column" ||
            source.droppableId !== "team-column" && destination.droppableId === "team-column") {
            return;
        }

        if (source.droppableId === "team-column" && destination.droppableId === "team-column") {
            //For the team order
            const column = this.props.mockPage.columns[source.droppableId];
            const newTeamIds = Array.from(column.teamIds)

            newTeamIds.splice(source.index, 1)
            newTeamIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...column,
                teamIds: newTeamIds,
            };

            const newState = {
                ...this.props.mockPage,
                columns: {
                    ...this.props.mockPage.columns,
                    [newColumn.id]: newColumn
                }
            };

            //this.props.mockPage.setState(newState)
            console.log(newState.columns[newColumn.id].teamIds)
            console.log(newTeamIds)
            this.props.changeMockCallback(newState, this.props.mockIndex)

            //this.setState(newState)
            this.sendData(this.props.mockPage.columns['player-column'].playerIds)
            //console.log(this.state.teams)
        } else {
            //For the players
            const startColumn = this.props.mockPage.columns[source.droppableId];
            const finishColumn = this.props.mockPage.columns[destination.droppableId];


            if (startColumn === finishColumn) { //If in the same column
                const column = startColumn;
                const newPlayerIds = Array.from(column.playerIds)

                newPlayerIds.splice(source.index, 1)
                newPlayerIds.splice(destination.index, 0, draggableId)

                const newColumn = {
                    ...column,
                    playerIds: newPlayerIds,
                };

                const newState = {
                    ...this.props.mockPage,
                    columns: {
                        ...this.props.mockPage.columns,
                        [newColumn.id]: newColumn
                    },
                };

                //this.setState(newState)
                //this.props.mockPage = newState

                this.props.changeMockCallback(newState, this.props.mockIndex)

                this.sendData(this.props.mockPage.columns['player-column'].playerIds)


            } else {
                // if to different column

                if (finishColumn.id === 'player-column' && finishColumn.playerIds.length >= this.props.mockPage.columns["team-column"].teamIds.length) {
                    console.log('full draft')
                    return
                }

                const startPlayerIds = Array.from(startColumn.playerIds)
                startPlayerIds.splice(source.index, 1)
                const finishPlayerIds = Array.from(finishColumn.playerIds)
                finishPlayerIds.splice(destination.index, 0, draggableId)

                const newStartColumn = {
                    ...startColumn,
                    playerIds: startPlayerIds,
                };

                const newFinishColumn = {
                    ...finishColumn,
                    playerIds: finishPlayerIds
                };

                const newAltState = {
                    ...this.props.mockPage,
                    columns: {
                        ...this.props.mockPage.columns,
                        [newStartColumn.id]: newStartColumn,
                        [newFinishColumn.id]: newFinishColumn
                    },

                };

                //console.log(newAltState.columns['player-column'].playerIds)

                //this.props.mockPage.setState(newAltState);

                this.props.changeMockCallback(newAltState, this.props.mockIndex);

                //this.setState(newAltState);

                //this.sendData(newAltState.columns['player-column'].playerIds)

            }
        }

        //console.log(PlayersFile['players']['Tua-T'].content)


    }



    render() {

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <DraftTable>
                    {this.props.mockPage.columnOrder.map(columnId => {
                        //alert(columnId)
                        const teamColumn = this.props.mockPage.columns[columnId];

                        //alert(teamColumn.id)
                        if (columnId === 'team-column') {
                            const teams = this.props.mockPage.teams;
                            const actualTeams = teamColumn.teamIds;
                            //const teamIds = teams.map(teamId => this.state.teams)
                            //teamColumn.teamIds = Array(teams);

                            return <TeamColumn key={teamColumn.id} title="Teams" teamIds={actualTeams} column={teamColumn} teams={teams} />
                        }

                        if (columnId === 'player-column') {
                            //const players = this.state.players;
                            const players = this.props.mockPage.players;
                            const pickedPlayers = teamColumn.playerIds;

                            return <PlayerColumn key={teamColumn.id} playerIds={pickedPlayers} column={teamColumn}
                                players={players} allPlayerIds={this.props.mockPage.allPlayerIds} teamColumn={this.props.mockPage.columns['team-column']}
                                teams={this.props.mockPage.teams} />
                        }

                        if (columnId === 'player-pool') {
                            const players = this.props.mockPage.players;
                            const unpickedPlayers = teamColumn.playerIds;
                            return <PlayerPool key={teamColumn.id} playerIds={unpickedPlayers} column={teamColumn} players={players} allPlayerIds={this.props.mockPage.allPlayerIds} />
                        }

                    })
                    }
                </DraftTable>

            </DragDropContext>

        );
    }
}
