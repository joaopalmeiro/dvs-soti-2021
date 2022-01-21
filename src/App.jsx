import { Container } from '@mantine/core';
import { useForm, useResizeObserver } from '@mantine/hooks';
import { isEmpty, isNull } from 'lodash';
import { useState } from 'react';

import BarChart from './BarChart';
import Footer from './Footer';
import TopInputWithSlider from './TopInputWithSlider';

// https://lodash.com/docs/4.17.15#stubString
const initialToolValue = '';
const initialPercentageValue = 0;

function App() {
    // https://tzi.fr/js/convert-em-in-px/
    // console.log(parseFloat(getComputedStyle(document.documentElement).fontSize));

    const [userOptions, setUserOptions] = useState(null);

    const form = useForm({
        initialValues: {
            firstTool: initialToolValue,
            secondTool: initialToolValue,
            thirdTool: initialToolValue,
            firstToolPercentage: initialPercentageValue,
            secondToolPercentage: initialPercentageValue,
            thirdToolPercentage: initialPercentageValue
        },
        validationRules: {
            firstTool: (value) => !isEmpty(value),
            secondTool: (value) => !isEmpty(value),
            thirdTool: (value) => !isEmpty(value),
            firstToolPercentage: (value) => value > initialPercentageValue,
            secondToolPercentage: (value) => value > initialPercentageValue,
            thirdToolPercentage: (value) => value > initialPercentageValue
        }
    });
    // console.log(form);

    // https://mantine.dev/hooks/use-resize-observer/
    // https://wattenberger.com/blog/react-hooks
    // Alternative: https://www.npmjs.com/package/@react-hook/size
    // Alternative: https://mantine.dev/hooks/use-element-size/
    // https://www.npmjs.com/package/@react-hook/resize-observer
    const [ref, rect] = useResizeObserver();

    // https://mantine.dev/hooks/use-form/#get-form-values-type
    // https://mantine.dev/hooks/use-form/#authentication-form
    const handleSubmit = (values) => {
        // console.log(values);
        setUserOptions(values);
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
            <main>
                <TopInputWithSlider form={form} handleSubmit={handleSubmit} />
                {/* https://css-tricks.com/tale-width-max-width/ */}

                <Container size="sm" ref={ref} padding={0} style={{ width: '100%' }}>
                    {!isNull(userOptions) && (
                        <BarChart userOptions={userOptions} width={rect.width} />
                    )}
                </Container>
            </main>

            <Footer />
        </Container>
    );
}

export default App;
