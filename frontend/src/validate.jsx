import * as Yup from 'yup';

 const SignInSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Too short!')
    .max(20, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(5, 'Too short!')
    .max(15, 'Too Long!')
    .required('Required'),

})
 
const SignUpSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Too short!')
    .max(20, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(5, 'Too short!')
    .max(15, 'Too Long!')
    .required('Required'),
    password2: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'),null], 'Passwords must match')
})

const channelSchema = Yup.object().shape({
    channelName: Yup.string()
    .min(3, 'Too short!')
    .max(20, 'Too Long!')
})
export {SignInSchema, SignUpSchema, channelSchema}