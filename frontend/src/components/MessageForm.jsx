import React from "react";
import Button from "react-bootstrap/Button"  
import { useState } from "react";
import {useAddMessageMutation} from '../slices/messagesApi'
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import textCensor  from '../utils/leo_profanity'

export const MessageForm = ({currentChannelId}) => {

  

const { t } = useTranslation();

const [newMessage, setNewMessage] = useState('')

const username = useSelector(state => state.auth.user)

const handleMessageText = (event) => {
    setNewMessage(event.target.value)
}

const addSubmitMessageHandler = (event) => {
    event.preventDefault()
    const message = {
        channelId: currentChannelId,
        username: username,
        body: textCensor(newMessage)
    }
    addMessage(message)
    setNewMessage('')
}
const [ 
    addMessage, 
    { error: messagesError, isLoading: loadingMessages},
] = useAddMessageMutation()

if (loadingMessages ) return <div>{t('messageStatus.sending')}</div>
if (messagesError) return <div>{t('messageStatus.sendingError')}</div>

return (
<div className="mt-auto px-5 py-3">
    <form onSubmit={addSubmitMessageHandler} noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
                <input name="body" aria-label={t('chats.newMessage')} placeholder={t('chats.sendMessage')}
                className="border-0 p-0 ps-2 form-control" value ={newMessage} onChange={handleMessageText}></input>
                <Button type="submit" className="btn btn-group-vertical" 
                disabled={newMessage.length ===0}  >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"
                className="bi bi-arrow-right-square">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                </svg>
                <span className="visually-hidden">{t('channels.send')}</span>
                </Button>
            </div>
     </form>
    </div>
                                       
)
}