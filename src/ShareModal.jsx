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

    let totalIds = []
    let totalTeams = {}
    let totalPickedPlayers = []
    let totalPlayers = {}

    var i;
    var count = 0;
    for (i = 0; i < allInfo.totalRounds; i++) {

        totalIds = totalIds.concat(allInfo.mocks[i].columns['team-column'].teamIds)

        totalTeams = Object.assign(totalTeams, allInfo.mocks[i].teams)
        totalPickedPlayers = totalPickedPlayers.concat(allInfo.mocks[i].columns['player-column'].playerIds)
        totalPlayers = Object.assign(totalPlayers, allInfo.mocks[i].players)
    }


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