import * as React from 'react'
import { NextPage } from 'next'
import {
  Box,
  Text,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { registerFormValidation } from '../utils/formValidation'

const RegisterPage: NextPage = () => {
  return (
    <Box m="4">
      <Box mt="10">
        <Text fontSize="2xl" fontWeight="bold" align="center">
          Welcome to 🎯 Focus
        </Text>
        <Text align="center" fontSize="lg">
          Your best studying mate!
        </Text>
      </Box>
      <Box p={8} bgColor="gray.50" maxWidth="md" mx="auto" borderRadius="lg" mt="4">
        <Text fontSize="lg" color="gray.500" fontWeight="semibold">
          Enter your info to get started!
        </Text>
        <Formik
          initialValues={{
            fullname: '',
            username: '',
            password: '',
            repassword: '',
          }}
          onSubmit={async (values) => {
            console.log(values)
          }}
          validationSchema={registerFormValidation}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} mt={8}>
                <Box>
                  <FormControl id="fullname">
                    <FormLabel>Full name</FormLabel>
                    <Input
                      value={values.fullname}
                      id="fullname"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText color="red.500">
                      {touched.fullname && errors.fullname}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      value={values.username}
                      id="username"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText color="red.500">
                      {touched.username && errors.username}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={values.password}
                      id="password"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText color="red.500">
                      {touched.password && errors.password}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="repassword">
                    <FormLabel>Re-enter Password</FormLabel>
                    <Input
                      value={values.repassword}
                      id="repassword"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText color="red.500">
                      {touched.repassword && errors.repassword}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    isFullWidth
                    type="submit"
                    onClick={() => handleSubmit()}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    variant="solid"
                  >
                    Continue
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default RegisterPage
