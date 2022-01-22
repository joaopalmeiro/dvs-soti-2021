import { Text, Title } from '@mantine/core';

function Intro() {
    return (
        <article>
            {/* Source: https://stylestage.dev/ */}
            <Title
                order={2}
                // align="center"
                sx={(theme) => ({
                    padding: '0.25em 0.5em',
                    backgroundColor: theme.black,
                    color: theme.white
                })}
            >
                the Survey
            </Title>
            <Text>HERE</Text>
        </article>
    );
}

export default Intro;
