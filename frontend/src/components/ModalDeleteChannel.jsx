import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useRemoveChannelMutation } from "../slices/channelsApi";

function DeleteChannelModal({id, setCurrentChannelId, currentChannelId, modalIsOpened, setModalIsOpened}) {

    const [removeChannel] = useRemoveChannelMutation();
    const handleChannelRemove = () => {
        removeChannel({id})
        if (currentChannelId === id) 
            {
                setCurrentChannelId('1') 
            }
    }
  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={modalIsOpened}>
        <Modal.Header closeButton onHide={()=>setModalIsOpened(false)}>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Уверены?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={()=>setModalIsOpened(false)} variant="secondary">Отменить</Button>
          <Button onClick={()=> {handleChannelRemove(id)}}variant="danger">Удалить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteChannelModal;