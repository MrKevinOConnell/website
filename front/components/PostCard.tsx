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

function PostCard (props: { blog: Blog }) {
  console.log('props data', props.blog.date)
  const date = parseISO(props.blog.date)
  return (
    <Card
      style={{ width: '50%' }}
      component="a"
      href={`/blogs/${props.blog.slug}`}
      shadow="sm"
      p="lg"
      radius="sm"
      withBorder
    >
      <Card.Section>
        <Image src={props.blog.image} height={250} alt="story image" />
      </Card.Section>
      <Center>
        <Group ml={40} mt="sm">
          <Text size="md" weight={500}>
            {props.blog.title}
          </Text>
        </Group>
      </Center>
      <Divider m="sm" />
      <Center>
        <Group>
          <Text size="xs">
            {format(date, 'MM/dd/yyyy') +
              ' • ~' +
              props.blog.time +
              ' min read.'}
          </Text>
        </Group>
      </Center>
      <Divider m="sm" />

      <Center>
        <Group>
          {' '}
          <Text size="xs" color="dimmed">
            {props.blog.description}
          </Text>
        </Group>
      </Center>
    </Card>
  )
}
export default PostCard
