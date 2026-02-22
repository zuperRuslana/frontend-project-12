import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { SignInSchema} from '../validate'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCredentials} from '../slices/authentificationSlice'
import axios from "axios";
const Login = () => {

const [authFailed, setauthFailed] = useState(false)

const navigate = useNavigate()
const dispatch = useDispatch();


  return ( 
    
    <div className="d-flex align-items-center justify-content-center vh-100">
<div className="card shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Войти</h1>

  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={SignInSchema}
    onSubmit={async ({username, password}) => {
      try {
        const response= await axios.post('/api/v1/login',{
            username,
            password
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)
        setauthFailed(false)
        console.log(response.data)
        dispatch(setCredentials({user: username, token: response.data.token}))
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

      <Form className="col-md-auto card-text">
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
        {authFailed ? <div className="text-danger mb-3"> Неверный логин или пароль</div> : ''}

        <button className="btn btn-outline-secondary w-100 mb-3" type="submit">Войти</button>
      </Form>
    )}
  </Formik>
  <div className="card-footer text-center bg-light py-3">
  <span className="text-muted">Нет аккаунта? </span>
  <a href="/signup" className="text-slate">Регистрация</a>
  </div>

     </div>
     </div>
     </div>
  
  )
};
export default Login;
