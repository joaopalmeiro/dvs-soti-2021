import { Group } from '@visx/group';
import { map, sort, descending } from 'd3-array';
import { scaleLinear, scalePoint } from 'd3-scale';

import data from './tools_counts.json';
import { combineChartDimensions, getRandomColor } from './utils';

const defaultBarHeight = 50; // px

// Accessors
const countAccessor = (d) => d.use_count;
const xAccessor = (d) => countAccessor(d) / d.total_count;
const yAccessor = (d) => d.tool;

function BarChart() {
    const numBars = data.length;
    const height = numBars * defaultBarHeight;

    const sortedData = sort(data, (a, b) => descending(countAccessor(a), countAccessor(b)));
    const yValues = map(sortedData, yAccessor);

    const dimensions = combineChartDimensions({ width: 500, height });

    const xScale = scaleLinear().domain([0, 1]).range([0, dimensions.boundedWidth]).nice();
    const xAccessorScaled = (d) => xScale(xAccessor(d));

    const yScale = scalePoint().domain(yValues).range([0, dimensions.boundedHeight]);
    const yAccessorScaled = (d) => yScale(yAccessor(d));

    // https://wattenberger.com/blog/react-and-d3
    return (
        <svg width={dimensions.width} height={dimensions.height}>
            <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
                {sortedData.map((d) => (
                    <rect
                        key={yAccessor(d)}
                        width={xAccessorScaled(d)}
                        height={defaultBarHeight}
                        y={yAccessorScaled(d)}
                        fill={getRandomColor()}
                    />
                ))}
            </Group>
        </svg>
    );
}

export default BarChart;
