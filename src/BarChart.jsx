import { useMantineTheme } from '@mantine/core';
import Tippy from '@tippyjs/react';
import { AxisBottom, AxisTop } from '@visx/axis';
import { bottomTickLabelProps } from '@visx/axis/lib/axis/AxisBottom';
import { topTickLabelProps } from '@visx/axis/lib/axis/AxisTop';
import { Drag, raise } from '@visx/drag';
import { GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import { getStringWidth } from '@visx/text';
import { ascending, descending, map, sort } from 'd3-array';
import { format } from 'd3-format';
import { scaleBand, scaleLinear } from 'd3-scale';
import { drop, includes, isInteger, isNull, pick, values } from 'lodash';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css'; // https://unpkg.com/browse/tippy.js@6.3.7/dist/tippy.css

import classes from './BarChart.module.css';
import data from './tools_counts.json';
import {
    combineChartDimensions,
    getFontStyleHeight,
    truncateLabels,
    xFormatter,
    xTooltipFormatter
} from './utils';

// Constants
const defaultBarHeight = 50; // px
const defaultDomainLineWidth = 1; // px
const visxTickLength = 5; // px
const dyTickLabelTop = '-0.5em';
const secondaryTickLabelFontSize = 10; // px

const tickValues = [0, 0.25, 0.5, 0.75, 1];
const totalCount = data[0].total_count;

// Accessors
const countAccessor = (d) => d.use_count;
const xAccessor = (d) => countAccessor(d) / d.total_count;
const yAccessor = (d) => d.tool;
const rankAccessor = (d) => d.ranking;

// Single-use helper functions
const getBarTransform = (isDragging, dx, dy, currentY, initialY) => {
    if (isDragging) {
        // dragStart + dragMove
        return `translate(${dx}, ${dy + initialY})`;
    }
    // Initial rendering + dragEnd (new final position)
    return `translate(0, ${currentY})`;
};

const getTooltipContent = (d, labels) => {
    const prefix = labels[yAccessor(d)] !== yAccessor(d) ? `${yAccessor(d)}: ` : '';
    const value = xTooltipFormatter(xAccessor(d));
    const ranking = rankAccessor(d);

    return `${prefix}${value} (#${ranking})`;
};

function BarChart({ userOptions, width }) {
    // Tooltip
    const svgEl = useRef(null);
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [currentTool, setCurrentTool] = useState(null);

    // https://mantine.dev/theming/functions/#accessing-theme-functions
    const theme = useMantineTheme();
    const tickLabelSharedProps = {
        fontFamily: theme.fontFamily,
        fill: theme.black,
        fontSize: theme.fontSizes.xs,
        style: { userSelect: 'none' }
    };
    // console.log({ theme, tickLabelSharedProps });

    const highlightTools = values(pick(userOptions, ['firstTool', 'secondTool', 'thirdTool']));
    // console.log(highlightTools);

    const tickLabelTopProps = {
        ...topTickLabelProps(),
        ...tickLabelSharedProps,
        dy: dyTickLabelTop
    };
    const tickLabelBottomProps = { ...bottomTickLabelProps(), ...tickLabelSharedProps };

    const tickLabelHeight = getFontStyleHeight(
        '0%',
        `${tickLabelSharedProps.fontSize}px ${tickLabelSharedProps.fontFamily}`
    );

    const dyTickLabelDiff = (parseFloat(dyTickLabelTop) * tickLabelTopProps.fontSize) / 2;
    const dySecondaryTickLabel =
        parseFloat(dyTickLabelTop) * tickLabelTopProps.fontSize - tickLabelHeight + dyTickLabelDiff;
    const secondaryTickLabelHeight = getFontStyleHeight(
        totalCount,
        `${secondaryTickLabelFontSize}px ${tickLabelSharedProps.fontFamily}`
    );

    const xAxisHeight =
        tickLabelHeight +
        defaultDomainLineWidth +
        visxTickLength +
        Math.abs(parseFloat(tickLabelTopProps.dy)) * tickLabelTopProps.fontSize;
    const marginTop =
        xAxisHeight - defaultDomainLineWidth / 2 + secondaryTickLabelHeight - dyTickLabelDiff;

    const rightmostLabelStringWidth = getStringWidth('100%', tickLabelTopProps);
    const rightmostSecondaryLabelStringWidth = getStringWidth(totalCount, {
        ...tickLabelTopProps,
        dy: dySecondaryTickLabel,
        fontSize: secondaryTickLabelFontSize
    });
    const marginRight = Math.max(rightmostLabelStringWidth, rightmostSecondaryLabelStringWidth) / 2;

    const numBars = data.length;
    const height = numBars * defaultBarHeight;
    const dimensions = combineChartDimensions({
        // width: 500,
        width,
        height,
        marginLeft: 100,
        marginTop,
        marginBottom: xAxisHeight,
        marginRight
    });

    const tickLabelLeftProps = {
        fontFamily: tickLabelSharedProps.fontFamily,
        fill: tickLabelSharedProps.fill,
        fontSize: theme.fontSizes.sm,
        dx:
            dimensions.marginLeft +
            // theme.fontSizes.sm * parseFloat('-0.25em')
            theme.fontSizes.sm * parseFloat('-0.5em')
    };

    const initialSortedData = sort(data, (a, b) => descending(countAccessor(a), countAccessor(b)));

    const [sortedData, setSortedData] = useState(initialSortedData);
    const [draggingItems, setDraggingItems] = useState(initialSortedData);
    const [initialPositionOnScale, setInitialPositionOnScale] = useState(null);

    const xScale = scaleLinear().domain([0, 1]).range([0, dimensions.boundedWidth]).nice();
    const xAccessorScaled = (d) => xScale(xAccessor(d));

    // https://observablehq.com/@d3/d3-scalepoint
    // https://github.com/d3/d3-scale/tree/main#point-scales
    // https://github.com/d3/d3-scale/tree/main#band-scales
    const originalYValues = map(sortedData, yAccessor);
    const yScale = scaleBand()
        .domain(originalYValues)
        .range([0, dimensions.boundedHeight])
        .paddingInner(0.05)
        .paddingOuter(0);
    const yAccessorScaled = (d) => yScale(yAccessor(d));

    // https://dmitripavlutin.com/react-usememo-hook/
    const yAxisLabels = truncateLabels(originalYValues, tickLabelLeftProps, tickLabelLeftProps.dx);

    // https://wattenberger.com/blog/react-and-d3
    // https://github.com/airbnb/visx/blob/master/packages/visx-drag/src/util/raise.ts
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={dimensions.width}
                height={dimensions.height}
                overflow="hidden"
                // overflow="visible"
                style={{ alignSelf: 'center' }}
                ref={svgEl}
            >
                {/* <Group top={dimensions.marginTop} left={dimensions.marginLeft}> */}
                <Group top={dimensions.marginTop}>
                    <line
                        x1={dimensions.marginLeft - defaultDomainLineWidth / 2}
                        x2={dimensions.marginLeft - defaultDomainLineWidth / 2}
                        y2={dimensions.boundedHeight}
                        stroke={theme.black}
                        strokeWidth={defaultDomainLineWidth}
                        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
                        // https://github.com/airbnb/visx/blob/v2.5.0/packages/visx-axis/src/axis/Ticks.tsx#L45
                        strokeLinecap="square"
                    />

                    <AxisTop
                        scale={xScale}
                        top={-defaultDomainLineWidth / 2}
                        tickLength={visxTickLength}
                        tickComponent={({ formattedValue, ...tickProps }) => {
                            const numberParticipants = formattedValue * totalCount;

                            return (
                                <>
                                    {/* https://en.wikipedia.org/wiki/Approximation */}
                                    {numberParticipants > 0 && (
                                        <text
                                            {...tickProps}
                                            fontSize={secondaryTickLabelFontSize}
                                            dy={dySecondaryTickLabel}
                                            fill={theme.colors.gray[5]}
                                        >
                                            {!isInteger(numberParticipants) && '???'}
                                            {Math.round(numberParticipants)}
                                        </text>
                                    )}
                                    <text {...tickProps}>{xFormatter(formattedValue)}</text>
                                </>
                            );
                        }}
                        left={dimensions.marginLeft - defaultDomainLineWidth / 2}
                        strokeWidth={defaultDomainLineWidth}
                        // tickFormat={(value) => xFormatter(value)}
                        tickFormat={(value) => format('.2f')(value)}
                        tickLabelProps={() => tickLabelTopProps}
                        tickValues={tickValues}
                        stroke={theme.black}
                        tickStroke={theme.black}
                    />

                    <AxisBottom
                        scale={xScale}
                        top={dimensions.boundedHeight + defaultDomainLineWidth / 2}
                        tickLength={visxTickLength}
                        tickComponent={({ formattedValue, ...tickProps }) => (
                            <text {...tickProps}>{formattedValue}</text>
                        )}
                        left={dimensions.marginLeft - defaultDomainLineWidth / 2}
                        strokeWidth={defaultDomainLineWidth}
                        tickFormat={(value) => xFormatter(value)}
                        tickLabelProps={() => tickLabelBottomProps}
                        tickValues={tickValues}
                        stroke={theme.black}
                        tickStroke={theme.black}
                    />

                    <GridColumns
                        scale={xScale}
                        height={dimensions.boundedHeight}
                        left={dimensions.marginLeft - defaultDomainLineWidth / 2}
                        tickValues={drop(tickValues)}
                        stroke={theme.colors.gray[3]}
                    />

                    {/* https://airbnb.io/visx/docs/drag#Drag */}
                    {/* https://airbnb.io/visx/drag-i */}
                    {draggingItems.map((d, i) => (
                        <Drag
                            key={`drag-${yAccessor(d)}`}
                            width={dimensions.width}
                            height={dimensions.height}
                            onDragStart={() => {
                                hide();
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
                                <g
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
                                    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointer-events
                                    // https://stackoverflow.com/a/49739738
                                    // https://www.smashingmagazine.com/2018/05/svg-interaction-pointer-events-property/</Drag>
                                    // It works on Google Chrome.
                                    pointerEvents="bounding-box"
                                    id={`${yAccessor(d)}@${xTooltipFormatter(xAccessor(d))}`} // "Data-driven ID"
                                    className={classes.outline}
                                    onMouseEnter={() => {
                                        if (isNull(initialPositionOnScale)) {
                                            setCurrentTool(d);
                                            show();
                                        }
                                    }}
                                    onMouseLeave={hide}
                                >
                                    {/* Labels */}
                                    {/* https://developer.mozilla.org/en-US/docs/Web/CSS/user-select */}
                                    {/* https://github.com/airbnb/visx/blob/v2.5.0/packages/visx-axis/src/axis/AxisLeft.tsx */}
                                    <text
                                        {...tickLabelLeftProps}
                                        style={{ userSelect: 'none' }}
                                        textAnchor="end"
                                        dy={defaultBarHeight / 2}
                                        // dy={yScale.bandwidth() / 2}
                                        textDecoration={
                                            includes(highlightTools, yAccessor(d))
                                                ? 'underline'
                                                : 'unset'
                                        }
                                        opacity={0}
                                        // opacity={1}
                                    >
                                        {yAxisLabels[yAccessor(d)]}
                                        <animate
                                            id={`text${i}`}
                                            attributeName="opacity"
                                            from="0"
                                            to="1"
                                            dur="0.8s"
                                            fill="freeze"
                                            begin={i > 0 ? `text${i - 1}.begin + 0.1s` : '0s'}
                                        />
                                    </text>

                                    {/* Bars */}
                                    <rect
                                        key={`bar-${yAccessor(d)}`}
                                        // width={xAccessorScaled(d)}
                                        // https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
                                        height={yScale.bandwidth()}
                                        x={dimensions.marginLeft}
                                        // x={0}
                                        // y={yAccessorScaled(d)}
                                        // https://mantine.dev/theming/extend-theme/
                                        fill={
                                            includes(highlightTools, yAccessor(d))
                                                ? theme.black
                                                : theme.colors.gray[8]
                                        }
                                        // transform={getBarTransform(
                                        //     isDragging,
                                        //     dx,
                                        //     dy,
                                        //     yAccessorScaled(d),
                                        //     initialPositionOnScale
                                        // )}
                                        // onMouseMove={dragMove}
                                        // onMouseUp={dragEnd}
                                        // onMouseDown={dragStart}
                                        // onTouchStart={dragStart}
                                        // onTouchMove={dragMove}
                                        // onTouchEnd={dragEnd}
                                        // cursor={isDragging ? 'grabbing' : 'grab'}
                                    >
                                        {/* https://www.d3-graph-gallery.com/graph/barplot_animation_start.html */}
                                        {/* https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate */}
                                        {/* https://github.com/d3/d3-transition */}
                                        <animate
                                            id={`rect${i}`}
                                            attributeName="width"
                                            from="0"
                                            to={xAccessorScaled(d)}
                                            dur="0.8s"
                                            // dur="20s"
                                            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill
                                            fill="freeze"
                                            begin={i > 0 ? `rect${i - 1}.begin + 0.1s` : '0s'}
                                        />
                                    </rect>
                                </g>
                            )}
                        </Drag>
                    ))}
                </Group>
            </svg>

            {/* Tooltip */}
            <Tippy
                content={currentTool && getTooltipContent(currentTool, yAxisLabels)}
                visible={visible}
                // visible={true}
                reference={svgEl}
                placement="right-start"
                // https://popper.js.org/docs/v2/modifiers/offset/
                offset={[
                    yScale.bandwidth() / 2 +
                        dimensions.marginTop / 2 +
                        (currentTool ? yAccessorScaled(currentTool) : 0) -
                        1 / 2,
                    -dimensions.boundedWidth + (currentTool ? xAccessorScaled(currentTool) : 0)
                ]}
                arrow={true}
                allowHTML={false}
                // https://popper.js.org/docs/v2/modifiers/arrow/#padding
                popperOptions={{
                    modifiers: [
                        {
                            name: 'arrow',
                            options: {
                                padding: ({ popper }) => popper.height / 4 - 1 / 2
                            }
                        }
                    ]
                }}
                theme={
                    currentTool && includes(highlightTools, yAccessor(currentTool))
                        ? 'mantine-black'
                        : 'mantine-gray'
                }
                maxWidth="none"
            />
        </>
    );
}

BarChart.propTypes = {
    userOptions: PropTypes.exact({
        firstTool: PropTypes.string,
        secondTool: PropTypes.string,
        thirdTool: PropTypes.string,
        firstToolPercentage: PropTypes.number,
        secondToolPercentage: PropTypes.number,
        thirdToolPercentage: PropTypes.number
    }).isRequired,
    width: PropTypes.number.isRequired
};

export default BarChart;
