import { Center, Group, Title } from '@mantine/core';
import { sample } from 'lodash';
import React from 'react';

import { COLORS } from './utils';

// https://vercel.com/
const size = '8rem';
const titleText = 'TOOLS';
const borderSides = ['Bottom', 'Left', 'Right', 'Top'];

function ToolsTitle() {
    return (
        <Group position="center" spacing="xs">
            {Array.from(titleText).map((c, i) => (
                <Center
                    key={`${c}-${i}`}
                    sx={(theme) => {
                        const borderSide = sample(borderSides);
                        const borderWidthProperty = `border${borderSide}Width`;

                        return {
                            width: size,
                            height: size,
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderColor: sample(COLORS),
                            [borderWidthProperty]: theme.spacing.xs
                        };
                    }}
                >
                    <Title
                        order={1}
                        // align="center"
                        style={{ fontSize: size }}
                        sx={(theme) => ({
                            fontFamily: theme.fontFamilyMonospace
                        })}
                    >
                        {c}
                    </Title>
                </Center>
            ))}
        </Group>
    );
}

export default React.memo(ToolsTitle);
