import { Button, Select } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { map, values, includes } from 'lodash';

import data from './tools_counts.json';

function TopInput() {
    // https://mantine.dev/hooks/use-form/
    const form = useForm({
        initialValues: {
            firstTool: '',
            secondTool: '',
            thirdTool: ''
        }
    });

    const allTools = map(data, (datum) => ({
        value: datum.tool,
        label: datum.tool,
        disabled: includes(values(form.values), datum.tool)
    }));

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Select
                aria-label="Your guess for the most used tool"
                placeholder="Pick one"
                nothingFound="Nothing found"
                searchable
                clearable
                data={allTools}
                {...form.getInputProps('firstTool')}
            />

            <Select
                aria-label="Your guess for the second most used tool"
                placeholder="Pick one"
                nothingFound="Nothing found"
                searchable
                clearable
                data={allTools}
                {...form.getInputProps('secondTool')}
            />

            <Select
                aria-label="Your guess for the third most used tool"
                placeholder="Pick one"
                nothingFound="Nothing found"
                searchable
                clearable
                data={allTools}
                {...form.getInputProps('thirdTool')}
            />

            <Button type="submit">Submit</Button>
        </form>
    );
}

export default TopInput;
