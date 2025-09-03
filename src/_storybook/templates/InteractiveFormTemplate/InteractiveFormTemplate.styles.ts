import { css } from 'lit';
import 'highlight.js/styles/atom-one-dark.css';
import { getThemeVar } from '@telesign/colibri';

export const InteractiveFormTemplateStyles = css`
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

  .storybook-card {
    background: #f5f6fa;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(16, 30, 54, 0.04);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .storybook-flex {
    display: flex;
    gap: 2rem;
  }

  .storybook-col {
    flex: 1 1 0;
  }

  .storybook-code {
    background: #0e0e2c;
    color: #fff;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
    font-size: 0.95rem;
    font-weight: 400;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    overflow-x: auto;
  }

  .storybook-code.light {
    background: #23272f;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-output {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow-x: auto;
  }

  @media (max-width: 900px) {
    .storybook-flex {
      flex-direction: column;
      gap: 1.5rem;
    }
    .storybook-card {
      padding: 1rem;
    }
  }
`;
