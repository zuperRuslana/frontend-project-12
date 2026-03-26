import { Field, Formik, Form, ErrorMessage } from 'formik'
import { SignUpSchema } from '../validate'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import pineappleBg from '../design/pineapple-bg.svg'

const Signup = () => {
  const { t } = useTranslation()

  const [registerFailed, setRegisterFailed] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async ({ username, password }) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username,
        password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', username)
      setRegisterFailed(false)
      dispatch(setCredentials({ user: username, token: response.data.token }))
      navigate('/')
    }
    catch (error) {
      if (error.response && error.response.status === 409) {
        setRegisterFailed(true)
      }
    }
  }

  return (

    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: `url(${pineappleBg})`, backgroundSize: '400px', backgroundRepeat: 'repeat' }}>
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(2px)' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4">{t('forms.register')}</h1>
          <Formik
            initialValues={{ username: '', password: '', password2: '' }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}>
            {() => (

              <Form className="col-md-auto card-text">
                <div className="form-floating mb-3">
                  <Field name="username">
                    {({ field, meta }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          id="username"
                          className={`form-control ${(meta.touched && meta.error) || registerFailed ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="username">{t('forms.login')}</label>
                        <ErrorMessage name="username">
                          {msg => (
                            <div className="invalid-tooltip">
                              {t(msg)}
                              {' '}
                            </div>
                          )}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </div>
                <div className="form-floating mb-3">
                  <Field name="password">
                    {({ field, meta }) => (
                      <>
                        <input
                          {...field}
                          type="password"
                          id="password"
                          className={`form-control ${(meta.touched && meta.error) || registerFailed ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="password">{t('forms.password')}</label>
                        <ErrorMessage name="password">
                          {msg => (
                            <div className="invalid-tooltip">
                              {t(msg)}
                              {' '}
                            </div>
                          )}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </div>
                <div className="form-floating mb-4">
                  <Field name="password2">
                    {({ field, meta }) => (
                      <>
                        <input
                          {...field}
                          type="password"
                          id="password2"
                          className={`form-control ${(meta.touched && meta.error) || registerFailed ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="password2">{t('forms.repeatPassword')}</label>
                        <ErrorMessage name="password2">
                          {msg => (
                            <div className="invalid-tooltip">
                              {t(msg)}
                              {' '}
                            </div>
                          )}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </div>
                {registerFailed ? <div className="text-danger mb-3">{t('errors.user_exists')}</div> : ''}

                <button className="btn btn-outline-secondary w-100 mb-3" type="submit">{t('forms.signup')}</button>
              </Form>

            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
export default Signup
