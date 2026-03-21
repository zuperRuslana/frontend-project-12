import React from 'react'
import { MessageForm } from './MessageForm'
import { useTranslation } from 'react-i18next'
import strawberryBg from '../design/strawberry-bg.svg'
import pineappleBg from '../design/pineapple-bg.svg'
import grapeBg from '../design/grape-bg.svg'
import blueberryBg from '../design/blueberry-bg.svg'
import orangeBg from '../design/orange-bg.svg'


const backgrounds = [
  strawberryBg,
  pineappleBg,
  grapeBg,
  blueberryBg,
  orangeBg,
]
export const MessageArea = ({ messages, channels, currentChannelId, backgroundIndex }) => {
  const { t } = useTranslation()

  const currentChannel = channels.find(c => String(c.id) === String(currentChannelId))
  const currentMessages = messages.filter(message => message.channelId === currentChannelId)
  const bgUrl = backgrounds[backgroundIndex ?? 0]

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel?.name ?? 'channel'}</b></p>
          <span className="text-muted"> {t('keyWithCount', { count: currentMessages.length })} </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map(msg => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>: {msg.body}
            </div>
          ))}
        </div>
        <MessageForm currentChannelId={currentChannelId} />

      </div>
    </div>

  )
}
