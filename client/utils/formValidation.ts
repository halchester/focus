import * as Yup from 'yup'

export const registerFormValidation = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Must be more than 2 letters'!)
    .max(30, 'Cannot exceed more than 30 letters!')
    .required('You must provide your fullname!'),
  username: Yup.string()
    .test('username', 'Cannot contain spaces!', (value) => {
      if (value?.includes(' ')) {
        return false
      }
      return true
    })
    .min(4, 'Must be longer than 4 letters!')
    .max(22, 'Cannot be longer than 22 letters')
    .required('Username must be provided!'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 letters')
    .max(22, 'Cannot be longer than 22 letters')
    .required('Must add password'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match!')
    .required('Passwords must match!'),
})

export const loginFormValidation = Yup.object().shape({
  username: Yup.string().required('Username must be provided!'),
  password: Yup.string().required('Password must be provided!'),
})
