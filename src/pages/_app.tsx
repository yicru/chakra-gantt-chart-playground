import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <p>Loading...</p>
  }

  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}
