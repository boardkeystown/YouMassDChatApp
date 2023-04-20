// message component to be rendered in message box
import React from 'react';
import {Card} from 'react-bootstrap';
import './Board.css';

function Board({titleText,bodyText}){
    return(
        <div>
            <Card>
                <Card.Title>
                    {titleText}
                </Card.Title>
                <Card.Body>
                    <Card.Text>
                        {bodyText}
                    </Card.Text>
                </Card.Body>

            </Card>
        </div>
    );

}
export default Board;