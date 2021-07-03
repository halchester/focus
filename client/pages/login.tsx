/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { NextPage } from 'next'
import {
  Box,
  Text,
  Link,
  Input,
  Stack,
  Flex,
  IconButton,
  Button,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import useAuth from '../store/useAuth'
import { useRouter } from 'next/dist/client/router'
import { loginFormValidation } from '../utils/formValidation'

const LoginPage: NextPage = () => {
  const [showPW, setShowPW] = React.useState(false)
  const loginCurrentUser = useAuth((state) => state.loginCurrentUser)
  const clearRegisterStatus = useAuth((state) => state.clearRegisterStatus)
  const token = useAuth((state) => state.token)
  const errorMessage = useAuth((state) => state.errorMessage)
  const router = useRouter()

  React.useEffect(() => {
    if (token && !errorMessage) {
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }, [token])

  React.useEffect(() => {
    clearRegisterStatus()
  }, [])

  return (
    <Box m="4">
      <Box mt="6">
        <Box mx="auto" as="img" src="/focus-title.png" style={{ height: '8rem' }}></Box>
      </Box>
      <Box mt="10">
        <Text fontSize="3xl" fontWeight="bold" align="center">
          Log in to your account!
        </Text>
        <Text fontSize="md" align="center" my="2">
          Doesn&apos;t have an account?
          <Link href="/register" color="blue.500">
            {' '}
            Register a new one!
          </Link>
        </Text>
      </Box>
      <Box p={8} bgColor="gray.50" maxWidth="md" mx="auto" borderRadius="lg" mt="4">
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async ({ username, password }) => {
            const payload = { username, password }
            loginCurrentUser(payload)
          }}
          validationSchema={loginFormValidation}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {token && (
                  <Alert status="success" variant="solid" borderRadius="md">
                    <AlertIcon />
                    Successfully logged in! Redirecting you soon! :)
                  </Alert>
                )}
                {errorMessage && (
                  <Alert status="error" variant="solid" borderRadius="md">
                    <AlertIcon />
                    {errorMessage}
                  </Alert>
                )}
                <Box>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      colorScheme="white"
                      variant="filled"
                      value={values.username}
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      isInvalid={Boolean(touched.username) && Boolean(errors.username)}
                    />
                    <FormHelperText color="red.500">
                      {touched.username && errors.username}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="password">
                    <Flex my="2" flexDirection="row" justifyContent="space-between">
                      <FormLabel>Password</FormLabel>
                      {showPW ? (
                        <IconButton
                          size="sm"
                          borderRadius="md"
                          aria-label="togglepasswordview"
                          onClick={() => setShowPW(!showPW)}
                          icon={<ViewOffIcon />}
                        />
                      ) : (
                        <IconButton
                          size="sm"
                          borderRadius="md"
                          aria-label="togglepasswordview"
                          onClick={() => setShowPW(!showPW)}
                          icon={<ViewIcon />}
                        />
                      )}
                    </Flex>
                    <Input
                      colorScheme="white"
                      variant="filled"
                      value={values.password}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPW ? 'text' : 'password'}
                      isInvalid={Boolean(touched.password) && Boolean(errors.password)}
                    />
                    <FormHelperText color="red.500">
                      {touched.password && errors.password}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    isFullWidth
                    onClick={() => handleSubmit()}
                    colorScheme="teal"
                    variant="solid"
                    aria-label="login"
                    isLoading={isSubmitting}
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

export default LoginPage
