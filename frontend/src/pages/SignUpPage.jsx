import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { SignUpSchema }  from '../validate'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCredentials } from "../slices/authentificationSlice";
import axios from "axios";


const Signup = () => {

const [registerFailed, setRegisterFailed] = useState(false)

const navigate = useNavigate()
const dispatch = useDispatch();


  return ( 
  <Formik
    initialValues={{ username: "", password: "" , password2: ""}}
    validationSchema={SignUpSchema} 
    onSubmit={async ({username, password, password2}) => {
      try {
        const response= await axios.post('/api/v1/signup',{
            username,
            password
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)
        setRegisterFailed(false)
        console.log(response.data)
        dispatch(setCredentials({user: username, token: response.data.token}))
        navigate('/') 
        
      }
      catch(error) {
        if(error.response && error.response.status === 409){
            setRegisterFailed(true)
        }
      }
    }
}
  >
    {() => (
    <div className="container text-center" >
     <div className="row justify-content-center align-content-center h-100">

      <Form className="col-md-auto">
      <h1 className="text-center mb-4">Регистрация</h1>
        <div className="form-floating mb-3">
          <Field name="username" >
            {({field, meta})=>(
         <>
          <input 
          {...field}
          type="text" 
          id="username"
          className={`form-control ${(meta.touched && meta.error) || registerFailed ? 'is-invalid': ''}` }/>
         <label htmlFor="username">Имя пользователя</label>
            <ErrorMessage name='username' component='div' className="invalid-feedback" />
        </>
            )}
        </Field>
        </div>
        <div className="form-floating mb-3">
          <Field name="password">
            {({field,meta})=> (
                <>
                <input 
                {...field}
                type="password"
                id="password"
                className={`form-control ${(meta.touched && meta.error) || registerFailed ? 'is-invalid': ''}` } 
                />
             <label htmlFor="password">Пароль</label>
          <ErrorMessage name='password' component='div' className="invalid-feedback" />
        </>
            )}
        </Field>
        </div>
        <div className="form-floating mb-3">
          <Field name="password2">
            {({field,meta})=> (
                <>
                <input 
                {...field}
                type="password"
                id="password2"
                className={`form-control ${(meta.touched && meta.error) || registerFailed ? 'is-invalid': ''}` } 
                />
             <label htmlFor="password2">Пароль</label>
          <ErrorMessage name='password2' component='div' className="invalid-feedback" />
        </>
            )}
        </Field>
        </div>
        {registerFailed ? <div className="text-danger mb-3">Такой пользователь уже существует</div> : ''}

        <button type="submit">Зарегестрироваться</button>
      </Form>
      </div>
      </div>
    )}
  </Formik>
  )
};
export default Signup;
