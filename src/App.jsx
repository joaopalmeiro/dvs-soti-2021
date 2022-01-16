import { Container } from '@mantine/core';

import BarChart from './BarChart';
import TopInputWithSlider from './TopInputWithSlider';

function App() {
    // https://tzi.fr/js/convert-em-in-px/
    // console.log(parseFloat(getComputedStyle(document.documentElement).fontSize));

    return (
        <Container size="md">
            <TopInputWithSlider />
            <BarChart />
        </Container>
    );
}

export default App;
