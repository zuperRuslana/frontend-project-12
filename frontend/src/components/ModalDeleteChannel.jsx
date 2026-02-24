import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useRemoveChannelMutation } from "../slices/channelsApi";
 import { useTranslation } from "react-i18next";

function DeleteChannelModal({id, setCurrentChannelId, currentChannelId, modalIsOpened, setModalIsOpened}) {
    const { t } = useTranslation();

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
          <Modal.Title>{t('channels.deleteChannel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t('channels.areUsure')}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={()=>setModalIsOpened(false)} variant="secondary">{t('channels.cancel')}</Button>
          <Button onClick={()=> {handleChannelRemove(id)}}variant="danger">{t('channels.delete')}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteChannelModal;