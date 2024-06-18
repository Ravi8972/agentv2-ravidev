import { ActionIcon, Code, CopyButton, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export function CopyLink({text}) {
    return <CopyButton value={text} timeout={2000}>
            {({ copied, copy }) => (
                <div style={{ display: "flex", alignItems: 'center'}}>
                    <Code style={{ display: "flex", alignItems: 'center', marginInline: '5px'}}>
                        {text}
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                            {copied ? (
                                <IconCheck style={{ width: rem(16) }} />
                            ) : (
                                <IconCopy style={{ width: rem(16) }} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                    </Code>
                </div>
            )}
        </CopyButton>
}