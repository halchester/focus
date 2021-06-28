import * as React from 'react'
import { NextPage } from 'next'
import {
  Box,
  Text,
  Link,
  Image,
  Input,
  Stack,
  Flex,
  IconButton,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import useAuth from '../store/useAuth'
import { useRouter } from 'next/dist/client/router'

const LoginPage: NextPage = () => {
  const [showPW, setShowPW] = React.useState(false)
  const loginCurrentUser = useAuth((state: any) => state.loginCurrentUser)
  const logoutCurrentUser = useAuth((state: any) => state.logoutCurrentUser)
  const token = useAuth((state: any) => state.token)
  const errorMessage = useAuth((state: any) => state.errorMessage)
  const router = useRouter()

  console.log(token)

  React.useEffect(() => {
    if (token && !errorMessage) {
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }, [token])

  return (
    <Box m="4">
      <Button onClick={logoutCurrentUser}>asdf</Button>
      <Box mt="6">
        <Text fontSize="2xl" fontWeight="bold" align="center">
          🎯 Focus
        </Text>
      </Box>
      <Box mt="10">
        <Text fontSize="3xl" fontWeight="bold" align="center">
          Log in to your account!
        </Text>
        <Text fontSize="md" align="center" my="2">
          Doesn't have an account?
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
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                  <Text my="2" fontWeight="semibold">
                    Username
                  </Text>
                  <Input
                    colorScheme="white"
                    variant="filled"
                    value={values.username}
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                  />
                </Box>
                <Box>
                  <Flex my="2" flexDirection="row" justifyContent="space-between">
                    <Text fontWeight="semibold" mt="1">
                      Password
                    </Text>
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
                  />
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

export default LoginPage
