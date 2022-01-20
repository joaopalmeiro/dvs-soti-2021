import { Container } from '@mantine/core';
import { useForm, useResizeObserver } from '@mantine/hooks';

import BarChart from './BarChart';
import Footer from './Footer';
import TopInputWithSlider from './TopInputWithSlider';

const initialToolValue = '';
const initialPercentageValue = 0;

function App() {
    // https://tzi.fr/js/convert-em-in-px/
    // console.log(parseFloat(getComputedStyle(document.documentElement).fontSize));

    const form = useForm({
        initialValues: {
            firstTool: initialToolValue,
            secondTool: initialToolValue,
            thirdTool: initialToolValue,
            firstToolPercentage: initialPercentageValue,
            secondToolPercentage: initialPercentageValue,
            thirdToolPercentage: initialPercentageValue
        }
    });
    // console.log(form);

    // https://mantine.dev/hooks/use-resize-observer/
    // https://wattenberger.com/blog/react-hooks
    // Alternative: https://www.npmjs.com/package/@react-hook/size
    // https://www.npmjs.com/package/@react-hook/resize-observer
    const [ref, rect] = useResizeObserver();

    // https://mantine.dev/hooks/use-form/#get-form-values-type
    // https://mantine.dev/hooks/use-form/#authentication-form
    const handleSubmit = (values) => {
        console.log(values);
    };

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
            <TopInputWithSlider form={form} handleSubmit={handleSubmit} />
            {/* https://css-tricks.com/tale-width-max-width/ */}
            <Container size="sm" ref={ref} padding={0} style={{ width: '100%' }}>
                <BarChart form={form} width={rect.width} />
            </Container>
            <Footer />
        </Container>
    );
}

export default App;
