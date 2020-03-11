import React, { useState } from 'react';
import styled from 'styled-components';
import teamData from './team-data';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './css/TeamModal.css';

const HiddenButton = styled.button`
    
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    
`;


export default function TeamModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var state = {
        value: 0
    }


    const handleChange = (event) => {
        state = { value: event.target.value }

        sendData();
        
    }

    const sendData = () => {
        props.parentCallback({
            id: state.id,
            value: state.value
        });
        
    }

    return (
        <>
        <HiddenButton onClick={handleShow}>
            {props.teamName}
        </HiddenButton>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Pick #{props.index + 1}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>Choose Traded Team:<br />

                    <Form.Group controlId="exampleForm.ControlSelect2">

                        <Form.Control as="select" onChange={handleChange}>
                            {Object.keys(teamData).map((value, index) => (
                                <option id={index} value={value}>{teamData[value].name} </option>
                            ))
                            }
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );

}