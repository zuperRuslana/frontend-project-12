import { MessageForm } from './MessageForm'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import strawberryBg from '../design/strawberry-bg.svg'
import pineappleBg from '../design/pineapple-bg.svg'
import grapeBg from '../design/grape-bg.svg'
import blueberryBg from '../design/blueberry-bg.svg'
import orangeBg from '../design/orange-bg.svg'
import { useEffect, useRef } from 'react'

const backgrounds = [
  strawberryBg,
  pineappleBg,
  grapeBg,
  blueberryBg,
  orangeBg,
]
export const MessageArea = ({ messages, channels, currentChannelId, backgroundIndex }) => {
  const { t } = useTranslation()
  const currentUser = useSelector(state => state.auth.user)

  let ref = useRef(null)
  
  const currentChannel = channels.find(c => String(c.id) === String(currentChannelId))
  const currentMessages = messages.filter(message => message.channelId === currentChannelId)
  useEffect(() => {
    ref.current?.scrollIntoView()
  },[currentMessages])

  const bgUrl = backgrounds[backgroundIndex ?? 0]

  return (
    <div className="col p-0 h-100">
      <div
        className="d-flex flex-column h-100"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel?.name ?? 'channel'}
            </b>
          </p>
          <span className="text-muted">
            {' '}
            {t('keyWithCount', { count: currentMessages.length })}
            {' '}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-4 pb-2">
          {currentMessages.map((msg) => {
            const isOwn = msg.username === currentUser
            return (
              <div key={msg.id} className={`d-flex mb-2 ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}>
                <div
                  className="text-break px-3 py-2"
                  style={{
                    maxWidth: '70%',
                    borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: isOwn ? 'rgba(180, 255, 210, 0.88)' : 'rgba(255, 255, 255, 0.82)',
                    backdropFilter: 'blur(2px)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                  }}
                >
                  {!isOwn && (
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '2px', color: '#7c4dff' }}>
                      {msg.username}
                    </div>
                  )}
                  <span style={{ fontSize: '0.95rem' }}>{msg.body}</span>
                </div>
              </div>
            )
          })}
          <div ref={ref} />
        </div>
        <MessageForm currentChannelId={currentChannelId} />

      </div>
    </div>

  )
}
