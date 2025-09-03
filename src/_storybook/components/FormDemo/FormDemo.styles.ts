import { css } from 'lit';
import { getThemeVar } from '@telesign/colibri';

export const FormDemoStyles = css`
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
