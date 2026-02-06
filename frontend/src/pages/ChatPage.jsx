import React, { useState } from "react";
import {useFetchChannelsQuery} from '../slices/channelsApi'
import {useFetchMessagesQuery} from '../slices/messagesApi'
import { ChannelSidebar } from '../components/ChannelSidebar'
import { MessageArea } from '../components/MessageArea'
import { Header } from "../components/Header";

const Chats = () => {

const {error: channelsError, isLoading: loadingChannels, data: channels } = useFetchChannelsQuery()  
const { error: messagesError, isLoading: loadingMessages, data: messages } = useFetchMessagesQuery()
const [currentChannelId, setCurrentChannelId] = useState('1')

if (loadingChannels || loadingMessages ) return <div>Загрузка...</div>
if (channelsError || messagesError) return <div>Ошибка загрузки</div>

    return (
        <div className="h-100">
        <div className="d-flex flex-column vh-100">
            <Header />

        <div className="flex-grow-1 min-vh-0 py-4">
            <div className="container h-100">
            <div className="card h-100 border-0 shadow overflow-hidden">
            <div className="row g-0 h-100">

            <ChannelSidebar 
            channels={channels} 
            currentChannelId={currentChannelId} 
            setCurrentChannelId={setCurrentChannelId} 
            />

            <MessageArea 
            channels={channels}
            messages={messages} 
            currentChannelId={currentChannelId} 
            />
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        
    )                             
}

export default Chats