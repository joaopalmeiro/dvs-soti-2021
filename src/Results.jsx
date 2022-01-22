import { List, Text, ThemeIcon } from '@mantine/core';
import { NumberOne, NumberThree, NumberTwo } from 'phosphor-react';
import PropTypes from 'prop-types';

import Heading from './Heading';
import data from './tools_counts.json';
import { COLORS } from './utils';

function Results({ userOptions }) {
    console.log({ data, userOptions });

    return (
        <article>
            <Heading>the Results</Heading>
            <List size="lg" center spacing="xs">
                <List.Item
                    icon={
                        <ThemeIcon
                            size={24}
                            radius="xl"
                            // variant="light"
                            sx={(theme) => ({
                                backgroundColor: COLORS.dvsTurquoise,
                                color: theme.white
                            })}
                        >
                            <NumberOne size={12} weight="bold" />
                        </ThemeIcon>
                    }
                >
                    HERE
                </List.Item>
                <List.Item
                    // https://mantine.dev/theming/functions/#lighten-and-darken
                    icon={
                        <ThemeIcon
                            size={24}
                            radius="xl"
                            sx={(theme) => ({
                                backgroundColor: theme.fn.lighten(COLORS.dvsMustard, 0.9),
                                color: COLORS.dvsMustard,
                                border: `1px solid ${COLORS.dvsMustard}`
                            })}
                        >
                            <NumberTwo size={12} weight="bold" />
                        </ThemeIcon>
                    }
                >
                    HERE
                </List.Item>
                <List.Item
                    icon={
                        <ThemeIcon
                            size={24}
                            radius="xl"
                            sx={(theme) => ({
                                backgroundColor: COLORS.dvsPlum,
                                color: theme.white
                            })}
                        >
                            <NumberThree size={12} weight="bold" />
                        </ThemeIcon>
                    }
                >
                    HERE
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
