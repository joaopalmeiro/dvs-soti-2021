import { Text } from '@mantine/core';

import { COLORS } from './utils';

function Footer() {
    // https://daisyui.com/components/footer/
    // https://mantine.dev/core/text/
    // Colors: https://mantine.dev/theming/extend-theme/
    // https://www.datavisualizationsociety.org/brand-guidelines
    return (
        <footer>
            <Text align="center">
                <Text
                    variant="link"
                    component="a"
                    href="https://www.datavisualizationsociety.org/soti-challenge-2021"
                    target="_blank"
                    sx={(theme) => ({
                        color: theme.black,
                        '&:hover': {
                            color: COLORS.dvsTurquoise
                        }
                    })}
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
                >
                    João Palmeiro
                </Text>
            </Text>
        </footer>
    );
}

export default Footer;
