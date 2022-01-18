import { useMantineTheme, Kbd } from '@mantine/core';
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
import { TwitterLogo } from 'phosphor-react';
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
        section: 'Tools',
        perform: () => window.open(d[1].website, '_blank')
    }));

const actions = [
    {
        id: 'twitterAction',
        name: 'Twitter',
        shortcut: ['t'],
        section: 'Navigation',
        perform: () => window.open('https://twitter.com/timcchang', '_blank'),
        // https://github.com/timc1/kbar/blob/v0.1.0-beta.26/example/src/App.tsx#L275
        icon: <TwitterLogo size={24} />
    },
    ...metadataActions
];

function RenderResults() {
    const { results } = useMatches();
    const theme = useMantineTheme();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
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
                                <div>
                                    <span>{item.name}</span>
                                </div>
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
                        <KBarSearch
                            style={{
                                ...searchStyle,
                                fontFamily: theme.fontFamily,
                                lineHeight: theme.lineHeight
                            }}
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
