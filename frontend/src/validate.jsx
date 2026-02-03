import * as Yup from 'yup';

export const SignInSignOutSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Too short!')
    .max(20, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(5, 'Too short!')
    .max(15, 'Too Long!')
    .required('Required')
})
