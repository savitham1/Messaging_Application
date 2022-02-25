import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, CooldownTimer } from 'stream-chat-react';
import { Cookies } from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';


import './App.css'; // import the styles sheet
const cookies = new Cookies();

// API Key to setup the chat
const apiKey = 'vk5phseceqhb'; // use this to initialize the chat! ???

const authToken = cookies.get('token'); // get the token associated with the used if the user exists.

// get an instance of the StreamChat - each user/ client get a unique instance based on the api key.
// api key will ensure the same instance is rendered
const client = StreamChat.getInstance(apiKey);

// if userID is found then get all the information about the user.
if (authToken) {
    client.connect({
        token: cookies.get('token'),
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

// Main Applicaiton Component
// a function without any parameters
const App = () => {

    if (!authToken) return <Auth /> // If we still haven't logged in then only display Auth component.

    return (
        <div className="app__wrapper"> 
            <Chat client={client} theme="team light">
                <ChannelListContainer
                
                />

                <ChannelContainer
                
                />
            </Chat>
        </div>
    );
}

export default App;