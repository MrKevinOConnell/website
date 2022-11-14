import '../styles/globals.css'
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Footer,
  Text,
  ActionIcon,
  Center,
  Anchor,
  Space,
  Grid,
  Button,
  Menu
  , MantineProvider
} from '@mantine/core'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconMail } from '@tabler/icons'
import { createClient, useDisconnect, WagmiConfig } from 'wagmi'
import {
  ConnectKitButton,
  ConnectKitProvider,
  getDefaultClient
} from 'connectkit'
export default function App ({ Component, pageProps }: AppProps) {
  const [opened, setOpened] = useState(false)
  const alchemyId = process.env.ALCHEMY_ID
  const client = createClient(
    getDefaultClient({
      appName: 'website',
      alchemyId
    })
  )

  // Since v1.5.1 you're now able to call the init function for the web version without options. The current URL path will be used by default. This is recommended when running from a gateway.
  const arweaveClient = new ApolloClient({
    uri: 'https://arweave.net/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={arweaveClient}>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <AppShell
              header={
                <Header height={50} p="m">
                  {
                    <Grid ml={10}>
                      {' '}
                      <Grid.Col span={2}>
                        <Link href="/">
                          <Text
                            mt={10}
                            variant="gradient"
                            gradient={{ from: 'red', to: 'yellow', deg: 120 }}
                            size="lg"
                            weight={700}
                            style={{
                              fontFamily: 'Greycliff CF, sans-serif',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            Kevin O'Connell
                          </Text>{' '}
                        </Link>
                      </Grid.Col>
                      <Grid.Col mt={5} offset={3.25} span={5}>
                        {' '}
                        <Link  href="/blogs" passHref legacyBehavior>
                          <Button
                            size="sm"
                            variant="gradient"
                            gradient={{ from: 'red', to: 'yellow', deg: 120 }}
                          >
                            Blogs
                          </Button>
                        </Link>
                        <Link href="/projects" passHref legacyBehavior>
                          <Button
                          ml={30}
                            size="sm"
                            variant="gradient"
                            gradient={{ from: 'red', to: 'yellow', deg: 120 }}
                          >
                            Projects
                          </Button>
                        </Link>
                      </Grid.Col>
                    </Grid>
                  }
                </Header>
              }
              footer={
                <Footer height={50}>
                  {' '}
                  <Center mt={10}>
                    <Anchor href="https://www.twitter.com/kw0eth">
                      {' '}
                      <Image
                        src="/twitter.png"
                        alt="twitter"
                        width="25"
                        height="20"
                      />{' '}
                    </Anchor>{' '}
                    <Space w="xl" />{' '}
                    <Anchor href="https://www.github.com/MrKevinOConnell">
                      {' '}
                      <Image
                        src="/github.png"
                        alt="github"
                        width="25"
                        height="25"
                      />{' '}
                    </Anchor>{' '}
                    <Space w="xl" />{' '}
                    <Anchor href="mailto:kevinoconnell42@gmail.com">
                      {' '}
                      <Image
                        src="/mail.png"
                        alt="mail"
                        width="25"
                        height="25"
                      />{' '}
                    </Anchor>{' '}
                  </Center>{' '}
                </Footer>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0]
                }
              })}
            >
              <Component {...pageProps} />
            </AppShell>
          </MantineProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}
