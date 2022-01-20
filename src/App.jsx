import { Container } from '@mantine/core';
import { useForm, useResizeObserver } from '@mantine/hooks';

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

    // https://mantine.dev/hooks/use-resize-observer/
    // https://wattenberger.com/blog/react-hooks
    // Alternative: https://www.npmjs.com/package/@react-hook/size
    // https://www.npmjs.com/package/@react-hook/resize-observer
    const [ref, rect] = useResizeObserver();

    return (
        // https://mantine.dev/core/center/
        // https://mantine.dev/core/container/
        <Container
            size="md"
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: theme.spacing.xl
            })}
            // ref={ref}
        >
            <TopInputWithSlider form={form} />
            {/* https://css-tricks.com/tale-width-max-width/ */}
            <Container size="sm" ref={ref} padding={0} style={{ width: '100%' }}>
                <BarChart form={form} width={rect.width} />
            </Container>
            <Footer />
        </Container>
    );
}

export default App;
