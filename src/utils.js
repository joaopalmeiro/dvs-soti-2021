// Source: Fullstack D3 and Data Visualization by Amelia Wattenberger (https://wattenberger.com/)
export const combineChartDimensions = (dimensions) => {
    const parsedDimensions = {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        ...dimensions
    };

    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
            parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom,
            0
        ),
        boundedWidth: Math.max(
            parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight,
            0
        )
    };
};
