import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import useAuth from '../store/useAuth'

const IndexPage: NextPage = () => {
  const router = useRouter()
  let token = useAuth((state: any) => state.token)

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token])

  return (
    <div>
      <p>This will be the home page</p>
    </div>
  )
}

export default IndexPage
