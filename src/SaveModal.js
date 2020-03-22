import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DraftCompiler from './DraftCompiler'
import styled from 'styled-components';

const TinyTextArea = styled(Form.Control)`
    font-size: 5pt;
    width: 100%;

`

export default function ShareModal(props)  {


    let testText = "Lorem Ipsum";

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);

    }

    return (
        <>
        <Button onClick={handleShow} variant="danger">Save</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Shareable Data:</Modal.Title></Modal.Header>
            <Modal.Body>
                
                <TinyTextArea as="textarea" rows="50" defaultValue={testText}>

                </TinyTextArea>
            </Modal.Body>
        </Modal>
        </>
    );



}