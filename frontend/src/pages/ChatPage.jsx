import React, { useEffect, useState } from "react";
import {useFetchChannelsQuery} from '../slices/channelsApi'
import {useFetchMessagesQuery} from '../slices/messagesApi'
import { ChannelSidebar } from '../components/ChannelSidebar'
import { MessageArea } from '../components/MessageArea'
import { Header } from "../components/Header";
import  socket  from "../socket";
const Chats = () => {


const {error: channelsError, isLoading: loadingChannels, data: channels, refetch: refetchChannels } = useFetchChannelsQuery()  
const { error: messagesError, isLoading: loadingMessages, data: messages,refetch: refetchMessages } = useFetchMessagesQuery()
const [currentChannelId, setCurrentChannelId] = useState('1')


useEffect(()=> {
    socket.on('connect', () => { 
        console.log(`Connected: ${socket.id}`) 
    })
    socket.on ('newMessage', (message) => {
        console.log(message)
        refetchMessages()
    })

    socket.on('removeChannel', (channelToDelete) => {
        console.log(channelToDelete)
        refetchChannels()
      })
      // subscribe rename channel
      socket.on('renameChannel', (channelToChange) => {
        console.log(channelToChange)
        refetchChannels()
      })
      socket.on('newChannel', (channelToChange) => {
        console.log(channelToChange)
        refetchChannels()
      })
        return () => {
            socket.off('connect')
    socket.off('newMessage')
    socket.off('removeChannel')
    socket.off('renameChannel')
    socket.off('newChannel')

  }
}, [])

if (loadingChannels || loadingMessages ) return <div>Загрузка...</div>
if (channelsError || messagesError) return <div>Ошибка загрузки</div>

console.log('Chats render, channels:', channels)


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