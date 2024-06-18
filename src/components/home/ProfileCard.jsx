import { ActionIcon, Avatar, Card, Code, CopyButton, Text, Tooltip, rem } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import classes from './ProfileCard.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export function ProfileCard() {
  const { user } = useContext(UserContext);

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user['name']}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user['agent_id']}
      </Text>
      <Card p={"xs"} shadow='sm'>
        <CopyButton value={`${user['agent_link_1']}?ag_id=${user['agent_id']}`} timeout={2000}>
          {({ copied, copy }) => (
            <div style={{ display: "flex" }}>
              <Code>
                {user['agent_link_1']}?ag_id={user['agent_id']}
              </Code>
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            </div>

          )}
        </CopyButton>
      </Card>
      <Card p={"xs"} shadow='sm'>
        <CopyButton value={`${user['agent_link_2']}?ag_id=${user['agent_id']}`} timeout={2000}>
          {({ copied, copy }) => (
            <div style={{ display: "flex" }}>
              <Code>
                {user['agent_link_2']}?ag_id={user['agent_id']}
              </Code>
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            </div>

          )}
        </CopyButton>
      </Card>
    </Card>
  );
}