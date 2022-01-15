import { Drag, raise } from '@visx/drag';
import { Group } from '@visx/group';
import { map, sort, descending } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { useState } from 'react';

import data from './tools_counts.json';
import { combineChartDimensions, generateRandomColor } from './utils';

const defaultBarHeight = 50; // px

// Accessors
const countAccessor = (d) => d.use_count;
const xAccessor = (d) => countAccessor(d) / d.total_count;
const yAccessor = (d) => d.tool;

function BarChart() {
    const numBars = data.length;
    const height = numBars * defaultBarHeight;
    const dimensions = combineChartDimensions({ width: 500, height });

    const sortedData = sort(data, (a, b) => descending(countAccessor(a), countAccessor(b)));
    const yValues = map(sortedData, yAccessor);

    const [draggingItems, setDraggingItems] = useState(sortedData);

    const xScale = scaleLinear().domain([0, 1]).range([0, dimensions.boundedWidth]).nice();
    const xAccessorScaled = (d) => xScale(xAccessor(d));

    // https://observablehq.com/@d3/d3-scalepoint
    // https://github.com/d3/d3-scale/tree/main#point-scales
    // https://github.com/d3/d3-scale/tree/main#band-scales
    const yScale = scaleBand()
        .domain(yValues)
        .range([0, dimensions.boundedHeight])
        .paddingInner(0.05)
        .paddingOuter(0);
    const yAccessorScaled = (d) => yScale(yAccessor(d));

    // https://wattenberger.com/blog/react-and-d3
    // https://github.com/airbnb/visx/blob/master/packages/visx-drag/src/util/raise.ts
    return (
        <svg width={dimensions.width} height={dimensions.height}>
            <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
                {/* https://airbnb.io/visx/docs/drag#Drag */}
                {/* https://airbnb.io/visx/drag-i */}
                {draggingItems.map((d, i) => (
                    <Drag
                        key={`drag-${yAccessor(d)}`}
                        width={dimensions.width}
                        height={dimensions.height}
                        onDragStart={() => setDraggingItems(raise(draggingItems, i))}
                        onDragMove={(e) => {
                            const yStartPosition = e.y; // How are you?
                            const yCurrentPosition = yStartPosition + e.dy;
                        }}
                        // onDragEnd={(e) => console.log('End', e)}
                        // https://github.com/airbnb/visx/pull/1368
                        restrict={{
                            // Move only on the Y-axis.
                            xMin: 0,
                            xMax: 0
                        }}
                        snapToPointer={true}
                    >
                        {({ dragStart, dragEnd, dragMove, isDragging, dx, dy }) => (
                            <rect
                                // Bar
                                key={`bar-${yAccessor(d)}`}
                                width={xAccessorScaled(d)}
                                // https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
                                height={yScale.bandwidth()}
                                x={0}
                                y={yAccessorScaled(d)}
                                fill={generateRandomColor()}
                                // Drag
                                transform={`translate(${dx}, ${dy})`}
                                onMouseMove={dragMove}
                                onMouseUp={dragEnd}
                                onMouseDown={dragStart}
                                onTouchStart={dragStart}
                                onTouchMove={dragMove}
                                onTouchEnd={dragEnd}
                                // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
                                cursor={isDragging ? 'grabbing' : 'grab'}
                            />
                        )}
                    </Drag>
                ))}
            </Group>
        </svg>
    );
}

export default BarChart;
