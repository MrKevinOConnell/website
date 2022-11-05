import {
  BackgroundImage,
  Card,
  Center,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { format, parseISO } from "date-fns";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  image: string;
  title: string;
  time: number;
  description: string;
  date: string;
};

const PostBody = ({ content, title, time, description, date }: Props) => {
  const finishDate = parseISO(date);
  return (
    <Stack justify="center">
      <Center>
        <Group ml={40} mt="sm">
          <Text size="xl" weight={500}>
            {title}
          </Text>
        </Group>
      </Center>
      <Center>
        <Group>
          {" "}
          <Text size="sm">{description}</Text>
        </Group>
      </Center>
      <Center>
        <Group>
          <Text size="xs">
            {format(finishDate, "MM/dd/yyyy") + "• ~" + time + " min read."}
          </Text>
        </Group>
      </Center>

      <Center>
        <Card style={{ width: "60%" }} radius={25}>
          <div
            className={markdownStyles["markdown"]}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Card>
      </Center>
    </Stack>
  );
};

export default PostBody;
