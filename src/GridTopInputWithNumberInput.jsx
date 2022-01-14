import { Box } from '@mantine/core';
import PropTypes from 'prop-types';

// https://css-tricks.com/snippets/css/complete-guide-grid/
const template = `
'first . .'
'. second .'
'. . third'
'. submit .'
`;

function GridTopInputWithNumberInput({ children }) {
    return (
        <Box
            style={{
                display: 'grid',
                gridTemplateAreas: template,
                // https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
                justifyItems: 'center',
                // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout
                // https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
                gridAutoColumns: '1fr'
            }}
        >
            {children}
        </Box>
    );
}

GridTopInputWithNumberInput.propTypes = {
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md#as-for-exceptions
    children: PropTypes.node
};

export default GridTopInputWithNumberInput;
