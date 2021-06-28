import React from 'react'
import { Box } from '@chakra-ui/react'

type IProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: IProps) => {
  return <Box>{children}</Box>
}
