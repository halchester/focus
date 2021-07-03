import React from 'react'
import { Box } from '@chakra-ui/react'

type IProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: IProps): JSX.Element => {
  return <Box>{children}</Box>
}
