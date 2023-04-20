// error page
import React from 'react';
import './Home.css'
import './glitch.css';


function Error(){

    return(
        <div className="glitch-wrapper">
            <h1 className='glitch' data-glitch="You've 404'd Idiot">You've 404'd Idiot</h1>
            <img 
                src={require("../assets/404.png")} 
                alt="you 404'd dumbass"
                width="500"
                height="500"
                className="d-inline-block align-top align-center"
            />
            <h1 className='glitch' data-glitch="Go Back">Go Back</h1>
        </div>


    );

}
export default Error;