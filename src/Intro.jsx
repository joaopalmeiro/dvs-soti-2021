import { Divider, Group, Text, Title } from '@mantine/core';

function Intro() {
    return (
        <article>
            {/* Source: https://stylestage.dev/ */}
            <Group>
                <Title
                    order={2}
                    // align="center"
                    sx={(theme) => ({
                        padding: '0.25em 0.5em',
                        backgroundColor: theme.black,
                        color: theme.white,
                        // https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
                        flexGrow: 0
                    })}
                >
                    the Survey
                </Title>
                <Divider
                    sx={(theme) => ({
                        borderColor: theme.black,
                        flexGrow: 1
                    })}
                />
            </Group>
            <Text>HERE</Text>
        </article>
    );
}

export default Intro;
