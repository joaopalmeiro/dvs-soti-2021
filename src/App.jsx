import { Container } from '@mantine/core';

import BarChart from './BarChart';
import TopInputWithSlider from './TopInputWithSlider';

function App() {
    return (
        <Container size="md">
            <TopInputWithSlider />
            <BarChart />
        </Container>
    );
}

export default App;
