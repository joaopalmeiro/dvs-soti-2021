import { Divider, Group, Title } from '@mantine/core';
import PropTypes from 'prop-types';

function Heading({ children }) {
    return (
        <Group>
            {/* Source: https://stylestage.dev/ */}
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
                {children}
            </Title>
            <Divider
                sx={(theme) => ({
                    borderColor: theme.black,
                    flexGrow: 1
                })}
            />
        </Group>
    );
}

Heading.propTypes = {
    children: PropTypes.node
};

export default Heading;
