import { Group } from '@visx/group';
import { scaleLinear } from 'd3-scale';

import data from './tools_counts.json';
import { combineChartDimensions, getRandomColor } from './utils';

const defaultBarHeight = 50; // px

// Accessors
const xAccessor = (d) => d.use_count / d.total_count;
const yAccessor = (d) => d.tool;

function BarChart() {
    const height = data.length * defaultBarHeight;
    const dimensions = combineChartDimensions({ width: 300, height });
    // console.log(dimensions);

    const xScale = scaleLinear().domain([0, 1]).range([0, dimensions.boundedWidth]).nice();
    const xAccessorScaled = (d) => xScale(xAccessor(d));

    return (
        <svg>
            <Group>
                {data.map((d) => (
                    <rect
                        key={yAccessor(d)}
                        width={xAccessorScaled(d)}
                        height={defaultBarHeight}
                        fill={getRandomColor()}
                    />
                ))}
            </Group>
        </svg>
    );
}

export default BarChart;
