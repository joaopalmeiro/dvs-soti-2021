import { List, Text, ThemeIcon } from '@mantine/core';
import { format } from 'd3-format';
import { find, trimEnd } from 'lodash';
import { toOrdinal } from 'number-to-words';
import { NumberOne, NumberThree, NumberTwo } from 'phosphor-react';
import PropTypes from 'prop-types';

import Heading from './Heading';
import data from './tools_counts.json';
import { COLORS } from './utils';

const matchTemplate = (referenceDatum, tool, estimate) => {
    const number = referenceDatum.ranking === 1 ? '' : toOrdinal(referenceDatum.ranking);
    const firstSentence = `The ${number} most used tool is ${tool}!`;

    // const refPercentage = referenceDatum.use_count / referenceDatum.total_count;
    // const diffPercentage = trimEnd(format('+.0%')(refPercentage - divide(estimate, 100)), '%');

    const refPercentage = format('.0%')(referenceDatum.use_count / referenceDatum.total_count);
    const diffPercentage = trimEnd(refPercentage, '%') - estimate;

    const secondSentenceExtra =
        diffPercentage === 0
            ? '(like your estimate)'
            : `(${format('+')(diffPercentage)}pp than your estimate)`;
    const secondSentence = `≈${refPercentage} ${secondSentenceExtra} of respondents use it.`;

    return `${firstSentence} ${secondSentence}`;
};

const mismatchTemplate = (referenceDatum, tool) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#using_options
    // https://www.npmjs.com/package/number-to-words
    const number = referenceDatum.ranking === 1 ? '' : toOrdinal(referenceDatum.ranking);
    const firstSentence = `The ${number} most used tool is ${referenceDatum.tool}, not ${tool}.`;

    const refPercentage = referenceDatum.use_count / referenceDatum.total_count;
    const secondSentence = `≈${format('.0%')(refPercentage)} of respondents use ${
        referenceDatum.tool
    }.`;

    return `${firstSentence} ${secondSentence}`;
};

const getTemplate = (referenceDatum, tool, estimate) =>
    referenceDatum.tool === tool
        ? matchTemplate(referenceDatum, tool, estimate)
        : mismatchTemplate(referenceDatum, tool);

function Results({ userOptions }) {
    // console.log({ data, userOptions });
    const firstReference = find(data, (o) => o.ranking === 1);
    const secondReference = find(data, (o) => o.ranking === 2);
    const thirdReference = find(data, (o) => o.ranking === 3);

    return (
        <article>
            <Heading>the Results</Heading>
            <List size="lg" spacing="lg" center type="ol">
                <List.Item
                    icon={
                        <ThemeIcon
                            size={24}
                            radius="xl"
                            // variant="light"
                            sx={(theme) => ({
                                backgroundColor:
                                    firstReference.tool === userOptions.firstTool
                                        ? COLORS.dvsTurquoise
                                        : theme.fn.lighten(COLORS.dvsTurquoise, 0.9),
                                color:
                                    firstReference.tool === userOptions.firstTool
                                        ? theme.white
                                        : COLORS.dvsTurquoise,
                                border:
                                    firstReference.tool === userOptions.firstTool
                                        ? 'unset'
                                        : `1px solid ${COLORS.dvsTurquoise}`
                            })}
                        >
                            <NumberOne size={12} weight="bold" />
                        </ThemeIcon>
                    }
                >
                    {getTemplate(
                        firstReference,
                        userOptions.firstTool,
                        userOptions.firstToolPercentage
                    )}
                </List.Item>
                <List.Item
                    // https://mantine.dev/theming/functions/#lighten-and-darken
                    icon={
                        <ThemeIcon
                            size={24}
                            radius="xl"
                            sx={(theme) => ({
                                backgroundColor:
                                    secondReference.tool === userOptions.secondTool
                                        ? COLORS.dvsMustard
                                        : theme.fn.lighten(COLORS.dvsMustard, 0.9),
                                color:
                                    secondReference.tool === userOptions.secondTool
                                        ? theme.white
                                        : COLORS.dvsMustard,
                                border:
                                    secondReference.tool === userOptions.secondTool
                                        ? 'unset'
                                        : `1px solid ${COLORS.dvsMustard}`
                            })}
                        >
                            <NumberTwo size={12} weight="bold" />
                        </ThemeIcon>
                    }
                >
                    {getTemplate(
                        secondReference,
                        userOptions.secondTool,
                        userOptions.secondToolPercentage
                    )}
                </List.Item>
                <List.Item
                    icon={
                        <ThemeIcon
                            size={24}
                            radius="xl"
                            sx={(theme) => ({
                                backgroundColor:
                                    thirdReference.tool === userOptions.thirdTool
                                        ? COLORS.dvsPlum
                                        : theme.fn.lighten(COLORS.dvsPlum, 0.9),
                                color:
                                    thirdReference.tool === userOptions.thirdTool
                                        ? theme.white
                                        : COLORS.dvsPlum,
                                border:
                                    thirdReference.tool === userOptions.thirdTool
                                        ? 'unset'
                                        : `1px solid ${COLORS.dvsPlum}`
                            })}
                        >
                            <NumberThree size={12} weight="bold" />
                        </ThemeIcon>
                    }
                >
                    {getTemplate(
                        thirdReference,
                        userOptions.thirdTool,
                        userOptions.thirdToolPercentage
                    )}
                </List.Item>
            </List>
            <Text size="lg">
                By the way, feel free to drag and drop the bars. Reorder the chart and compare the
                tools that interest you most closely.
            </Text>
        </article>
    );
}

Results.propTypes = {
    userOptions: PropTypes.exact({
        firstTool: PropTypes.string,
        secondTool: PropTypes.string,
        thirdTool: PropTypes.string,
        firstToolPercentage: PropTypes.number,
        secondToolPercentage: PropTypes.number,
        thirdToolPercentage: PropTypes.number
    }).isRequired
};

export default Results;
