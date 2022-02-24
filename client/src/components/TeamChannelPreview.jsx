import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ channel, type}) => {
    // Render the channel and client variables from useChatContect API of stream.
    const {channel: activeChannel, client} = useChatContext(); // renaming channel to activeChannel

    const ChannelPreview = () => {
        // ? => checks if the channel is present in the list. similarly if data is found or not, etc.
        return(
            <p className="channel-preview__item">
                # {channel?.data?.name || channel?.data?.id}
            </p>
        );
    }

    const DirectPreview = () => {
        /*
            const members = channel.state.members
            Output looks as follows:
            { // Object with key and the object as value!
                12:{}
                3234:{}
                342:{}
            }

            we need [{}, {}, {}] i.e. an array of objects
        */

            // Get all the userID that is not equal to the client's id who is requesting for the list.
            // Object.values() // is equivalent to map.values()
        const members = Object.values(channel.state.members).filter(({ user }) =>  user.id !== client.userID);
        return (
            <div className="channel-preview__item single">
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24} // ??????????????????
                />
                <p>{members[0]?.user?.fullName}</p>
            </div>
        );
    }

    return (
        <div className= {
            channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'
        }
        onClick={() => {
            console.log(channel);
        }}
        >
            {
                type === 'team' ? <ChannelPreview/> : <DirectPreview/> // Render options!
            } 
        </div>
    )
}

export default TeamChannelPreview;