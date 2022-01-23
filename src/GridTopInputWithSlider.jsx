import { Box } from '@mantine/core';
import PropTypes from 'prop-types';

const template = `
'first . .'
'. second .'
'. . third'
'. submit .'
`;

const mobileTemplate = `
'first'
'second'
'third'
'submit'
`;

function GridTopInputWithSlider({ children }) {
    return (
        <Box
            sx={(theme) => ({
                display: 'grid',
                gridTemplateAreas: template,
                gridAutoColumns: '1fr',
                // https://mantine.dev/theming/mantine-provider/#theme-object
                columnGap: theme.spacing.sm,
                // https://mantine.dev/theming/responsive/
                [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                    gridTemplateAreas: mobileTemplate,
                    rowGap: `${theme.spacing.xl * 2}px`
                }
            })}
        >
            {children}
        </Box>
    );
}

GridTopInputWithSlider.propTypes = {
    children: PropTypes.node
};

export default GridTopInputWithSlider;
