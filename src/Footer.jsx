import { Text } from '@mantine/core';
import React from 'react';

import { COLORS } from './utils';

function Footer() {
    // https://daisyui.com/components/footer/
    // https://mantine.dev/core/text/
    // Colors: https://mantine.dev/theming/extend-theme/
    // https://www.datavisualizationsociety.org/brand-guidelines
    // https://htmlrecipes.dev/#site-footer
    return (
        <footer style={{ marginTop: 'auto' }}>
            <Text align="center" size="sm">
                <Text
                    variant="link" // or Loki
                    component="a"
                    href="https://www.datavisualizationsociety.org/soti-challenge-2021"
                    target="_blank"
                    sx={(theme) => ({
                        color: theme.black,
                        '&:hover': {
                            color: COLORS.dvsTurquoise
                        }
                    })}
                    size="sm"
                >
                    SOTI Challenge 2021
                </Text>{' '}
                •{' '}
                <Text
                    variant="link"
                    component="a"
                    href="https://www.datavisualizationsociety.org/"
                    target="_blank"
                    sx={(theme) => ({
                        color: theme.black,
                        '&:hover': {
                            color: COLORS.dvsMustard
                        }
                    })}
                    size="sm"
                >
                    Data Visualization Society
                </Text>{' '}
                ft.{' '}
                <Text
                    variant="link"
                    component="a"
                    href="https://twitter.com/joaompalmeiro"
                    target="_blank"
                    sx={(theme) => ({
                        color: theme.black,
                        '&:hover': {
                            color: COLORS.dvsPlum
                        }
                    })}
                    size="sm"
                >
                    João Palmeiro
                </Text>{' '}
                •{' '}
                <Text
                    variant="link"
                    component="a"
                    href="https://github.com/joaopalmeiro/dvs-soti-2021/issues"
                    target="_blank"
                    sx={(theme) => ({
                        color: theme.black
                    })}
                    size="sm"
                >
                    Any feedback?
                </Text>
            </Text>
        </footer>
    );
}

export default React.memo(Footer);
