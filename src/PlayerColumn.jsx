import React from 'react';
//import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import PlayerCard from './playerCard';
import teamData from './team-data'
import { Droppable } from 'react-beautiful-dnd';


const Container = styled.div`
    
    border: 1px solid lightgrey;
    width: 25%;
    
    text-align: center;
    
`;

const Title = styled.div`

    width: auto;
    font-weight: bold;
`;

const PlayerList = styled.div`
    border: black;
    padding: 2px;
    margin: 1%;
    overflow-y: scroll;
    height: 450px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? !props.players.includes(props.draggingOverWith) ? 'lightcoral' : 'lightgreen' : 'white')};
    flex-grow: 1;
`;


export default class PlayerColumn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 'player-column',
            title: 'Picked Players',
            playerIds: this.props.playerIds

        }
    }
    render() {


        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <PlayerList
                            innerRef={provided.innerRef}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            draggingOverWith={snapshot.draggingOverWith}
                            players={this.props.allPlayerIds} >
                            {this.props.column.playerIds.map((value, index) => (
                                //This is for setting the color of the draft pick to the corresponding team
                                <PlayerCard key={value} id={value} playerId={value} players={this.props.players} index={index}
                                color={teamData[this.props.teams[this.props.teamColumn.teamIds[index]].content].color} />

                            ))}
                            {provided.placeholder}
                        </PlayerList>
                    )
                    }
                </Droppable>


            </Container>

        )

    }
}



