import { Button, Container, Slider, Select, Group } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { includes, map, values } from 'lodash';
import { NumberCircleOne, NumberCircleTwo, NumberCircleThree } from 'phosphor-react';

import GridTopInputWithSlider from './GridTopInputWithSlider';
import data from './tools_counts.json';

function TopInputWithSlider() {
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
                <GridTopInputWithSlider>
                    <Group direction="column" spacing="xs" grow style={{ gridArea: 'first' }}>
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
                        <Slider
                            marks={[
                                { value: 25, label: '25%' },
                                { value: 50, label: '50%' },
                                { value: 75, label: '75%' }
                            ]}
                            value={form.getInputProps('firstToolPercentage').value}
                            onChange={form.getInputProps('firstToolPercentage').onChange}
                        />
                    </Group>

                    <Group direction="column" spacing="xs" grow style={{ gridArea: 'second' }}>
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
                        <Slider
                            marks={[
                                { value: 25, label: '25%' },
                                { value: 50, label: '50%' },
                                { value: 75, label: '75%' }
                            ]}
                            value={form.getInputProps('secondToolPercentage').value}
                            onChange={form.getInputProps('secondToolPercentage').onChange}
                        />
                    </Group>

                    <Group direction="column" spacing="xs" grow style={{ gridArea: 'third' }}>
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
                        <Slider
                            marks={[
                                { value: 25, label: '25%' },
                                { value: 50, label: '50%' },
                                { value: 75, label: '75%' }
                            ]}
                            value={form.getInputProps('thirdToolPercentage').value}
                            onChange={form.getInputProps('thirdToolPercentage').onChange}
                        />
                    </Group>

                    <Button type="submit" style={{ gridArea: 'submit', justifySelf: 'center' }}>
                        Submit
                    </Button>
                </GridTopInputWithSlider>
            </form>
        </Container>
    );
}

export default TopInputWithSlider;
