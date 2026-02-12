import React from "react";
import {channelSchema} from '../validate'
import { Field, Formik, Form, ErrorMessage } from "formik";
import {useAddChannelMutation, useFetchChannelsQuery} from '../slices/channelsApi'
import { Modal } from 'react-bootstrap'

export const ModalWindow = ({toggle}) => {
const [addChannel] = useAddChannelMutation()
const {data: channels} = useFetchChannelsQuery()

const uniqueCheck = (channel) => {
  return channels?.some((obj => obj.name === channel)) 
}

const validateUnique = (value) => {
if(uniqueCheck(value)) return 'Должно быть уникальным'
return undefined
};

const handleAddChannel = (channelName) => {
 return addChannel({name: channelName})
}
   return (
    <Modal show={true} onHide={toggle}>
    <Formik
    initialValues={{channelName: ""}}
    validationSchema={channelSchema}
    onSubmit = {async ({channelName}) =>{
      try{
        await handleAddChannel(channelName).unwrap()
        toggle()
      }
      catch(error){
          console.log(error)
      }
    }
  }>
      <Form>
      <Modal.Header closeButton>
      <Modal.Title>Добавить канал</Modal.Title> 
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
            <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
            <ErrorMessage name='channelName' component='div' className="invalid-feedback" />
                </>
                )}
              </Field>
              </Modal.Body>
            <Modal.Footer>
        <button type="submit" className="btn btn-primary">Сохранить</button>
        <button onClick ={toggle} type="button" className="btn btn-secondary" data-dismiss="modal">Отменить</button>
      </Modal.Footer>
    </Form>
    </Formik>
    </Modal>
   )
}