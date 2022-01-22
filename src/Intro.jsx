import { Divider, Kbd, Text } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { includes } from 'lodash';
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

function CommandMenu() {
    const os = useOs();
    const firstKey = os === 'macos' ? 'Cmd' : 'Ctrl';
    // console.log(os, firstKey);

    // https://support.apple.com/en-us/HT201236
    // https://mantine.dev/core/kbd/
    // https://mantine.dev/hooks/use-hotkeys/
    // https://kbar.vercel.app/
    return (
        includes(['windows', 'linux', 'macos'], os) && (
            <Text size="lg" component="span">
                {' '}
                In case you don{"'"}t know any of the tools, just press <Kbd>{firstKey}</Kbd> +{' '}
                <Kbd>K</Kbd> and get more info from there.
            </Text>
        )
    );
}

function Intro() {
    return (
        <article>
            <Heading>the Survey</Heading>
            <Text size="lg">
                The <Highlight>2021 Data Visualization State of the Industry Survey</Highlight>{' '}
                results are out! Of all the possible insights, what can we expect from the{' '}
                <Highlight>Tools</Highlight> used by Data Visualization practitioners?
            </Text>
            {/* https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md */}
            <Text size="lg">
                Before we get to the results, here{"'"}s a brief and interesting challenge for you.
                For you, what are the three most used tools for visualizing data? Fill in the fields
                below, also estimating what percentage of users (out of all respondents) use each of
                your choices.
            </Text>
            <Text size="lg">
                After submitting your answers, you{"'"}ll see a comparative summary and a chart —
                and draw your conclusions!
                <CommandMenu />
            </Text>
            <Text size="lg">
                Keep in mind that only tools with predefined options in the survey are considered
                here. Responses to the related open-answer question are not counted.
            </Text>
            <Text size="lg">Enjoy!</Text>
            <Divider
                sx={(theme) => ({
                    borderColor: theme.black
                })}
            />
        </article>
    );
}

export default Intro;
