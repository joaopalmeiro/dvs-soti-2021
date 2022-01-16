import { Drag, raise } from '@visx/drag';
import { Group } from '@visx/group';
import { map, sort, descending, ascending } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { useState } from 'react';

import data from './tools_counts.json';
import { combineChartDimensions } from './utils';

const defaultBarHeight = 50; // px

// Accessors
const countAccessor = (d) => d.use_count;
const xAccessor = (d) => countAccessor(d) / d.total_count;
const yAccessor = (d) => d.tool;

const getBarTransform = (isDragging, dx, dy, currentY, initialY) => {
    if (isDragging) {
        // dragStart + dragMove
        return `translate(${dx}, ${dy + initialY})`;
    }

    // Initial rendering + dragEnd (new final position)
    return `translate(0, ${currentY})`;
};

function BarChart() {
    const numBars = data.length;
    const height = numBars * defaultBarHeight;
    const dimensions = combineChartDimensions({ width: 500, height });

    const initialSortedData = sort(data, (a, b) => descending(countAccessor(a), countAccessor(b)));

    const [sortedData, setSortedData] = useState(initialSortedData);
    const [draggingItems, setDraggingItems] = useState(initialSortedData);
    const [initialPositionOnScale, setInitialPositionOnScale] = useState(null);

    const xScale = scaleLinear().domain([0, 1]).range([0, dimensions.boundedWidth]).nice();
    const xAccessorScaled = (d) => xScale(xAccessor(d));

    // https://observablehq.com/@d3/d3-scalepoint
    // https://github.com/d3/d3-scale/tree/main#point-scales
    // https://github.com/d3/d3-scale/tree/main#band-scales
    const yScale = scaleBand()
        .domain(map(sortedData, yAccessor))
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
                        onDragStart={() => {
                            setDraggingItems(raise(draggingItems, i));
                            setInitialPositionOnScale(yAccessorScaled(d));
                        }}
                        onDragMove={(e) => {
                            // const yStartPosition = e.y; // How are you?
                            const yCurrentPosition = initialPositionOnScale + e.dy;

                            const newSortedData = sort(sortedData, (a, b) =>
                                ascending(
                                    yAccessor(a) === yAccessor(d)
                                        ? yCurrentPosition
                                        : yAccessorScaled(a),
                                    yAccessor(b) === yAccessor(d)
                                        ? yCurrentPosition
                                        : yAccessorScaled(b)
                                )
                            );

                            setSortedData(newSortedData);
                        }}
                        onDragEnd={() => setInitialPositionOnScale(null)}
                        // https://github.com/airbnb/visx/pull/1368
                        restrict={{
                            // Move only on the Y-axis.
                            xMin: 0,
                            xMax: 0
                        }}
                        snapToPointer={true}
                        resetOnStart={true}
                    >
                        {/* https://github.com/airbnb/visx/tree/v2.5.0/packages/visx-drag/src */}
                        {({ dragStart, dragEnd, dragMove, isDragging, dx, dy }) => (
                            <rect
                                key={`bar-${yAccessor(d)}`}
                                width={xAccessorScaled(d)}
                                // https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
                                height={yScale.bandwidth()}
                                // x={0}
                                // y={yAccessorScaled(d)}
                                fill="black"
                                transform={getBarTransform(
                                    isDragging,
                                    dx,
                                    dy,
                                    yAccessorScaled(d),
                                    initialPositionOnScale
                                )}
                                onMouseMove={dragMove}
                                onMouseUp={dragEnd}
                                onMouseDown={dragStart}
                                onTouchStart={dragStart}
                                onTouchMove={dragMove}
                                onTouchEnd={dragEnd}
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
