import { Button, Group, Select, Slider } from '@mantine/core';
import { ascending } from 'd3-array';
import { includes, map, values } from 'lodash';
import { NumberCircleOne, NumberCircleThree, NumberCircleTwo } from 'phosphor-react';
import PropTypes from 'prop-types';

import GridTopInputWithSlider from './GridTopInputWithSlider';
import data from './tools_counts.json';

const sliderMarks = [
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' }
];
// https://mantine.dev/core/slider/
const sliderCustomStyle = {
    markLabel: { userSelect: 'none' }
};
const nothingFoundMessage = 'No tools';
const placeholderMessage = 'Pick one';

function TopInputWithSlider({ form, handleSubmit }) {
    // https://observablehq.com/@d3/d3-ascending
    const allTools = map(
        data.sort((a, b) => ascending(a.tool.toLowerCase(), b.tool.toLowerCase())),
        (datum) => ({
            value: datum.tool,
            label: datum.tool,
            disabled: includes(values(form.values), datum.tool)
        })
    );
    // console.log(allTools);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <GridTopInputWithSlider>
                <Group direction="column" spacing="xs" grow style={{ gridArea: 'first' }}>
                    <Select
                        aria-label="Your guess for the most used tool"
                        clearButtonLabel="Clear your first choice"
                        placeholder={placeholderMessage}
                        nothingFound={nothingFoundMessage}
                        searchable
                        clearable
                        data={allTools}
                        icon={<NumberCircleOne weight="bold" />}
                        {...form.getInputProps('firstTool')}
                    />
                    <Slider
                        marks={sliderMarks}
                        value={form.getInputProps('firstToolPercentage').value}
                        onChange={form.getInputProps('firstToolPercentage').onChange}
                        styles={sliderCustomStyle}
                    />
                </Group>

                <Group direction="column" spacing="xs" grow style={{ gridArea: 'second' }}>
                    <Select
                        aria-label="Your guess for the second most used tool"
                        clearButtonLabel="Clear your second choice"
                        placeholder={placeholderMessage}
                        nothingFound={nothingFoundMessage}
                        searchable
                        clearable
                        data={allTools}
                        icon={<NumberCircleTwo weight="regular" />}
                        {...form.getInputProps('secondTool')}
                    />
                    <Slider
                        marks={sliderMarks}
                        value={form.getInputProps('secondToolPercentage').value}
                        onChange={form.getInputProps('secondToolPercentage').onChange}
                        styles={sliderCustomStyle}
                    />
                </Group>

                <Group direction="column" spacing="xs" grow style={{ gridArea: 'third' }}>
                    <Select
                        aria-label="Your guess for the third most used tool"
                        clearButtonLabel="Clear your third choice"
                        placeholder={placeholderMessage}
                        nothingFound={nothingFoundMessage}
                        searchable
                        clearable
                        data={allTools}
                        icon={<NumberCircleThree weight="light" />}
                        {...form.getInputProps('thirdTool')}
                    />
                    <Slider
                        marks={sliderMarks}
                        value={form.getInputProps('thirdToolPercentage').value}
                        onChange={form.getInputProps('thirdToolPercentage').onChange}
                        styles={sliderCustomStyle}
                    />
                </Group>

                <Button type="submit" style={{ gridArea: 'submit', justifySelf: 'center' }}>
                    Submit
                </Button>
            </GridTopInputWithSlider>
        </form>
    );
}

TopInputWithSlider.propTypes = {
    form: PropTypes.shape({
        getInputProps: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        values: PropTypes.exact({
            firstTool: PropTypes.string,
            secondTool: PropTypes.string,
            thirdTool: PropTypes.string,
            firstToolPercentage: PropTypes.number,
            secondToolPercentage: PropTypes.number,
            thirdToolPercentage: PropTypes.number
        }).isRequired
    }),
    handleSubmit: PropTypes.func.isRequired
};

export default TopInputWithSlider;
