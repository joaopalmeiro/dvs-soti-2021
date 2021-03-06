import { Affix, Button, Container, Group, Transition } from '@mantine/core';
import { useForm, useResizeObserver, useScrollIntoView, useWindowScroll } from '@mantine/hooks';
import { isEmpty, isNull } from 'lodash';
import { ArrowUp } from 'phosphor-react';
import { useEffect, useState } from 'react';

import BarChart from './BarChart';
import Footer from './Footer';
import Heading from './Heading';
import Intro from './Intro';
import Results from './Results';
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
    const { scrollIntoView, targetRef } = useScrollIntoView();

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
    // const resultsRef = useRef();

    // https://mantine.dev/hooks/use-scroll-into-view/
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    // https://robinvdvleuten.nl/blog/scroll-a-react-component-into-view/
    // https://www.carlrippon.com/scrolling-a-react-element-into-view/
    useEffect(() => {
        !isNull(userOptions) &&
            // resultsRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
            scrollIntoView({ alignment: 'start' });
    }, [scrollIntoView, userOptions]);

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
                    // gap: theme.spacing.xl,
                    gap: `${theme.spacing.xl * 2}px`,
                    minHeight: '100vh',
                    padding: `${theme.spacing.lg}px`
                })}
                // ref={ref}
            >
                <header>
                    <Group
                        direction="column"
                        position="left"
                        // spacing="xs"
                        grow
                        sx={(theme) => ({
                            gap: `${theme.spacing.xl * 3}px`,
                            paddingTop: `${theme.spacing.xl * 3 - theme.spacing.lg}px`
                        })}
                    >
                        <ToolsTitle />
                        <Intro />
                    </Group>
                </header>
                <main>
                    <Group
                        direction="column"
                        sx={(theme) => ({
                            gap: !isNull(userOptions) ? `${theme.spacing.xl * 2}px` : `0px`
                        })}
                        grow
                    >
                        <Group direction="column" grow spacing="xl">
                            <Heading>your Guess</Heading>
                            <TopInputWithSlider
                                form={form}
                                handleSubmit={handleSubmit}
                                toDisable={!isNull(userOptions)}
                            />
                        </Group>

                        {/* https://css-tricks.com/tale-width-max-width/ */}
                        {!isNull(userOptions) && (
                            <Results userOptions={userOptions} ref={targetRef} />
                        )}
                        <Container size="sm" ref={ref} padding={0} style={{ width: '100%' }}>
                            {!isNull(userOptions) && (
                                <BarChart userOptions={userOptions} width={rect.width} />
                            )}
                        </Container>
                    </Group>
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
                            sx={(theme) => ({
                                backgroundColor: theme.colors.gray[8],
                                '&:hover': {
                                    backgroundColor: theme.colors.gray[9]
                                }
                            })}
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
