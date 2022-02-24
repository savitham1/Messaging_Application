import React, { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';

import { SearchIcon } from '../assets/SearchIcon';
const ChannelSearch = () => {
    const [query, setQuery] = useState(''); //Initial value is empty.
    const [loading, setLoading] = useState(false);

    // get the channels
    const getChannels = async (text) => {
        try {
            // TODO: fetch channels
        }
        catch (error) {
            setQuery('') // if there is an error reset the query!
        }
    }

    const onSearch = (event) => {
        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value); // to get the text from the event
        getChannels(event.target.value);
    }
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input 
                    className="channel-search__input__text" 
                    placeholder="Search" 
                    type="text" 
                    value={query}
                    onChange={onSearch} 
                />
            </div>
        </div>
    );
}

export default ChannelSearch;
