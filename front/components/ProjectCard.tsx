import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Center,
  Divider
} from '@mantine/core'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { Blog } from '../pages/blogs'

function ProjectCard (props: { title: string, body: string, url: string, soon: boolean }) {
  return (
      <Card
        style={{ width: '40%', background: props.soon ? '#FFCC00' : 'white' }}
        component={'a'}
        target="_blank"
        href={`${props.url}`}
        shadow="sm"
        p="md"
        radius="sm"
        withBorder
      >
        <Center>
          <Group mt="sm">
            <Center>
            <Text size="md" weight={700}>
              {props.title}
            </Text>
            </Center>
          </Group>
        </Center>
        <Divider m="sm" />
        <Center>
        <Text>{props.body}</Text>
        </Center>
      </Card>
  )
}
export default ProjectCard
