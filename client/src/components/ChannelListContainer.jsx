import React from 'react';

import { ChannelList, useChatContext } from 'stream-chat-react'; // Stream API components
import Cookies from 'universal-cookie'; // cookies

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'; // My components
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const SideBar = () => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon2__inner">
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Chat Messenger</p>
    </div>
);

const ChannelListConstainter = () => {
    return (
        <>
            <SideBar />
            <div className="channel-list__list__wrapper">
                <CompanyHeader // Component to get company header
                
                />
                <ChannelSearch // Channel Search bar

                />  

                {/* Channel List for group messaging */}
                <ChannelList        // Stream API's component to get the channels as a list
                    filters={{}} // an object that is going to allow us to filter some messages!
                    channelRenderFilterFn={() => {}} // function that is called to get channels after the filters applied
                    List={(listProps) => (
                        <TeamChannelList // to customise the Channel list provided by stream with out own list of channels.
                    { ... listProps /* Spread those props*/} // get all the default channels provided dby stream API.
                            type="team"
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            { ... previewProps}
                            type="team"
                        />
                    )}
                />

                {/* Channel List for Private Messaging */}
                <ChannelList        // Stream API's component to get the channels as a list
                    filters={{}} // an object that is going to allow us to filter some messages!
                    channelRenderFilterFn={() => {}} // function that is called to get channels after the filters applied
                    List={(listProps) => (
                        <TeamChannelList // to customise the Channel list provided by stream with out own list of channels.
                    { ... listProps /* Spread those props*/} // get all the default channels provided dby stream API.
                            type="messaging"
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            { ... previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

export default ChannelListConstainter;