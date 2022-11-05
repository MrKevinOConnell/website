import * as React from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSignMessage
} from 'wagmi'
import { SiweMessage } from 'siwe'
import { ConnectKitButton } from 'connectkit'
import { Button, Menu } from '@mantine/core'

interface Wallet {
  address?: string
  error?: Error
  loading?: boolean
}
function SignInButton ({
  onSuccess,
  onError
}: {
  onSuccess: (args: { address: string }) => void
  onError: (args: { error: Error }) => void
}) {
  const [state, setState] = React.useState<{
    loading?: boolean
    nonce?: string
  }>({})

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }))
    }
  }

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  React.useEffect(() => {
    fetchNonce()
  }, [])

  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const { isConnected, address } = useAccount()
  const signIn = async () => {
    try {
      const chainId = activeChain?.id
      if (!address || !chainId) return
      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })

      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, signature })
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess({ address })
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      onError({ error: error as Error })
      fetchNonce()
    }
  }

  return isConnected
    ? (
    <ConnectKitButton.Custom>
      {({ show, hide }) => {
        return (
          <Button
            onClick={signIn}
            mt={3}
            size="md"
            variant="gradient"
            gradient={{ from: 'red', to: 'yellow', deg: 120 }}
          >
            {' '}
            Sign-In With Ethereum
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
      )
    : (
    <ConnectKitButton.Custom>
      {({ show, hide }) => {
        return (
          <Button
            onClick={show}
            mt={3}
            size="md"
            variant="gradient"
            gradient={{ from: 'red', to: 'yellow', deg: 120 }}
          >
            Connect Wallet
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
      )
}

export function Profile () {
  const { isConnected } = useAccount()

  const { disconnect } = useDisconnect()
  const [opened, setOpened] = React.useState(false)
  const [state, setState] = React.useState<Wallet>({} as Wallet)
  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        if (!json.address && isConnected) {
          logout()
        }
        setState((x) => ({ ...x, address: json.address }))
      } catch (_error) {}
    }
    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])
  const logout = async () => {
    await fetch('/api/logout')
    setState({})
  }
  if (state.address && isConnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show, ensName, isConnected, address }) => {
          return (
            <Button
              onClick={show}
              mt={3}
              size="md"
              variant="gradient"
              gradient={{ from: 'red', to: 'yellow', deg: 120 }}
            >
              {ensName || address}
            </Button>
          )
        }}
      </ConnectKitButton.Custom>
    )
  } else {
    return (
      <SignInButton
        onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
        onError={({ error }) => setState((x) => ({ ...x, error }))}
      />
    )
  }
}
