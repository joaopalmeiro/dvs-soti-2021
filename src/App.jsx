import { Affix, Button, Container, Group, Transition } from '@mantine/core';
import { useForm, useResizeObserver, useWindowScroll } from '@mantine/hooks';
import { isEmpty, isNull } from 'lodash';
import { ArrowUp } from 'phosphor-react';
import { useState } from 'react';

import BarChart from './BarChart';
import Footer from './Footer';
import Intro from './Intro';
import ToolsTitle from './ToolsTitle';
import TopInputWithSlider from './TopInputWithSlider';

// https://lodash.com/docs/4.17.15#stubString
const initialToolValue = '';
const initialPercentageValue = 0;

function App() {
    // https://tzi.fr/js/convert-em-in-px/
    // console.log(parseFloat(getComputedStyle(document.documentElement).fontSize));

    const [userOptions, setUserOptions] = useState(null);
    const [scroll, scrollTo] = useWindowScroll();

    const form = useForm({
        initialValues: {
            firstTool: initialToolValue,
            secondTool: initialToolValue,
            thirdTool: initialToolValue,
            firstToolPercentage: initialPercentageValue,
            secondToolPercentage: initialPercentageValue,
            thirdToolPercentage: initialPercentageValue
        },
        // https://mantine.dev/hooks/use-form/#definition
        // https://mantine.dev/hooks/use-form/#authentication-form
        validationRules: {
            firstTool: (value) => !isEmpty(value),
            secondTool: (value) => !isEmpty(value),
            thirdTool: (value) => !isEmpty(value),
            firstToolPercentage: (val, values) =>
                val > initialPercentageValue &&
                val >= values.secondToolPercentage &&
                val >= values.thirdToolPercentage,
            secondToolPercentage: (val, values) =>
                val > initialPercentageValue && val >= values.thirdToolPercentage,
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
    const handleSubmit = (userValues) => {
        // console.log(userValues);
        // const percentageTools = values(
        //     pick(userValues, ['firstToolPercentage', 'secondToolPercentage', 'thirdToolPercentage'])
        // );
        // console.log(percentageTools, isDescending(percentageTools));

        setUserOptions(userValues);

        // https://mantine.dev/hooks/use-form/#external-field-validation
        // https://mantine.dev/others/notifications/
        // if (isDescending(percentageTools)) {
        //     setUserOptions(userValues);
        // } else {
        //     form.setFieldError('firstToolPercentage', true);
        //     form.setFieldError('secondToolPercentage', true);
        //     form.setFieldError('thirdToolPercentage', true);
        // }
    };

    return (
        // https://mantine.dev/core/center/
        // https://mantine.dev/core/container/
        <>
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
                <header>
                    <Group direction="column" position="left" spacing="xs" grow>
                        <ToolsTitle />
                        <Intro />
                    </Group>
                </header>
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

            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        // https://mantine.dev/core/button/
                        <Button
                            compact
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                            // variant="outline"
                        >
                            <ArrowUp />
                        </Button>
                    )}
                </Transition>
            </Affix>
        </>
    );
}

export default App;
