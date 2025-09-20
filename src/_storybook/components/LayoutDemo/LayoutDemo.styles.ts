import { css } from 'lit';
import { getThemeVar } from '@telesign/colibri';

export const LayoutDemoStyles = css`
  :host {
    display: flex;
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${getThemeVar('typography.font-family.primary')};
    color: ${getThemeVar('colors.text.default')};
    font-weight: 400;
  }

  h3 {
    font-size: ${getThemeVar('typography.text.heading.regular-3xl')};
    line-height: 40px;
  }

  .layout-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
  }

  .page-title {
    margin: 0;
    color: ${getThemeVar('colors.text.default')};
  }

  .page-content {
    text-align: center;
  }

  .content-area {
    flex-grow: 1;
    min-height: 200px;
  }

  .content-area--placeholder {
    background-color: #f6f6f8;
    border: 2px dashed #e7e8eb;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-style: italic;
  }

  .content-area--custom {
    background: transparent;
    border: none;
    padding: 0;
  }
`;
