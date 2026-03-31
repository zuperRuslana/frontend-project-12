import { channelSchema } from '../validate'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { useAddChannelMutation, useFetchChannelsQuery, useEditChannelMutation } from '../slices/channelsApi'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import textCensor from '../utils/leo_profanity'
import { useDispatch } from 'react-redux'
import { setChannelBackground } from '../slices/channelBackgroundsSlice'

export const ModalWindow = ({ modalState, closeModal, setCurrentChannelId }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [addChannel] = useAddChannelMutation()
  const [editChannel] = useEditChannelMutation()
  const { data: channels } = useFetchChannelsQuery()

  const uniqueCheck = (channel) => {
    return channels?.some(obj => obj.name === channel)
  }

  const validateUnique = (value) => {
    if (uniqueCheck(value)) return t('errors.unique')
    return undefined
  }

  const handleAddChannel = (channelName) => {
    return addChannel({ name: textCensor(channelName) })
  }
  const handleRenameChannel = (newName) => {
    return editChannel({
      id: modalState.channelId,
      name: textCensor(newName),
    })
  }
  const handleSubmit = async ({ channelName }) => {
    try {
      if (modalState.type === 'add') {
        const backgroundIndex = (channels?.length ?? 0) % 5
        const newChannel = await handleAddChannel(channelName).unwrap()
        dispatch(setChannelBackground({
          channelId: newChannel.id,
          backgroundIndex,
        }))
        setCurrentChannelId(newChannel.id)
      }
      else {
        await handleRenameChannel(channelName).unwrap()
      }
      closeModal()
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal show={true} onHide={closeModal} animation={false} centered>
      <Formik
        initialValues={{ channelName: modalState.type === 'rename' ? modalState.channelName : '' }}
        validationSchema={channelSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalState.type === 'add' ? t('channels.addChannel') : t('channels.rename') }
                {' '}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field name="channelName" validate={validateUnique}>
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      id="channelName"
                      autoComplete="off"
                      className={`form-control ${(meta.touched && meta.error) ? 'is-invalid' : ''}`}
                    />
                    <label className="visually-hidden" htmlFor="channelName">{t('channels.name')}</label>
                    <ErrorMessage name="channelName">
                      {msg => (
                        <div className="invalid-feedback">
                          {t(msg)}
                          {' '}
                        </div>
                      )}
                    </ErrorMessage>
                  </>
                )}
              </Field>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">{t('channels.save')}</button>
              <button onClick={closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">{t('channels.cancel')}</button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
