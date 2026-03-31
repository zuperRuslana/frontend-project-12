import { Field, Formik, Form, ErrorMessage } from 'formik'
import { SignInSchema } from '../validate'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import strawberryBg from '../design/strawberry-bg.svg'

const Login = () => {
  const { t } = useTranslation()

  const [authFailed, setauthFailed] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginUser = async ({ username, password }) => {
    try {
      const response = await axios.post('/api/v1/login', {
        username,
        password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', username)
      setauthFailed(false)
      dispatch(setCredentials({ user: username, token: response.data.token }))
      navigate('/')
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        setauthFailed(true)
      }
    }
  }

  return (

    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: `url(${strawberryBg})`, backgroundSize: '400px', backgroundRepeat: 'repeat' }}>
      <div className="card shadow" style={{ width: '100%', maxWidth: '420px', backgroundColor: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(2px)' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4 fs-3 fw-bold text-slate">{t('forms.signin')}</h1>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={loginUser}
          >
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
                          autoComplete="off"
                          className={`form-control ${(meta.touched && meta.error) || authFailed ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="username">{t('forms.name')}</label>
                        <ErrorMessage name="username">
                          {msg => <div className="invalid-tooltip">{t(msg)}</div>}
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
                          autoComplete="off"
                          className={`form-control ${(meta.touched && meta.error) || authFailed ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="password">{t('forms.password')}</label>
                        <ErrorMessage name="password">
                          {msg => <div className="invalid-tooltip">{t(msg)}</div>}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </div>
                {authFailed
                  ? (
                      <div className="text-danger mb-3">
                        {' '}
                        {t('errors.error')}
                      </div>
                    )
                  : ''}

                <button className="btn btn-outline-secondary w-100 mb-3" type="submit">{t('forms.signin')}</button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="card-footer text-center bg-light py-3">
          <span className="text-muted">
            {t('forms.newUser')}
            {' '}
          </span>
          <a href="/signup" className="text-slate fw-medium">{t('forms.register')}</a>
        </div>
      </div>
    </div>

  )
}
export default Login
