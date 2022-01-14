import { Button, Container, Grid, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { includes, map, values } from 'lodash';
import { NumberCircleOne, NumberCircleTwo, NumberCircleThree, Percent } from 'phosphor-react';

import GridTopInputWithNumberInput from './GridTopInputWithNumberInput';
import data from './tools_counts.json';

function TopInputWithNumberInput() {
    // https://mantine.dev/hooks/use-form/
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

    const allTools = map(data, (datum) => ({
        value: datum.tool,
        label: datum.tool,
        disabled: includes(values(form.values), datum.tool)
    }));

    return (
        <Container size="md">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                {/* https://mantine.dev/core/grid/#usage (flexbox) */}
                {/* https://mantine.dev/core/grid/#change-columns-count */}
                <GridTopInputWithNumberInput>
                    <Grid gutter="xs" justify="center" style={{ gridArea: 'first' }}>
                        <Grid.Col span={6}>
                            <Select
                                aria-label="Your guess for the most used tool"
                                placeholder="Pick one"
                                nothingFound="Nothing found"
                                searchable
                                clearable
                                data={allTools}
                                icon={<NumberCircleOne weight="bold" />}
                                {...form.getInputProps('firstTool')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                // https://mantine.dev/core/number-input/#custom-incrementdecrement-controls
                                aria-label="Your guess for the percentage of the most used tool"
                                max={100}
                                min={0}
                                step={1}
                                // https://mantine.dev/core/number-input/#incrementdecrement-on-hold
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                icon={<Percent />}
                                {...form.getInputProps('firstToolPercentage')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid gutter="xs" justify="center" style={{ gridArea: 'second' }}>
                        <Grid.Col span={6}>
                            <Select
                                aria-label="Your guess for the second most used tool"
                                placeholder="Pick one"
                                nothingFound="Nothing found"
                                searchable
                                clearable
                                data={allTools}
                                icon={<NumberCircleTwo weight="regular" />}
                                {...form.getInputProps('secondTool')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                // https://mantine.dev/core/number-input/#custom-incrementdecrement-controls
                                aria-label="Your guess for the percentage of the second most used tool"
                                max={100}
                                min={0}
                                step={1}
                                // https://mantine.dev/core/number-input/#incrementdecrement-on-hold
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                icon={<Percent />}
                                {...form.getInputProps('secondToolPercentage')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid gutter="xs" justify="center" style={{ gridArea: 'third' }}>
                        <Grid.Col span={6}>
                            <Select
                                aria-label="Your guess for the third most used tool"
                                placeholder="Pick one"
                                nothingFound="Nothing found"
                                searchable
                                clearable
                                data={allTools}
                                icon={<NumberCircleThree weight="light" />}
                                {...form.getInputProps('thirdTool')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                // https://mantine.dev/core/number-input/#custom-incrementdecrement-controls
                                aria-label="Your guess for the percentage of the third most used tool"
                                max={100}
                                min={0}
                                step={1}
                                // https://mantine.dev/core/number-input/#incrementdecrement-on-hold
                                stepHoldDelay={500}
                                stepHoldInterval={100}
                                icon={<Percent />}
                                {...form.getInputProps('thirdToolPercentage')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Button type="submit" style={{ gridArea: 'submit' }}>
                        Submit
                    </Button>
                </GridTopInputWithNumberInput>
            </form>
        </Container>
    );
}

export default TopInputWithNumberInput;
