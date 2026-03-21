import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { ButtonGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import DeleteChannelModal from './ModalDeleteChannel'
import { useTranslation } from 'react-i18next'

export const ChannelDropdown = ({ openRenameModal, id, name, setCurrentChannelId, currentChannelId }) => {
  const { t } = useTranslation()

  const [modalIsOpened, setModalIsOpened] = useState(false)

  console.log(modalIsOpened)

  return (
    <>
      <Dropdown as={ButtonGroup} id="dropdown-basic-button" className="w-100">
        <Button variant="light" className="w-100 text-start" onClick={() => setCurrentChannelId(id)}>{`# ${name}`}</Button>
        <Dropdown.Toggle split variant="light">
          <span className="visually-hidden">{t('channels.manage')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setModalIsOpened(true)}>{t('channels.delete')}</Dropdown.Item>
          <Dropdown.Item onClick={() => openRenameModal({ id, name })}>{t('channels.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {modalIsOpened
        ? (
            <DeleteChannelModal
              id={id}
              setCurrentChannelId={setCurrentChannelId}
              currentChannelId={currentChannelId}
              setModalIsOpened={setModalIsOpened}
              modalIsOpened={modalIsOpened}
            />
          )
        : ''}

    </>
  )
}
