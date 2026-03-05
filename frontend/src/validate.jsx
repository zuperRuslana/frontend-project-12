import * as Yup from 'yup';

 const SignInSchema = Yup.object().shape({
    username: Yup.string()
    .required('validation.required'),
    password: Yup.string()
    .required('validation.required'),

})
 
const SignUpSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'validation.short')
    .max(20, 'validation.long')
    .required('validation.required'),
    password: Yup.string()
    .min(6, 'validation.six')
    .required('validation.required'),
    password2: Yup.string()
    .required('validation.required')
    .oneOf([Yup.ref('password'),null], 'validation.must_be_same')
})

const channelSchema = Yup.object().shape({
    channelName: Yup.string()
    .min(3, 'validation.short')
    .max(20, 'validation.long')
    .required('validation.required')

})
export {SignInSchema, SignUpSchema, channelSchema}