import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DraftCompiler from './DraftCompiler'



function draftText(teams) {

    return DraftCompiler(teams)

}

function setupOrder(props) {

    let allInfo = props.allData;
    console.log(allInfo.mocks[0].columns['team-column'].teamIds)
    let totalIds = []
    let totalTeams = {}
    let totalPickedPlayers = []
    let totalPlayers = {}

    var i;
    var count = 0;
    for (i = 0; i < allInfo.totalRounds; i++) {
        console.log(allInfo.mocks[i].columns['team-column'].teamIds)
        totalIds = totalIds.concat(allInfo.mocks[i].columns['team-column'].teamIds)

        totalTeams = Object.assign(totalTeams, allInfo.mocks[i].teams)
        totalPickedPlayers = totalPickedPlayers.concat(allInfo.mocks[i].columns['player-column'].playerIds)
        totalPlayers = Object.assign(totalPlayers, allInfo.mocks[i].players)
    }

    console.log(totalIds)
    console.log(totalTeams)
    console.log(totalPickedPlayers)
    console.log(totalPlayers)

    let allRoundInfo = {
        ids: totalIds,
        teams: totalTeams,
        pickedPlayers: totalPickedPlayers,
        players: totalPlayers
    }

    return draftText(allRoundInfo)
}


export default function ShareModal(props) {

    var draftOutput = setupOrder(props)
    //draftText(props.teamInfo)


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);

        //draftOutput = draftText(allRoundInfo);
        console.log(draftOutput)
    }

    return (
        <>
        <Button onClick={handleShow} variant="danger">Share</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Shareable List:</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Control as="textarea" rows="18" defaultValue={draftOutput}>

                </Form.Control>
            </Modal.Body>
        </Modal>

        </>
    );






}