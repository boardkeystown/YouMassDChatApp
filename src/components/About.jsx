//about page that is a users guide
import React from 'react';
import { Container } from 'react-bootstrap';
import './About.css';

function About() {
    return (
        <Container>
            <div className="about_container">
                <h1 className='about_h1 about_welcome'>About</h1>
                <p className='about_paragraph'>
                    <strong className='about_ytc'>Welcome </strong>to the
                    <em className='about_ytc'> anonymous message board app </em>
                    for<strong className='about_ytc'> YouMassD!</strong>
                </p>
                <p className='about_paragraph'>
                    This platform is designed to provide a
                    <strong className='about_ytc'> <em> safe space </em>
                        for students </strong> to share their thoughts, questions,
                    and opinions without fear of judgment or repercussions.
                    With our app, you can post anonymously, allowing you to
                    <strong className='about_ytc'> speak your mind freely</strong>!
                </p>

                <h1 className='about_h1 about_welcome'>How To Use</h1>
                <p className='about_paragraph'>
                    <strong className='about_ytc'> No account required! </strong>
                    Our message board app is easy to use and accessible from
                    any device with internet connection. You can join your
                    college's chatroom, send messages and funny images.
                    So, start exploring our app and join the conversation today!

                </p>
                <h1 className='about_h1 about_welcome'>Content We Like</h1>
                <p className='about_paragraph'>
                    Moderators will be able to remove your messsages so
                    <strong className='about_ytc'> keep it friendly</strong>.
                    Whether you want to discuss school-related issues,
                    seek advice from your peers, or simply express yourself,
                    our anonymous message board app is the perfect tool for you.

                </p>
                <h1 className='about_h1 about_welcome'>Frequently Asked Questions (FAQ) - Disclaimer</h1>
                <p className='about_paragraph'>
                    <ul>
                        <li>
                            <strong>Please note</strong> that this app is not
                            affiliated with, endorsed by, or officially
                            associated with our university or any other organization.
                            It is <strong> solely</strong> created for educational
                            purposes as part of our class project.
                        </li>
                        <li>This anonymous app is a class project created as a
                            parody of our university.
                            Spelling or grammar mistakes are intentional as to
                            not infringe on the university's trademarks or logos
                            or to appear as official.
                        </li>
                        <li>
                            The app serves as a <strong><em>demonstration </em></strong>
                            of the use of <strong>ReactJs, MongoDb, Socket.Io, 
                            JsonWebTokens, and NodeJs RestApi server</strong> in 
                            a practical web application.
                        </li>
                        <li>
                            <strong>Hosting:</strong> The app is hosted on
                            Heroku, a popular cloud platform that allows us to
                            deploy web applications. However, please be aware
                            that as a free hosting service, Heroku may have
                            certain limitations, such as limited resources and
                            potential downtime. And this app will shutdown
                            without warning sometime after the end of the
                            semester Spring 2023.
                        </li>
                        <li>
                            <strong>Privacy:</strong> While we have taken measures
                            to ensure user anonymity within the app, please be
                            cautious about sharing any personal, sensitive, or
                            confidential information. The app <strong>does not </strong>
                            guarantee absolute anonymity or security, and we do
                            not collect or store any personal data.
                        </li>
                        <li>
                            <strong>Usage:</strong> Please use the app responsibly
                            and within the scope of the intended educational purpose.
                            Any misuse or illegal activity on the app is strictly
                            prohibited and may result in consequences according
                            to school policies and applicable laws.
                        </li>
                    </ul>
                </p>
                <p className='about_paragraph'>
                    Thank you for understanding the nature and purpose of
                    this anonymous app!
                </p>
            </div>
        </Container>

    );


}
export default About;