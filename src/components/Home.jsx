//home page of website
import React from 'react';
import './Home.css'
import { Container, Image } from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <div className="home_main home_bg">
                <h1 className='title'>Welcome to the YouMassD Massanger App </h1>
                <Image
                    fluid
                    src={require("../assets/Arnie.png")}
                    width="500"
                    height="500"
                    className="d-inline-block align-top align-center"
                    alt="Arnies Ass"
                />
            </div>
        </Container>

    );
}
export default Home;
