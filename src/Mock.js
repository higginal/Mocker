import React from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import './css/Mock.css';
import TeamColumn from './TeamColumn';
import PlayerColumn from './PlayerColumn';
import PlayerPool from './PlayerPool';
import initialData from './initial-data.js';
import styled from 'styled-components';



const DraftTable = styled.div`
    display: flex;
    width: 80%;
    margin: auto;
    overflow-y: scroll;
`;



export default class Mock extends React.Component {

    state = initialData;

    sendData = (playerColumnIds) => {
        //console.log(this.state.columns['player-column'].playerIds)
        //console.log(this.state.columns['player-pool'].playerIds)
        this.props.parentCallback({
            ids: this.state.columns['team-column'].teamIds,
            teams: this.state.teams,
            pickedPlayers: playerColumnIds,
            players: this.state.players
        });

    }

    constructor(props) {
        super(props)

        let defaultOrder = {};
        let filledTeamIds = []

        for (var i = 0; i < 32; i++) {
            defaultOrder['team-' + i] = (
                {
                    id: 'team-' + i,
                    content: i
                }
            )
            filledTeamIds.push('team-' + i)
        }


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

        this.sendData(this.state.columns['player-column'].playerIds)

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
            const column = this.state.columns[source.droppableId];
            const newTeamIds = Array.from(column.teamIds)

            newTeamIds.splice(source.index, 1)
            newTeamIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...column,
                teamIds: newTeamIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };

            this.setState(newState)
            this.sendData(this.state.columns['player-column'].playerIds)
            //console.log(this.state.teams)
        } else {
            //For the players
            const startColumn = this.state.columns[source.droppableId];
            const finishColumn = this.state.columns[destination.droppableId];


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
                    ...this.state,
                    columns: {
                        ...this.state.columns,
                        [newColumn.id]: newColumn
                    },
                };
                this.setState(newState)
                this.sendData(this.state.columns['player-column'].playerIds)


            } else {
                // if to different column
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
                    ...this.state,
                    columns: {
                        ...this.state.columns,
                        [newStartColumn.id]: newStartColumn,
                        [newFinishColumn.id]: newFinishColumn
                    },

                };
                this.setState(newAltState);

                this.sendData(newAltState.columns['player-column'].playerIds)

            }
        }



    }
    render() {

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <DraftTable>
                    {this.state.columnOrder.map(columnId => {
                        //alert(columnId)
                        const teamColumn = this.state.columns[columnId];

                        //alert(teamColumn.id)
                        if (columnId === 'team-column') {
                            const teams = this.state.teams;
                            const actualTeams = teamColumn.teamIds;
                            //const teamIds = teams.map(teamId => this.state.teams)
                            //teamColumn.teamIds = Array(teams);

                            return <TeamColumn key={teamColumn.id} title="Teams" teamIds={actualTeams} column={teamColumn} teams={teams} />
                        }

                        if (columnId === 'player-column') {
                            const players = this.state.players;
                            const pickedPlayers = teamColumn.playerIds;

                            return <PlayerColumn key={teamColumn.id} playerIds={pickedPlayers} column={teamColumn}
                                players={players} allPlayerIds={this.state.allPlayerIds} teamColumn={this.state.columns['team-column']}
                                teams={this.state.teams} />
                        }

                        if (columnId === 'player-pool') {
                            const players = this.state.players;
                            const unpickedPlayers = teamColumn.playerIds;
                            return <PlayerPool key={teamColumn.id} playerIds={unpickedPlayers} column={teamColumn} players={players} allPlayerIds={this.state.allPlayerIds} />
                        }

                    })
                    }
                </DraftTable>

            </DragDropContext>

        );
    }
}
