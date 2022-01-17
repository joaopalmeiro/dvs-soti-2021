import { getStringWidth } from '@visx/text';

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
export const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

// Source:
// - https://github.com/airbnb/visx/blob/v2.5.0/packages/visx-text/src/util/getStringWidth.ts
const MEASUREMENT_ELEMENT_ID = '__react_canvas_measurement_id';

export const getFontStyleHeight = (text, style) => {
    try {
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
        let canvasEl = document.getElementById(MEASUREMENT_ELEMENT_ID);

        if (!canvasEl) {
            canvasEl = document.createElement('canvas');

            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
            canvasEl.hidden = true;
            canvasEl.setAttribute('id', MEASUREMENT_ELEMENT_ID);

            document.body.appendChild(canvasEl);
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
        const ctx = canvasEl.getContext('2d');

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
        // https://developer.mozilla.org/en-US/docs/Web/CSS/font
        ctx.font = style;

        const textMetrics = ctx.measureText(text);
        // console.log(textMetrics);

        // It works on Google Chrome.
        // const fontHeight = textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;

        // It works on Google Chrome and Firefox.
        const actualHeight =
            textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

        return actualHeight;
    } catch (e) {
        return null;
    }
};

export const truncateLabel = (label, props, maxWidth) => {
    // https://github.com/d-e-v-s-k/cuttr-js#options
    // https://stackoverflow.com/a/27723738
    const ending = '...';

    let baseStringWidth = getStringWidth(label, props);
    let newLabel = label;

    while (baseStringWidth > maxWidth) {
        newLabel = newLabel.slice(0, -1);
        baseStringWidth = getStringWidth(`${newLabel}${ending}`, props);
    }

    return label === newLabel ? label : `${newLabel}${ending}`;
};
