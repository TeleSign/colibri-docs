/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MouseEvent, ReactNode } from 'react';
import React, { useEffect, useState, useCallback } from 'react';
import { navigate } from '@storybook/addon-links';
import { toId } from '@storybook/csf';

const LEFT_BUTTON = 0;

const isPlainLeftClick = (e: MouseEvent<HTMLAnchorElement>) =>
  e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;

const cancelled = (e: MouseEvent<HTMLAnchorElement>, cb = (_e: any) => {}) => {
  if (isPlainLeftClick(e)) {
    e.preventDefault();
    cb(e);
  }
};

interface DocsLinkToProps {
  title: string;
  children: ReactNode;
  [key: string]: any;
}

/**
 * A React component for creating dynamic navigation links to Storybook docs pages
 *
 * This component generates links to documentation pages based on story titles,
 * ensuring links remain valid even when story titles change. It uses Storybook's
 * internal navigation system for smooth client-side transitions.
 *
 * Note: This is a React-based documentation component, not a Lit-based Colibri web component.
 * Can be used in: MDX files only (not compatible with TSX files configured for Lit template rendering)
 *
 * @example
 * ```mdx
 * import { DocsLinkTo } from '@/_storybook/components';
 * import * as ComponentStories from './component.stories';
 *
 * <DocsLinkTo title="Foundation/Colors">See Colors Documentation</DocsLinkTo>
 *
 * <DocsLinkTo title={ComponentStories.default.title}>Component Docs</DocsLinkTo>
 *
 * <DocsLinkTo title="Components/Button" className="custom-link">
 *   Button Documentation
 * </DocsLinkTo>
 * ```
 */
export const DocsLinkTo: React.FC<DocsLinkToProps> = ({ title, children, ...rest }) => {
  const [href, setHref] = useState('/');

  const updateHref = useCallback(async () => {
    const id = toId(title);
    const path = `/docs/${id}`;
    const sbPath = window.location.pathname.replace(/iframe\.html$/, '');
    const url = `${window.location.origin}${sbPath}?path=${path}`;
    setHref(url);
  }, [title]);

  useEffect(() => {
    updateHref();
  }, [updateHref]);

  const handleClick = () => {
    const id = toId(title);
    navigate({ storyId: id });
  };

  return (
    <a href={href} onClick={e => cancelled(e, handleClick)} {...rest}>
      {children}
    </a>
  );
};
