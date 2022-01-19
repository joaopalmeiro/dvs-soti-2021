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
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './main.css';
import metadata from './tools_metadata.json';

// Source:
// - https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/index.scss
// - https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/App.tsx
// - https://kbar.vercel.app/
// - https://piccalil.li/blog/a-modern-css-reset/
const searchStyle = {
    padding: '12px 16px',
    fontSize: '16px',
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
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)'
};

const groupNameStyle = {
    padding: '8px 16px',
    fontSize: '10px',
    textTransform: 'uppercase',
    opacity: 0.5
};

const metadataActions = toPairs(metadata)
    .filter((d) => d[1].website)
    .map((d) => ({
        id: `${camelCase(d[0])}Action`,
        name: d[0],
        section: 'Digital Tools',
        perform: () => window.open(d[1].website, '_blank')
    }));

const actions = [
    {
        id: 'dataVisualizationSocietyAction',
        name: 'Data Visualization Society',
        shortcut: ['d'],
        section: 'Navigation',
        perform: () => window.open('https://www.datavisualizationsociety.org/', '_blank'),
        icon: <CircleWavy size={24} />
    },
    {
        id: 'gitHubAction',
        name: 'GitHub',
        subtitle: 'Repo',
        shortcut: ['g'],
        section: 'Navigation',
        perform: () => window.open('https://github.com/joaopalmeiro/dvs-soti-2021', '_blank'),
        icon: <GithubLogo size={24} />
    },
    {
        id: 'twitterAction',
        name: 'Twitter',
        shortcut: ['t'],
        section: 'Navigation',
        perform: () => window.open('https://twitter.com/joaompalmeiro', '_blank'),
        // https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/App.tsx#L275
        icon: <TwitterLogo size={24} />
    },
    ...metadataActions
];

function RenderResults() {
    const { results } = useMatches();
    const theme = useMantineTheme();

    // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/example/src/index.scss#L52
    // const lineHeight = 1.6;

    // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/KBarResults.tsx
    // https://react-virtual.tanstack.com/
    return (
        <KBarResults
            items={results}
            // https://github.com/timc1/kbar/blob/v0.1.0-beta.27/src/KBarResults.tsx#L131
            // maxHeight="400px"
            onRender={({ item, active }) =>
                // For the `section` title.
                typeof item === 'string' ? (
                    <div
                        style={{
                            ...groupNameStyle,
                            fontFamily: theme.fontFamily,
                            lineHeight: theme.lineHeight
                        }}
                    >
                        {item}
                    </div>
                ) : (
                    <div
                        style={{
                            padding: '12px 16px',
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
                                gap: '8px',
                                alignItems: 'center',
                                fontSize: 14
                            }}
                        >
                            {item.icon && item.icon}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{item.name}</span>
                                {item.subtitle && (
                                    <span style={{ fontSize: 12 }}>{item.subtitle}</span>
                                )}
                            </div>
                        </div>
                        {item.shortcut && (
                            <div
                                aria-hidden
                                style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}
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
                        zIndex: 9999 // "It's Over 9000!"
                    }}
                >
                    <KBarAnimator style={animatorStyle}>
                        {/* https://github.com/timc1/kbar/blob/v0.1.0-beta.26/src/KBarSearch.tsx */}
                        {/* https://github.com/timc1/kbar/blob/v0.1.0-beta.26/src/useMatches.tsx */}
                        {/* https://www.npmjs.com/package/match-sorter */}
                        <KBarSearch
                            style={{
                                ...searchStyle,
                                fontFamily: theme.fontFamily,
                                lineHeight: theme.lineHeight
                            }}
                            // defaultPlaceholder="Type a hyperlink command or search…"
                            placeholder="Type a hyperlink command or search…"
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
