import { Text } from '@mantine/core';
import PropTypes from 'prop-types';

import Heading from './Heading';

function Highlight({ children }) {
    return (
        <Text component="span" weight="bold" size="lg">
            {children}
        </Text>
    );
}

Highlight.propTypes = {
    children: PropTypes.node
};

function Intro() {
    return (
        <article>
            <Heading>the Survey</Heading>
            <Text size="lg">
                The <Highlight>2021 Data Visualization State of the Industry Survey</Highlight>{' '}
                results are out! Of all the possible insights, what can we expect from the{' '}
                <Highlight>Tools</Highlight> used by Data Visualization practitioners?
            </Text>
            <Text size="lg">HERE</Text>
            <Text size="lg">
                Keep in mind that only tools with predefined options in the survey are considered
                here. Responses to the related open-answer question are not counted.
            </Text>
        </article>
    );
}

export default Intro;
