// Source: Fullstack D3 and Data Visualization by Amelia Wattenberger (https://wattenberger.com/)
export const combineChartDimensions = (dimensions) => {
    // Amelia's default values.
    // const parsedDimensions = {
    //     marginTop: 40,
    //     marginRight: 30,
    //     marginBottom: 40,
    //     marginLeft: 75,
    //     ...dimensions
    // };
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

// Source:
// - https://www.paulirish.com/2009/random-hex-color-code-snippets/ by Paul Irish
// - https://syntax.fm/show/419/js-one-liners
export const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
