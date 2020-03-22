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

function createBinary(stateData) {

    let objJsonStr = JSON.stringify(stateData);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
        
    //console.log(objJsonB64);

    //var actual = JSON.parse(atob(objJsonB64));
    //console.log(actual);
    return objJsonB64;


    //var testConvert = btoa(draftInfo);
    //return testConvert;

}




export default function ShareModal(props)  {


    let testText = createBinary(props.allData);
    var textArea;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);

    }

    const copyToClipboard = () => {
        textArea.select();
        document.execCommand('copy');
    }

    return (
        <>
        <Button onClick={handleShow} variant="danger">Save</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Shareable Data:</Modal.Title></Modal.Header>
            <Modal.Body>
                
                <TinyTextArea as="textarea" rows="50" ref={(textarea) => textArea = textarea} defaultValue={testText}>
                </TinyTextArea>
                <Button onClick={copyToClipboard}>Copy</Button>
            </Modal.Body>
        </Modal>
        </>
    );



}