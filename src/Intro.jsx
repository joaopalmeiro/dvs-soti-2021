import { Text } from '@mantine/core';

import Heading from './Heading';

function Intro() {
    return (
        <article>
            <Heading>the Survey</Heading>
            <Text size="lg">
                The{' '}
                <Text component="span" weight="bold" size="lg">
                    2021 Data Visualization State of the Industry Survey
                </Text>{' '}
                results are out!
            </Text>
        </article>
    );
}

export default Intro;
