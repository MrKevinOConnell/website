import Head from 'next/head'
import { useRef } from 'react'
import { TwitchEmbed } from 'react-twitch-embed'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import {
  Stack,
  Avatar,
  Grid,
  Text,
  TypographyStylesProvider
} from '@mantine/core'
export default function Home () {
  const embed = useRef() // We use a ref instead of state to avoid rerenders.

  const handleReady = (e: any) => {
    embed.current = e
  }
  const bio = `<p>Hi, my name is Kevin. During my life I have lived in: Chicago, Milwaukee, Wisconsin and Naples, Florida.</p> <p> I've known how to code since a young age, and have worked at a couple of early stage startups during college.</p> <p> Around a year ago I got into the phenomenon that is web3, and I haven't looked back.</p>
  <p> When not coding, I like to play chess, run, and keep in touch with friends. I also enjoy watching <a href="https://gomarquette.com/sports/mens-basketball">Marquette Basketball</a>.</p> <p>Recently I also spent a month traveling Europe, during which I was able to visit Germany, Belgium, The Netherlands, Denmark and Sweden.</p>`
  return (
    <Stack mt={10} align="center" justify="space-around">
      <Head>
        <title>Kevin O'Connell</title>
        <meta name="Kevin O'Connell" content="Follow my life" />
      </Head>
      <Grid mt={40} ml={5} justify="center">
        <Avatar mr={5} src="/me.jpg" alt="it's me" />{' '}
        <Text>
          {' '}
          <TypographyStylesProvider>
            {' '}
            <div dangerouslySetInnerHTML={{ __html: bio }} />
          </TypographyStylesProvider>
        </Text>{' '}
      </Grid>
      <Grid pt={0} mt={100}>
        <TwitchEmbed
          channel="KevinKnockout"
          autoplay
          muted
          withChat
          height={300}
          darkMode={false}
          hideControls
          onVideoReady={handleReady}
        />
      </Grid>
    </Stack>
  )
}
