import React from "react";
import {channelSchema} from '../validate'
import { Field, Formik, Form, ErrorMessage } from "formik";
import {useAddChannelMutation, useFetchChannelsQuery, useEditChannelMutation} from '../slices/channelsApi'
import { Modal } from 'react-bootstrap'
 import { useTranslation } from "react-i18next";

export const ModalWindow = ({modalState, closeModal, setCurrentChannelId}) => {
  const { t } = useTranslation();


const [addChannel] = useAddChannelMutation()
const [editChannel] = useEditChannelMutation()
const {data: channels} = useFetchChannelsQuery()

const uniqueCheck = (channel) => {
  return channels?.some((obj => obj.name === channel)) 
}

const validateUnique = (value) => {
if(uniqueCheck(value)) return  t('errors.unique')
return undefined
};

const handleAddChannel = (channelName) => {
 return addChannel({name: channelName})
}
const handleRenameChannel = (newName)=> {

  return editChannel({
    id: modalState.channelId,
    name: newName})
}

   return (
    <Modal show={true} onHide={closeModal}>
    <Formik
    initialValues={{ channelName: modalState.type ==='rename' ? modalState.channelName : "" }}
    validationSchema={channelSchema}
    onSubmit = {async ({channelName}) =>{
      try{
        if(modalState.type === 'add') {
          const newChannel = await handleAddChannel(channelName).unwrap()
          setCurrentChannelId(newChannel.id)
        }
        else {
          await handleRenameChannel(channelName).unwrap()
          }
            closeModal()
      }
      catch(error){
          console.log(error)
      }
    }
  }>
      <Form>
      <Modal.Header closeButton>
      <Modal.Title>{modalState.type === 'add'? t('channels.addChannel') : t('channels.rename') } </Modal.Title> 
      </Modal.Header>
      <Modal.Body>
           <Field name="channelName" validate={validateUnique}>
                    {({field, meta})=>(
                 <>
                  <input 
                  {...field}
                  type="text" 
                  id="channelName"
                  className={`form-control ${(meta.touched && meta.error) ? 'is-invalid': ''}` }
                  />
            <label className="visually-hidden" htmlFor="channelName">{t('channels.name')}</label>
            <ErrorMessage name='channelName' component='div' className="invalid-feedback" />
                </>
                )}
              </Field>
              </Modal.Body>
            <Modal.Footer>
        <button type="submit" className="btn btn-primary">{t('channels.save')}</button>
        <button onClick ={closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">{t('channels.cancel')}</button>
      </Modal.Footer>
    </Form>
    </Formik>
    </Modal>
   )
}