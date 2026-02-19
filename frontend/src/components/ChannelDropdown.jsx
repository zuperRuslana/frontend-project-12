import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useRemoveChannelMutation } from "../slices/channelsApi";
import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const ChannelDropdown = ({openRenameModal, id, name, setCurrentChannelId})=>{

    const [removeChannel] = useRemoveChannelMutation();
    
    return(
        <ButtonGroup>
            <Dropdown id="dropdown-basic-button">
                <Button variant="light" onClick={()=>setCurrentChannelId(id)}>{name}</Button>
                <Dropdown.Toggle split variant="light" />
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>openRenameModal({id, name})}>Переименовать</Dropdown.Item>
                <Dropdown.Item onClick={()=> removeChannel({id})}>Удалить</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
      </ButtonGroup>
    );
  }

