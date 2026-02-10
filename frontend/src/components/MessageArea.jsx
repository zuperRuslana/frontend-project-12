import React from "react";
import { MessageForm } from "./MessageForm";

export const MessageArea = ({ messages, channels, currentChannelId }) => {
    const currentChannel = channels.find((c) => String(c.id) === String(currentChannelId));

    const currentMessages = messages.filter(message => message.channelId === currentChannelId)
    console.log(currentChannel)

    return(
        <div className="col p-0 h-100">
             <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># {currentChannel?.name ?? 'channel'}</b></p>
                    <span className="text-muted"> {currentMessages.length}</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5">
                {currentMessages.map((msg)=> (
                    <div key={msg.id} className="text-break mb-2">
                        <b>{msg.username}</b>: {msg.body}
                    </div>
                        ))}
                        <MessageForm currentChannelId={currentChannelId} />
                </div>
                </div>
            </div>
                             
    )
}