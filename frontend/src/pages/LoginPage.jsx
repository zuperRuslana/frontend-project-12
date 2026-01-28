import React from "react";
import { Field, Formik } from "formik";
const Login = () => {
    <Formik
    initialValues={{email: '', password:''}}
    onSubmit={({setSubmitting}) => {
        console.log('Form is validated! Submitting the form...')
        setSubmitting(false)
    }}>
        {()=> (
            <Form>
                <div className="form-group">
                    <label htmlFor="Login">Login</label>
                    <Field
                    type='login'
                    name='login'
                    className='form-control'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                    type='password'
                    name='password'
                    className='form-control'
                    />
                </div>
            </Form>
        )}
    </Formik>
}
export default Login