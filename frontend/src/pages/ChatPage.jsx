import { useEffect, useState } from 'react'
import { useFetchChannelsQuery } from '../slices/channelsApi'
import { useFetchMessagesQuery } from '../slices/messagesApi'
import { ChannelSidebar } from '../components/ChannelSidebar'
import { MessageArea } from '../components/MessageArea'
import socket from '../socket'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Chats = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const userToken = useSelector(state => state.auth.token)
  useEffect(() => {
    if (userToken === null) {
      navigate('/login')
    }
  }, [userToken, navigate])

  const channelCreated = () => {
    toast(t('toast.channelCreated'))
  }
  const channelRenamed = () => {
    toast(t('toast.channelRenamed'))
  }
  const channelDeleted = () => {
    toast(t('toast.channelDeleted'))
  }

  const { error: channelsError, isLoading: loadingChannels, data: channels, refetch: refetchChannels } = useFetchChannelsQuery()
  const { error: messagesError, isLoading: loadingMessages, data: messages, refetch: refetchMessages } = useFetchMessagesQuery()
  const [currentChannelId, setCurrentChannelId] = useState('1')

  const channelBackgrounds = useSelector(state => state.channelBackgrounds)
  const backgroundIndex = channelBackgrounds[currentChannelId] ?? 0
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected: ${socket.id}`)
    })
    socket.on ('newMessage', (message) => {
      console.log(message)
      refetchMessages()
    })

    socket.on('removeChannel', (channelToDelete) => {
      console.log(channelToDelete)
      channelDeleted()
      refetchChannels()
    })
    // subscribe rename channel
    socket.on('renameChannel', (channelToChange) => {
      console.log(channelToChange)
      channelRenamed()
      refetchChannels()
    })
    socket.on('newChannel', (channelToChange) => {
      console.log(channelToChange)
      channelCreated()
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

  if (loadingChannels || loadingMessages) return <div>{t('chatsStatus.loading')}</div>
  if (channelsError || messagesError) return <div>{t('chatsStatus.loadingError')}</div>

  console.log('Chats render, channels:', channels)

  return (
    <div className="h-100">
      <div className="d-flex flex-column vh-100">
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
                  backgroundIndex={backgroundIndex}

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
