//page for all chatrooms
import React from 'react';

import "./Boards.css"
import { Container, Row, Col, Accordion, Nav } from 'react-bootstrap';

function Boards() {

    return (
        <Container>
            <Container fluid className='boards_jump_main'>
                <Row>
                    <Col className='col-mid-12'>
                        <div class="jumbotron">
                            <h2>
                                Ahoy, Matey! Set Sail for YouMassD:
                                Where Corsairs Gather on Themed Boards!
                            </h2>
                            <p>
                                Get ready to dive into the exciting world of
                                YouMassD! Our themed boards are designed to
                                showcase the vibrant spirit of each college,
                                providing you with an opportunity to connect,
                                chat, and collaborate with fellow corsairs.
                                Join the fun and immerse yourself in the
                                dynamic community at YouMassD!
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Collage Of Engineering</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                Set sail for the Collage of Engineering, where we
                                code like pirates and sail through the seas of
                                computer science with unmatched prowess! Join our
                                crew of aspiring buccaneers as we chart the course
                                to programming greatness, with a treasure trove of
                                knowledge, challenges, and camaraderie. Avast, ye
                                landlubbers, for the Collage of Engineering be the
                                crown jewel of YouMassD's academic treasures!
                                Yarrrrrrrrrrrrrrrrrrrrrrr!
                            </p>

                            <div className='boards_navlink_main'>
                                    <Nav.Link className='boards_navlink_style' 
                                    href="Collage_Of_Engineering">Collage Of Engineering
                                    </Nav.Link>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>College of Visual and Pooforming Arts</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                CVPA sucks and I don't think I need to explain why this is.
                            </p>

                            <div className='boards_navlink_main'>
                                    <Nav.Link className='boards_navlink_style' 
                                    href="CVPOOA">College of Visual and Pooforming Arts
                                    </Nav.Link>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>College of Arts and Sciences</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                I had to take technical communications and by god its the worst.
                            </p>

                            <div className='boards_navlink_main'>
                                    <Nav.Link className='boards_navlink_style' 
                                    href="CLARTS">College of Arts and Sciences
                                    </Nav.Link>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Charlton College of Business</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                People who pretend they know whats happening in the markets but are really just drunk 24/7.
                            </p>

                            <div className='boards_navlink_main'>
                                    <Nav.Link className='boards_navlink_style' 
                                    href="CBUSS">College of Business
                                    </Nav.Link>
                            </div>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Container>
    );
}
export default Boards;