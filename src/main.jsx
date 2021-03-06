import { Kbd, useMantineTheme } from '@mantine/core';
import {
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarResults,
    KBarSearch,
    useMatches
} from 'kbar';
import { camelCase, toPairs } from 'lodash';
import { CircleWavy, GithubLogo, TwitterLogo } from 'phosphor-react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './main.css';
import metadata from './tools_metadata.json';
import { naturalSortObject } from './utils';

// Source:
// - https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/index.scss
// - https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/App.tsx
// - https://kbar.vercel.app/
const searchStyle = {
    // padding: '12px 16px',
    width: '100%',
    outline: 'none',
    border: 'none',
    background: 'var(--background)',
    color: 'var(--foreground)'
};

const animatorStyle = {
    maxWidth: '600px',
    width: '100%',
    background: 'var(--background)',
    color: 'var(--foreground)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)'
};

const groupNameStyle = {
    fontSize: '10px',
    textTransform: 'uppercase',
    opacity: 0.5
};

const sections = ['Navigation', 'Digital Tools'];

const metadataActions = toPairs(naturalSortObject(metadata))
    .filter((d) => d[1].website)
    .map((d) => ({
        id: `${camelCase(d[0])}Action`,
        name: d[0],
        section: sections[1],
        perform: () => window.open(d[1].website, '_blank')
    }));

// https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/action/ActionImpl.ts#L19
// Alternative: https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/utils.ts#L54
const actions = [
    {
        id: 'dataVisualizationSocietyAction',
        name: 'Data Visualization Society',
        // shortcut: ['d'],
        shortcut: ['D'],
        section: sections[0],
        perform: () => window.open('https://www.datavisualizationsociety.org/', '_blank'),
        icon: <CircleWavy size={24} />
    },
    {
        id: 'gitHubAction',
        name: 'GitHub',
        subtitle: 'Repo',
        shortcut: ['G'],
        section: sections[0],
        perform: () => window.open('https://github.com/joaopalmeiro/dvs-soti-2021', '_blank'),
        icon: <GithubLogo size={24} />
    },
    {
        id: 'twitterAction',
        name: 'Twitter',
        shortcut: ['T'],
        section: sections[0],
        perform: () => window.open('https://twitter.com/joaompalmeiro', '_blank'),
        // https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/App.tsx#L275
        icon: <TwitterLogo size={24} />
    },
    ...metadataActions
];

function RenderResults() {
    const { results } = useMatches();
    const theme = useMantineTheme();
    // console.log(theme);

    // Workaround (part I)
    // When searching with a certain letter, for example `t` or `a` (vs. `v` or `s`), the number
    // of results corresponds to the number of original items. Some options appear badly
    // positioned until some scroll happens, for example, adopting the expected positions
    // then (something that happens again if we clear the previous search). Therefore,
    // this workaround only re-renders the list of items if it is different from the
    // original, regardless of the order.
    const [firstResults] = useState(results);

    // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/example/src/index.scss#L52
    // const lineHeight = 1.6;

    // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/KBarResults.tsx
    // https://react-virtual.tanstack.com/
    return (
        <KBarResults
            // https://github.com/kentcdodds/match-sorter/issues/39
            // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/useMatches.tsx#L95
            // Workaround (part II)
            // items={results}
            items={results.length === actions.length + sections.length ? firstResults : results}
            // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/KBarResults.tsx#L131
            // maxHeight="400px"
            onRender={({ item, active }) =>
                // For the `section` title.
                typeof item === 'string' ? (
                    <div
                        style={{
                            ...groupNameStyle,
                            padding: `${theme.spacing.md / 2}px ${theme.spacing.md}px`,
                            fontFamily: theme.fontFamily,
                            lineHeight: theme.lineHeight
                        }}
                    >
                        {item}
                    </div>
                ) : (
                    <div
                        style={{
                            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
                            background: active ? 'var(--a1)' : 'transparent',
                            borderLeft: `2px solid ${active ? 'var(--foreground)' : 'transparent'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            fontFamily: theme.fontFamily,
                            lineHeight: theme.lineHeight
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: `${theme.spacing.md / 2}px`,
                                alignItems: 'center',
                                fontSize: theme.fontSizes.sm
                            }}
                        >
                            {item.icon && item.icon}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{item.name}</span>
                                {item.subtitle && (
                                    <span style={{ fontSize: theme.fontSizes.xs }}>
                                        {item.subtitle}
                                    </span>
                                )}
                            </div>
                        </div>
                        {item.shortcut && (
                            <div
                                aria-hidden
                                style={{
                                    display: 'grid',
                                    gridAutoFlow: 'column',
                                    gap: `${theme.spacing.md / 4}px`
                                }}
                            >
                                {item.shortcut.map((sc) => (
                                    <Kbd key={sc}>{sc}</Kbd>
                                ))}
                            </div>
                        )}
                    </div>
                )
            }
        />
    );
}

function MainApp() {
    const theme = useMantineTheme();
    // console.log(theme);

    return (
        // https://kbar.vercel.app/docs/getting-started
        // https://reach.tech/portal/
        // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/types.ts
        <KBarProvider actions={actions}>
            <KBarPortal>
                {/* https://github.com/timc1/kbar/blob/v0.1.0-beta.26/src/KBarPositioner.tsx */}
                <KBarPositioner
                    style={{
                        // https://css-tricks.com/handling-z-index
                        // https://css-tricks.com/systems-for-z-index/
                        // https://atomiks.github.io/tippyjs/v6/all-props/#zindex
                        zIndex: 9999 // "It's Over 9000!"
                    }}
                >
                    <KBarAnimator
                        style={{ ...animatorStyle, borderRadius: `${theme.radius.md}px` }}
                    >
                        {/* https://github.com/timc1/kbar/blob/v0.1.0-beta.26/src/KBarSearch.tsx */}
                        {/* https://github.com/timc1/kbar/blob/v0.1.0-beta.26/src/useMatches.tsx */}
                        {/* https://www.npmjs.com/package/match-sorter */}
                        <KBarSearch
                            style={{
                                ...searchStyle,
                                padding: `${theme.spacing.md}px`,
                                fontSize: `${theme.fontSizes.md}px`,
                                fontFamily: theme.fontFamily,
                                lineHeight: theme.lineHeight
                            }}
                            // defaultPlaceholder="Type a hyperlink command or search???"
                            placeholder="Type a hyperlink command or search???"
                        />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            <App />
        </KBarProvider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <MainApp />
    </React.StrictMode>,
    document.getElementById('root')
);
