import { css } from 'lit';

export const MainLogoStyles = css`
  :host {
    display: inline-block;
    line-height: 0;
  }

  .logo-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-container svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* Default brand colors for each logo */
  .telesign-logo path {
    fill: var(--logo-telesign-color, #011ac2);
  }

  .massive-logo path {
    fill: var(--logo-massive-color, #1c85e8);
  }

  .bics-logo path {
    fill: var(--logo-bics-color, #2c3f46);
  }

  /* Site menu color variants override brand colors */
  :host([color='primary']) .logo-container svg path {
    fill: var(--logo-primary-color, #ffffff) !important;
  }

  :host([color='dark']) .logo-container svg path {
    fill: var(--logo-dark-color, #ffffff) !important;
  }

  :host([color='light']) .logo-container svg path {
    fill: var(--logo-light-color, #1a1a1a) !important;
  }

  /* Theme-specific colors - set via JavaScript */
  :host([data-current-theme='telesign']) {
    --logo-telesign-color: #011ac2;
    --logo-primary-color: #ffffff; /* To be updated to the #011ac2 once UX/UI team fixes the tokens issue */
    --logo-dark-color: #ffffff;
    --logo-light-color: #011ac2;
  }

  :host([data-current-theme='massive']) {
    --logo-massive-color: #ffffff;
    --logo-primary-color: #ffffff;
    --logo-dark-color: #ffffff;
    --logo-light-color: #1c85e8;
  }

  :host([data-current-theme='bics']) {
    --logo-bics-color: #2c3f46;
    --logo-primary-color: #ffffff;
    --logo-dark-color: #ffffff;
    --logo-light-color: #2c3f46;
  }

  :host([style*='--custom-color']) .logo-container svg path {
    fill: var(--custom-color) !important;
  }
`;
