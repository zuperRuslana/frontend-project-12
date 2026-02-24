import Button from "react-bootstrap/Button"
import { useState } from 'react'
import { ModalWindow } from "./ModalChannels"
import { ChannelDropdown } from "./ChannelDropdown"
import { Plus } from 'react-bootstrap-icons'
import { useTranslation } from "react-i18next"


export const ChannelSidebar = ({ channels, setCurrentChannelId, currentChannelId }) => {
    const { t } = useTranslation();

const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    channelId: null,
    channelName: null
})
const openAddModal = () => {
    setModalState({
    isOpen: true,
    type: 'add',
    channelId: null,
    channelName: null
})
}

const openRenameModal = ({id,name}) => {
    setModalState({
    isOpen: true,
    type: 'rename',
    channelId: id,
    channelName: name
})
}
const closeModal = () => {
    setModalState({
    isOpen: false,
    type: null,
    channelId: null,
    channelName: null
    }
)}
console.log('channels:', channels)

    return (
        <div className="col-4 col-md-2 border-end bg-light d-flex flex-column h-100 px-0">
<div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">               
     <b>{t("chats.channels")}</b>
                <Button 
            onClick={openAddModal}
            variant="link"
            className="btn-light p-1 text-slate border border-slate d-flex align-items-center justify-content-center"
>
  <Plus size={20} />
</Button>
                    {modalState.isOpen ? <ModalWindow modalState={modalState} closeModal={closeModal} setCurrentChannelId={setCurrentChannelId} /> : ''}
                    </div>
                    <ul className="nav flex-column nav-pills px-2 pb-2 overflow-auto flex-grow-1 mb-0">
                    {channels.map((channel)=>(
                        <li key={channel.id} className="nav-item w-100">
                            {channel.removable 
                                ?   <ChannelDropdown 
                                        openRenameModal={openRenameModal} 
                                        id ={channel.id} 
                                        name={channel.name}
                                        setCurrentChannelId={setCurrentChannelId}
                                        currentChannelId={currentChannelId} 

                                    /> 
                                : <button 
                                onClick={()=> setCurrentChannelId(channel.id)}
                                className="w-100 rounded-0 text-start text-truncate btn">
                                    {channel.name}
                                </button>
                        }
                        </li>
                    ))
                    }
                    </ul>
            </div>
    
     )
}
