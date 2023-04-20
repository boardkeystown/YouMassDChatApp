import React, { useRef, useEffect, useState } from 'react';

import Message from './Message';

import { Container, Col, Form, Button } from 'react-bootstrap';
import io from "socket.io-client";

import './Chat.css';

function mk_datetime() {
    // Get current date and time
    const currentDate = new Date();
    // Extract date and time components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month starts from 0, so we add 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    // Format the date and time
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return [formattedDate, formattedTime];
}



const DEPLOY_MODE = (process.env.REACT_APP_DEPLOY_MODE === 'true') ? true : false;
const API_URL = (DEPLOY_MODE === true) ?
    process.env.REACT_APP_DEPLOY_API_URL :
    process.env.REACT_APP_DEV_API_URL;

export default function Chat({boardTitle, boardRoute,updateSessionFunc}) {
    const chatAutoScrollRef = useRef(null);
    const socket = useRef(null);
    // Flag to track if connection is already established
    const isConnectedRef = useRef(false);
    const useBoardRouteRef = useRef(boardRoute)

    const [rerender, setRerender] = useState(new Date().toLocaleString());

    
    const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB
    const [fileSizeError, setError] = useState(null);

    useEffect(() => {
        if (!isConnectedRef.current) {
            useBoardRouteRef.current = (useBoardRouteRef.current===undefined) ? "" : useBoardRouteRef.current;
            console.log("Connection to server:" + API_URL + useBoardRouteRef.current);
            socket.current = io.connect( API_URL + useBoardRouteRef.current);
            // Set flag to true to indicate connection is established
            isConnectedRef.current = true;
        }
        // Clean up the socket.io connection on component unmount
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    const [messages, setMessages] = useState([])
    const messagesRef = useRef([]);

    const sendMessage = (eventData) => {
        eventData.preventDefault();

        //get data from the form values
        const formData = new FormData(eventData.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj)

        //Set up data to be sent
        let username = formDataObj.username;
        let [date_sent, date_time] = mk_datetime();
        let message_text = formDataObj.message_text;
        let postURL = formDataObj.imageData.name;
        let base64Data = undefined;

        if (fileSizeError) {
            window.alert(fileSizeError);
            Array.from(eventData.target).forEach((e) => 
                {   
                    // console.log(e.name + ': ' + e.value);
                    // console.log(e);
                    if (e.name === "imageData") {
                        e.value="";
                        setError(null);
                    }
                    return (e.value)
                }    
                );
            return;
        }
        if (message_text === "" && postURL===""){
            window.alert("Theres no message to send");
            return;
        }
        let message_data = {
            username,
            date_sent,
            date_time,
            message_text,
            base64Data
        };
        //get the image converted to base64
        // TODO: Validate that it is correct type
        // probably should not send stuff if wrong type
        const readFileAsBase64 = (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result;
                    const base64 = dataURL.split(",").pop();
                    // const base64Data = dataURL + base64;
                    resolve({ dataURL, base64 });
                };
                reader.readAsDataURL(file);
            });
        };
        if (postURL !== "") {
            const file = formDataObj.imageData;
            readFileAsBase64(file).then((data) => {
                // Use the base64Data here once the file is done reading
                // console.log(data.dataURL);
                message_data.base64Data = data.dataURL;
                // messagesRef.current = [...messagesRef.current, message_data];
                // setMessages([...messagesRef.current]);
                socket.current.emit("send_message", message_data);
            });
        } else {
            // messagesRef.current = [...messagesRef.current, message_data];
            // setMessages([...messagesRef.current]);
            socket.current.emit("send_message", message_data);
        }
        //Clear values and set back to defaults!!!!
        Array.from(eventData.target).forEach((e) => (e.value = ""));
        eventData.target[0].value = (username === "") ? "Anon" : username;
    };
    useEffect(() => {
        socket.current.on("receive_message", (data) => {
            // console.log("receive_message")
            // console.log(data)
            messagesRef.current = [...messagesRef.current, data];
            // setMessages([...messages,data])
            setMessages([...messagesRef.current]);
        });
    }, []);
    useEffect(() => {
        socket.current.on("receive_message_force_update", (data) => {
            // console.log("receive_message_force_update", data);
            // console.log(rerender)
            setRerender(new Date().toLocaleString());
        });
    }, []);
    const forceUpdateHandel = () => {
        socket.current.emit("send_message_force_update", {messages:"force update!"});
    }


    useEffect(() => {
        // Scroll to the bottom of the chat container when component updates
        chatAutoScrollRef.current.scrollTop = chatAutoScrollRef.current.scrollHeight;

        const messageBoxElement = document.querySelector('#MessageBox');
        const handleWindowResize = () => {
          chatAutoScrollRef.current.scrollTop = chatAutoScrollRef.current.scrollHeight;
        }
        messageBoxElement.addEventListener('DOMSubtreeModified', handleWindowResize);
        return () => {
          messageBoxElement.removeEventListener('DOMSubtreeModified', handleWindowResize);
        }
    }, [messages])

    useEffect(()=>{
        // resize the chat within the window
        const footerOffset = 30; //in px
        
        const navBarElement = document.querySelector('#NavBar');
        const navBarHeight = navBarElement.offsetHeight;

        const boardTitleElement = document.querySelector('#BoardTitle');
        const boardTitleHeight = boardTitleElement.offsetHeight;

        const messageBoxElement = document.querySelector('#MessageBox');
        const messageBoxHeight = messageBoxElement.offsetHeight;

        const submitFormElement = document.querySelector('#SubmitForm');
        const submitFormHeight = submitFormElement.offsetHeight;

        let updatedAvailableHeight = 
        ((window.innerHeight - (messageBoxHeight + submitFormHeight + 
            navBarHeight+boardTitleHeight))+messageBoxHeight)-footerOffset
        chatAutoScrollRef.current.style.height = `${updatedAvailableHeight}px`;

        const handleWindowResize = () => {
            // Update the height of chat_messages_display on window resize
            updatedAvailableHeight = ((window.innerHeight - (messageBoxHeight + 
                            submitFormHeight + navBarHeight+boardTitleHeight))+
                            messageBoxHeight)-footerOffset
            chatAutoScrollRef.current.style.height = `${updatedAvailableHeight}px`;
        }
        // Add event listener for window resize
        window.addEventListener('resize', handleWindowResize);
        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    },[messages])

    // function mk_test() {
    //     let sd = sessionStorage.getItem('sessionData') ? JSON.parse(sessionStorage.getItem('sessionData')) : undefined
    // }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > MAX_FILE_SIZE) {
          setError('File too large! Max Size 8MB');
        } else {
          setError(null);
        }
      };

    return (
        <Container>
            <Col >
                <h1 id="BoardTitle">{boardTitle}</h1>
                <div className='main_chat_container chat_messages_display' ref={chatAutoScrollRef} id="MessageBox">
                    {
                        messages.map((m, i) => {
                            return (<div key={i}><Message 
                                                 data={m} 
                                                 boardRoute={boardRoute}
                                                 forcedUpdateSignalFunc={forceUpdateHandel}
                                                 updateSessionFunc={updateSessionFunc}
                                                 ></Message></div>)
                        })
                    }
                </div>
                <Form onSubmit={(event) => sendMessage(event)} className='form_color' id="SubmitForm">
                    <Form.Group className='d-flex align-items-center'>
                        <Form.Label className='col-2 text-center' > Name: </Form.Label>
                        <Form.Control className='rad-fix' name='username'
                            type="text"
                            placeholder='Anonymous'
                            defaultValue="Anonymous" />
                        <Button
                            id="btn-primary" 
                            className="btn btn-primary btn-large centerButton col-2"
                            type="submit">Post!</Button>
                    </Form.Group>
                    <Form.Group className='d-flex align-items-center'>
                        <Form.Label className='col-2 text-center'>Comment</Form.Label>
                        <Form.Control 
                            id="message_border"
                            name='message_text'
                            type="text"
                            as="textarea"
                            placeholder="message..."
                            rows={2} />
                    </Form.Group>
                    <Form.Group className='d-flex align-items-center'>
                    <Form.Label className='col-2 text-center '> Image: </Form.Label>
                    <Form.Control 
                        className='rad-fix-corner'
                        name='imageData'
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        placeholder={undefined}
                        onChange={handleFileChange}
                        />
                    {fileSizeError && <Form.Text className="text-danger">{fileSizeError}</Form.Text>}
                  </Form.Group>
                </Form>
            </Col>
        </Container>
    );
}