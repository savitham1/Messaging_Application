import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Cookies } from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';


import './App.css'; // import the styles sheet

// API Key to setup the chat
const apiKey = 'vk5phseceqhb'; // use this to initialize the chat! ???

// get an instance of the StreamChat - each user/ client get a unique instance based on the api key.
// api key will ensure the same instance is rendered
const client = StreamChat.getInstance(apiKey);

const authToken = false;
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