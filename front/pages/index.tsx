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
import Link from 'next/link'
export default function Home () {
  const embed = useRef() // We use a ref instead of state to avoid rerenders.

  const handleReady = (e: any) => {
    embed.current = e
  }
  const bio = `<p>Hi, my name is Kevin. During my life I have lived in: Chicago, Milwaukee, and Naples, Florida.</p> <p> I've known how to code since a young age, and have worked at a couple of early stage startups during college.</p> <p> Around a year ago I got into the phenomenon that is web3, and I haven't looked back.</p>
  <p> When I'm not coding, I like to play chess, run, and keep in touch with friends. I also enjoy watching <a href="https://gomarquette.com/sports/mens-basketball">Marquette Basketball</a>.</p> <p>Recently I also spent a month traveling across Europe during which I visited Germany, Belgium, The Netherlands, Denmark and Sweden.</p>`
  return (
    <Stack style={{display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
}}>
      <Head>
        <title>Kevin O'Connell</title>
        <meta name="Kevin O'Connell" content="Follow my life" />
      </Head>
      <Text size="md" weight={700} mt={5}>About me:</Text>
      <Grid ml={5} >
        <Text align="center" size="md">
          {' '}
          <TypographyStylesProvider>
            {' '}
            <div style={{fontSize: "18px"}} dangerouslySetInnerHTML={{ __html: bio }} />
          </TypographyStylesProvider>
        </Text>{' '}
      </Grid>
<Text size="md" weight={700} mt={5}>Blogs:</Text>
      <Link  style={{color: "blue", fontSize: "14px"}} href="/blogs/how-my-life-was-changed-as-a-result-of-solo-traveling">How my life was changed as a result of solo traveling.</Link>
    </Stack>
  )
}
