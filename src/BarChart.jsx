import { Group } from '@visx/group';
import { scaleLinear } from 'd3-scale';

import data from './tools_counts.json';

// Accessors
const xAccessor = (d) => d.use_count;
const yAccessor = (d) => d.tool;
const totalAccessor = (d) => d.total_count;

function BarChart() {
    const xScale = scaleLinear().domain([0, 1]).range([0, 300]).nice();
    const xAccessorScaled = (d) => xScale(xAccessor(d));

    return (
        <svg>
            <Group>
                {data.map((d) => (
                    <rect key={yAccessor(d)} />
                ))}
            </Group>
        </svg>
    );
}

export default BarChart;
