import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DeleteChannelModal from "./ModalDeleteChannel";


export const ChannelDropdown = ({openRenameModal, id, name, setCurrentChannelId, currentChannelId})=>{

 const [modalIsOpened, setModalIsOpened] = useState(false)


console.log(modalIsOpened)
  
    
    return(
        <ButtonGroup>
            <Dropdown id="dropdown-basic-button">
                <Button variant="light" onClick={()=>setCurrentChannelId(id)}>{name}</Button>
                <Dropdown.Toggle split variant="light" />
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>openRenameModal({id, name})}>Переименовать</Dropdown.Item>
                <Dropdown.Item onClick={()=>setModalIsOpened(true)}>Удалить</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {modalIsOpened ?
                <DeleteChannelModal 
                id ={id} 
                setCurrentChannelId={setCurrentChannelId} 
                currentChannelId={currentChannelId} 
                setModalIsOpened={setModalIsOpened}
                modalIsOpened={modalIsOpened}/>
                : ''} 
      </ButtonGroup>

      
    );
  }

