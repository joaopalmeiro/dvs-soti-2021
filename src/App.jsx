import { Container } from '@mantine/core';
import { useForm } from '@mantine/hooks';

import BarChart from './BarChart';
import Footer from './Footer';
import TopInputWithSlider from './TopInputWithSlider';

function App() {
    // https://tzi.fr/js/convert-em-in-px/
    // console.log(parseFloat(getComputedStyle(document.documentElement).fontSize));

    const form = useForm({
        initialValues: {
            firstTool: '',
            secondTool: '',
            thirdTool: '',
            firstToolPercentage: 0,
            secondToolPercentage: 0,
            thirdToolPercentage: 0
        }
    });

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
            <TopInputWithSlider form={form} />
            <BarChart form={form} />
            <Footer />
        </Container>
    );
}

export default App;
