import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DraftCompiler from './DraftCompiler'



function draftText(teams) {

    return DraftCompiler(teams)

}

export default function ShareModal(props) {

    let draftOutput = draftText(props.teamInfo)
    

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        
        setShow(true);
        
        draftOutput = draftText(props.teamInfo);
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