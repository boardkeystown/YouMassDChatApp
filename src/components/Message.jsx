// message component to be rendered in message box
import React, {useState} from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import "./Message.css"


const DEPLOY_MODE = (process.env.REACT_APP_DEPLOY_MODE === 'true') ? true : false;
const API_URL = (DEPLOY_MODE === true) ?
  process.env.REACT_APP_DEPLOY_API_URL :
  process.env.REACT_APP_DEV_API_URL;

function mk_image(imageData) {
    if (imageData === undefined) {
        return (<></>)
    }
    return (
        <div className='message_image'>
            <Image 
                src={imageData}
                alt="Cursed Image"
                fluid />
        </div>
    )
}

// function get_messageData(messageID) {
//    fetch(API_URL+"/api/get_message", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ messageID: messageID })
//       })
//       .then(response => {
//         if (response.status === 201) {
//           // Handle success with status code 201
//           return response.json();
//         } else if (response.status === 202) {
//           // Handle not found with status code 404
//           throw new Error("Message not found");
//         } else {
//           // Handle other status codes
//           throw new Error("Unexpected response status code: " + response.status);
//         }
//       })
//       .then(data => {
//         // Handle response data for success
//         console.log("DATA FROM SERVER")
//         console.log(data);
//         console.log("DATA FROM SERVER")
//         return data;
//       })
//       .catch(error => {
//         // Handle error
//         console.log(error);
//         return error;
//       });
//   }
async function get_messageData(messageID,boardRoute) {
  try {
    const response = await fetch(API_URL + "/api/get_message", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        messageID: messageID,
        boardRoute:boardRoute
       })
    });

    if (response.status === 201) {
      // Handle success with status code 201
      const data = await response.json();
      // console.log("DATA FROM SERVER:");
      // console.log(data);
      // console.log("DATA FROM SERVER:");
      return data;
    } else if (response.status === 202) {
      // Handle not found with status code 404
      throw new Error("Message not found");
    } else {
      // Handle other status codes
      throw new Error("Unexpected response status code: " + response.status);
    }
  } catch (error) {
    // Handle error
    console.log(error);
    return error;
  }
}

function janny_tools(messageID,
                     boardRoute,
                     forcedUpdateSignalFunc,
                     updateSessionFunc) {
  
   const sd = sessionStorage.getItem('sessionData') ?
   JSON.parse(sessionStorage.getItem('sessionData')) : {};

  const rm_message = () => {
      fetch(API_URL+"/api/remove_post", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sd.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
           messageID:messageID,
           boardRoute:boardRoute
          })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Server responded with status ${errorData.message}`);
          });
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        console.log(data);
        // TODO: we now send signal to update messages

        // update the new accesses token if need be
        if (data.newAccessToken!==undefined) {
          console.log("I WAS GIVEN NEW TOKEN",data.newAccessToken)
          updateSessionFunc({accessToken: data.newAccessToken, 
                            username: sd.username})
        }
        forcedUpdateSignalFunc();

      })
      .catch(error => {
        // Handle any errors that occurred during the fetch request
        console.error(error);
      });
  }

   if (Object.keys(sd).length > 0) {
      return (
        <Button
          
          variant="danger"
          className="btn btn-primary btn-large centerButton"
          onClick={rm_message}
          id="janny_button_border"
          type="submit">Remove!
        </Button>
      )
   }
  return (<></>)
}


function Message({ data, boardRoute,forcedUpdateSignalFunc,updateSessionFunc}) {
  // const username = data.username || "Anon";
  // const date = data.date_sent || "ERROR";
  // const time = data.date_time || "ERROR";
  // const message_text = data.message_text;
  // const imageData = data.base64Data || undefined;

  const [username,setUsername] = useState(data.username || "Loading...");
  const [date,setDate] = useState(data.date_sent || "Date sent");
  const [time,setTime] = useState(data.date_time || "Date time");
  const [message_text,setMessage_text] = useState(data.message_text || "");
  const [imageData,setImageData] = useState(data.base64Data || undefined);

  const getMessageData = async (messageID) => {
    try {
      const msgData = await get_messageData(messageID,boardRoute);
      setUsername(msgData.username || "Anon")
      setDate(msgData.date_sent || "ERROR")
      setTime(msgData.date_time || "ERROR")
      setMessage_text(msgData.message_text || "ERROR")
      setImageData(msgData.base64Data || undefined)
    } catch (error) {
      // TODO: What do to if there is a error??? YIKES
      const msgData = error;
      setUsername(msgData.username || "Anon")
      setDate(msgData.date_sent || "ERROR")
      setTime(msgData.date_time || "ERROR")
      setMessage_text(msgData.message_text || "ERROR")
      setImageData(msgData.base64Data || undefined)
    }
  }
  if (data.messageID) {
    getMessageData(data.messageID);
  }
  return (
    <Card className='message_card'>
      <Card.Title className='message_title'>
        <div className='message_title_text'>
          User: {username}<br />
          Sent: {date}-{time}
        </div>
        <div id="janny_button">
          {janny_tools(data.messageID,
                    boardRoute,
                    forcedUpdateSignalFunc,
                    updateSessionFunc)}
          </div>
      </Card.Title>
      <Card.Body className='message_body'>
        {mk_image(imageData)}
        <Card.Text className='message_text'>
          {message_text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Message;
