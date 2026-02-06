import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { SignInSignOutSchema } from '../validate'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actions as authActions} from '../slices/authentificationSlice'
import axios from "axios";
const Login = () => {

const [authFailed, setauthFailed] = useState(false)

const navigate = useNavigate()
const dispatch = useDispatch();


  return ( 
  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={SignInSignOutSchema}
    onSubmit={async ({username, password}) => {
      try {
        const response= await axios.post('/api/v1/login',{
            username,
            password
        })
        localStorage.setItem('token', response.data.token)
        setauthFailed(false)
        console.log(response.data)
        dispatch(authActions.setCredentials({user: username, token: response.data.token}))
        navigate('/')
      }
      catch(error) {
        if(error.response && error.response.status === 401){
            setauthFailed(true)
        }
      }
    }
}
  >
    {() => (
    <div className="container text-center" >
     <div className="row justify-content-center align-content-center h-100">

      <Form className="col-md-auto">
      <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <Field name="username" >
            {({field, meta})=>(
         <>
          <input 
          {...field}
          type="text" 
          id="username"
          className={`form-control ${(meta.touched && meta.error) || authFailed ? 'is-invalid': ''}` }/>
         <label htmlFor="username">Ваш ник</label>
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
                className={`form-control ${(meta.touched && meta.error) || authFailed ? 'is-invalid': ''}` } 
                />
             <label htmlFor="password">Пароль</label>
          <ErrorMessage name='password' component='div' className="invalid-feedback" />
        </>
            )}
        </Field>
        </div>
        {authFailed ? <div className="text-danger mb-3">the username or password is incorrect</div> : ''}

        <button type="submit">Войти</button>
      </Form>
      </div>
      </div>
    )}
  </Formik>
  )
};
export default Login;
