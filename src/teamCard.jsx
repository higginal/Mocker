import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import teamData from './team-data';
import { Draggable } from "react-beautiful-dnd";
import TeamModal from './TeamModal';


const StyledCard = styled(Card) `
    

    color: white;
    background-color: #92a8d1;
	font-size: 1em;
	border-style: solid;
	
	border: 4px solid palevioletred;
	border-radius: 3px;
    margin-bottom: 1%;
`;

const ColoredCardBody = styled.div`
    background-color: ${props => props.teamColor};
`;


export default class TeamCard extends React.Component {

    constructor(props) {
        super(props)

        //console.log(props.value)
        const teamId = props.value
        //console.log(props.teams[props.value])
        
        this.state = {
            id: props.id,
            teamId: props.value,
            teamName: teamData[props.teams[teamId].content].name,
            teamColor: teamData[props.teams[teamId].content].color
            //teamLink: null,
            //teamImage: null
        }


    }

    callbackFunction = (childData) => {

        this.props.teams[this.state.teamId].content = parseInt(childData.value)


        const newState2 = {
            ...this.state,
            teamName: teamData[parseInt(childData.value)].name,
            teamColor: teamData[parseInt(childData.value)].color
        }

        //this.props.teams.setState(newState)
        this.setState(newState2)
        console.log(this.props.teams)

       /* this.setState({
            ...this.state,
            teamId: {



            }
        });
        */

        console.log(this.state.teamId)
    }



    render() {
        //console.log(this.props.teams)
        return (
            <Draggable draggableId={this.props.id} index={this.props.index}>
                {(provided, snapshot) => (
                    
                    <StyledCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}>
                        <Card.Header><TeamModal teamName={this.state.teamName} teamId={this.props.value} 
                        index={this.props.index}
                        parentCallback={this.callbackFunction}
                        >{this.state.teamName}</TeamModal></Card.Header>
                        <ColoredCardBody teamColor={this.state.teamColor}>
                            <Card.Text> Pick #:{(32 * this.props.round) + this.props.index + 1} </Card.Text>
                        </ColoredCardBody>
                    </StyledCard>
                )
                }
            </Draggable>
        )
    }

}