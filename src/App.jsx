import { Container } from '@mantine/core';

import BarChart from './BarChart';
import TopInputWithSlider from './TopInputWithSlider';

function App() {
    // https://tzi.fr/js/convert-em-in-px/
    // console.log(parseFloat(getComputedStyle(document.documentElement).fontSize));

    return (
        // https://mantine.dev/core/center/
        <Container
            size="md"
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: theme.spacing.xl
            })}
        >
            <TopInputWithSlider />
            <BarChart />
        </Container>
    );
}

export default App;
