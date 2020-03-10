import React from 'react';
//import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import PlayerCard from './playerCard';

const Container = styled.div`
    
    border: 1px solid lightgrey;
    width: 25%;
    
    text-align: center;
    
`;

const Title = styled.div`

    width: auto;
    font-weight: bold;
`;

const SearchBar = styled.input`
    border-radius: 5px;
    margin-bottom: 3%;

`;

const PlayerList = styled.div`
    border: black;
    padding: 2px;
    margin: 1%;
    overflow-y: scroll;
    height: 420px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? !props.players.includes(props.draggingOverWith) ? 'lightcoral' : 'lightgreen' : 'white')};
    flex-grow: 1;
`;

export default class PlayerPool extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 'player-pool',
            title: 'Unselected Players',
            playerIds: this.props.playerIds,
            search: ""
        }
    }

    updateSearch(event){
        this.setState({
            ...this.state,
            search: event.target.value
        })
    }

    render() {

        let filteredPlayerIds = this.props.column.playerIds.filter(
            
            player => {
                return this.props.players[player].content.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }

        )
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <SearchBar type='search' placeholder="Search.." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <PlayerList
                            innerRef={provided.innerRef}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            draggingOverWith={snapshot.draggingOverWith}
                            players={this.props.allPlayerIds}>
                            
                            {filteredPlayerIds.map((value, index) => (

                                <PlayerCard key={value} id={value} playerId={value} players={this.props.players} index={index} 
                                    color="DimGrey"
                                />

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