
import Head from 'next/head'
import { useRouter } from 'next/router'
import readingTime from 'reading-time'
import PostCard from '../../components/PostCard'
import markdownToHtml from '../../lib/markdownToHtml'
import {
  Stack,
  Avatar,
  Grid,
  Card,
  Text,
  TypographyStylesProvider
} from '@mantine/core'
import ProjectCard from '../../components/ProjectCard'

export default function projects () {
  return (
    <Stack align="center">
        <Text size={25} weight="700">Projects</Text>
     <ProjectCard soon={true} title="FarcasterFM (soon)" body={'Music Port of Farcaster'} url="https://www.farcaster.xyz/"/>
     <ProjectCard soon={false} title="PostHog" body="Open source product analytics software" url="https://posthog.com/"/>
     <ProjectCard soon={false} title="ForestRun" body="Infinite runner game + scary maze game in one" url="https://www.forestrun.xyz/"/>
     <ProjectCard soon={false }title="NewShades" body="Web3 discord" url="https://github.com/NewShadesDAO"/>
     <ProjectCard soon={false}title="Abacus" body="Coding Compeition Software" url="https://github.com/acm-mu/abacus"/>
    </Stack>
  )
}
