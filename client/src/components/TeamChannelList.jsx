import React from 'react';

import { AddChannel } from '../assets/AddChannel';

const TeamChannelList = ({ children, error = false, loading, type}) => {
    if (error) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }
    if (loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {
                        type === 'team' ? 'Channels' : 'Messages' // Java script block inside JSX!
                    } loading...
                </p>
            </div>
        );
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                {/* Button - add channel */}
            </div>
            {
                children  // Children props - everything that has been passed to TeamChannelList is rendered here!
            }
        </div>
    );
}

export default TeamChannelList;
