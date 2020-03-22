import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const TinyTextArea = styled(Form.Control) `
    font-size: 5pt;
    width: 100%;

`

function loadBinary(callBack, text) {

    //let objJsonStr = JSON.stringify(stateData);
    //let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

    //console.log(objJsonB64);
    try {
        var newState = JSON.parse(atob(text));
        //console.log(newState);
        callBack(newState);


    } catch (err) {
        //alert("Incorrect Data")
        console.log(err.name)
        if (err.name === "SyntaxError" || err.name === "InvalidCharacterError") {
            //console.log("IncorrectFile");
            alert("Incorrect Data")
            return false;
        } else {
            //console.log("success");
            alert("Successfully Loaded");
            return true;
        }
    }

    return true;
    //console.log(actual);

    //console.log(newState);
    //return objJsonB64;


    //var testConvert = btoa(draftInfo);
    //return testConvert;

}




export default function ShareModal(props) {


    //let testText = createBinary(props.allData);
    var textArea;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);

    }

    const copyToClipboard = () => {
        //textArea.select();
        // document.execCommand('copy');
        //console.log(props.allData)
        var load = loadBinary(props.changeMockCallback, textArea.value);
        if (load) {
            handleClose();
        }
    }

    return (
        <>
        <Button onClick={handleShow} variant="danger">Load</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Shareable Data:</Modal.Title></Modal.Header>
            <Modal.Body>

                <TinyTextArea as="textarea" rows="50" ref={(textarea) => textArea = textarea}>
                </TinyTextArea>
                <Button onClick={copyToClipboard}>Load</Button>
            </Modal.Body>
        </Modal>
        </>
    );



}