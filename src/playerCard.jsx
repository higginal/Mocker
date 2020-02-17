import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";
import './teamCard.css';


const StyledCard = styled(Card) `
    

    color: white;
    background-color: #92a8d1;
	font-size: 1em;
	
    height: 70px;

	border: 2px solid palevioletred;
	border-radius: 3px;
    margin-bottom: 7%;
`;

const StyledCardHeader = styled(Card.Header) `
    color: black;

`;

const StyledCardBody = styled.div`

    background-color: ${props => props.color}
`;


export default class PlayerCard extends React.Component {


    constructor(props) {
        super(props)

        //console.log(props.value)
        const playerId = props.playerId
        //console.log(props.teams[props.value])
        console.log(props.players[props.id].content)
        this.state = {
            id: props.id,
            playerId:  props.playerId,
            playerName:  props.players[props.id]['content'],
            pos: props.players[props.id]['pos']
            //teamColor: teamData[props.teams[teamId].content].color
            //teamLink: null,
            //teamImage: null
        }

    }

    render() {

        return (

            <Draggable draggableId={this.props.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <StyledCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}>
                        <StyledCardHeader>{this.state.playerName}</StyledCardHeader>
                        <StyledCardBody color={this.props.color}>
                         <Card.Text>{this.state.pos}</Card.Text>
                        </StyledCardBody>
                    </StyledCard>
                )
                }
            </Draggable>


        )


    }

}