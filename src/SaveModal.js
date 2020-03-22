import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DraftCompiler from './DraftCompiler'
import styled from 'styled-components';

const axios = require('axios');

const TinyTextArea = styled(Form.Control) `
    font-size: 5pt;
    width: 100%;

`

const LinkLocation = styled.div`
    display: flex;
    margin-top: 5px;
    width: 100%;
    height: 65px;
    

`


const UrlTextArea = styled(Form.Control) `
    
    width: 100%;
    margin-left: 5px;
    resize: none;
    max-height: 85px;

`

const mySecret = "a4f7a4da6d24ed133719fedd21bcb42b";

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




export default function ShareModal(props) {


    let testText = createBinary(props.allData);
    let testPBUrl = "pastebin.filler.com";
    var textArea;
    var urlArea;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);

    }

    const copyToClipboard = () => {
        textArea.select();
        document.execCommand('copy');
    }
    const postLink = () => {

        axios.post('https://pastebin.com/api/api_post.php', {
            api_dev_key: mySecret,
            api_option: "paste",
            api_paste_code: testText
          })
          .then(function (response) {
            testPBUrl = response;
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


        
        urlArea.value = testPBUrl;
    }

    return (
        <>
        <Button onClick={handleShow} variant="danger">Save</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Shareable Data:</Modal.Title></Modal.Header>
            <Modal.Body>

                <TinyTextArea as="textarea" rows="40" ref={(textarea) => textArea = textarea} defaultValue={testText}>
                </TinyTextArea>
                <Button onClick={copyToClipboard}>Copy</Button> <br />
                <LinkLocation id="pastebin">
                    <Button onClick={postLink}>Save to Pastebin</Button>
                    <UrlTextArea as="textarea" rows="1" ref={(url) => urlArea = url}>

                    </UrlTextArea>
                </LinkLocation>
            </Modal.Body>
        </Modal>
        </>
    );



}