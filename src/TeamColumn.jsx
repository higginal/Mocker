import React from 'react';
//import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import TeamCard from './teamCard';
import { Droppable } from 'react-beautiful-dnd';


const Container = styled.div`
    
    border: 1px solid lightgrey;
    width: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
 
`;

const Title = styled.div`

    width: auto;
    font-weight: bold;
`;

const DraftList = styled.div`
    border: black;
    padding: 2px;
    margin: 1%;
    overflow-y: scroll;
    height: 450px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'lightgray' : 'white')};
`;



export default class TeamColumn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 'team-column',
            title: 'Teams',
            teamIds: this.props.teamIds

        }

    }

    render() {

        return (

            <Container>

                <Title>{this.props.column.title}</Title>

                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <DraftList
                            innerRef = {provided.innerRef}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver = {snapshot.isDraggingOver}
                        >
                            {this.props.teamIds.map((value, index) => (
                                
                                <TeamCard key={value} id={value} value={value} index={index} teams={this.props.teams} round={this.props.round}/>
                            ))}
                            {provided.placeholder}
                        </DraftList>

                    )
                    }

                </Droppable>
            </Container>
        )

    }


}