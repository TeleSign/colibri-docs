# Colibri Documentation System

The Colibri Documentation System is built using Storybook, providing an interactive environment for documenting components, design guidelines, and usage patterns.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Documentation Structure](#documentation-structure)
- [Writing Documentation](#writing-documentation)
- [Development](#development)
- [Customization](#customization)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## Overview

### Key Features

- Interactive component playground
- Web Components support
- Accessibility testing
- Responsive preview
- Theme switching
- Code snippets
- Framework integration guides

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build documentation
npm run build
```

### Environment Setup

The documentation system requires:

- Node.js (latest LTS)
- npm or yarn
- Modern browser for development

### Component Registration

All web components must be registered in `.storybook/preview.ts` before they can be used in stories:

```typescript
// .storybook/preview.ts
import { registerColibriComponents, registerAllComponents } from '@telesign/colibri';
import { ColIcon } from '@telesign/colibri-icons';

// Register all components from @telesign/colibri
registerAllComponents();

// Register external components like icons separately
registerColibriComponents([ColIcon]);
```

This ensures components are available globally across all stories. Never register components in individual story files.

## Documentation Structure

```
colibri-docs/
├── src/
│   ├── assets/          # Static assets
│   ├── constants/       # Shared constants
│   ├── styles/          # Global styles
│   └── stories/         # Component documentation
│       └── components/  # Component stories
└── .storybook/         # Storybook configuration
    ├── preview.ts      # Global configuration and component registration
    └── main.ts         # Storybook configuration
```

## Writing Documentation

### Story File Organization

All story files should follow this standard organization:

#### 1. Imports

- External dependencies first
- Local imports second

#### 2. Interfaces/Types

- Story-specific type definitions
- Props interfaces

#### 3. Story Metadata (default export)

- Component documentation
- Props configuration (argTypes)
- Default args
- Parameters (including `__sb` for layout)

#### 4. Styles

- Story-specific styles using lit's css
- Placed before stories for context

#### 5. Stories

- Individual story implementations
- Story-specific documentation

For a complete example of this organization, see [ColIcon.stories.tsx](src/stories/components/ColIcon.stories.tsx). This story demonstrates:

- Proper file structure
- Component documentation
- Props configuration
- Layout customization
- Multiple story variants
- Styled components

### Component Usage Example

After registering a component in `preview.ts`, you can use it in your stories:

```typescript
// ComponentName.stories.ts
export const Default = () => html`
  <col-icon name="home" size="24px" color="currentColor"></col-icon>
`;
```

### Source Code Customization

Control how source code appears in your documentation with these options:

#### Excluding Decorators

To exclude decorators and show only the component code:

```typescript
parameters: {
  docs: {
    source: {
      excludeDecorators: true;
    }
  }
}
```

#### Transforming Source Code

To remove specific elements (like `<style>` tags) from the displayed source code:

```typescript
parameters: {
  docs: {
    source: {
      transform: (code: string): string => {
        // Remove style tags and their content
        return code.replace(/<style>[\s\S]*?<\/style>\s*/, '');
      };
    }
  }
}
```

#### Disabling Source Code Display

To hide the source code for specific stories:

```typescript
parameters: {
  docs: {
    source: {
      code: null; // Disables the "Show code" option
    }
  }
}
```

For a complete example of source code customization, see [ColIcon.stories.tsx](src/stories/components/ColIcon.stories.tsx).

### Layout Configuration

Stories can be configured with custom layouts using the `__sb` parameter:

```typescript
parameters: {
  __sb: {
    display: 'grid' | 'flex',
    gridTemplateColumns?: string,
    gap?: string,
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  }
}
```

### Story Naming Convention

- Files should be placed in the `stories/components` directory
- File name should be `ComponentName.stories.ts`
- Story title should follow `Category/ComponentName` format

Available `Category` values:

- `Atoms`
- `Molecules`
- `Organisms`
- `Tokens`

### Example Story Component

A story file for a molecule component is available for reference at [ExampleTextField.stories.tsx](src/stories/components/ExampleTextField.stories.ts?at=refs%2Fheads%2Fshowcase%2Fstorybook-examples).

This file demonstrates:

- Usage of a molecule component (with slots and nested elements)
- Custom tokens usage for styling (e.g. colors.border.default)
- A custom transform function to clean up displayed source code
- Story structure and props setup following best practices

## Development

### Available Scripts

```json
{
  "dev": "storybook dev -p 6006",
  "build": "storybook build"
}
```

### Storybook Addons

Installed addons include:

- @storybook/addon-essentials
- @storybook/addon-a11y
- @storybook/addon-links

## Customization

### Story Organization

Stories are organized in a specific order:

1. Welcome
2. Atoms
3. Molecules
4. Organisms
5. Tokens

This ordering is configured in the preview configuration:

```typescript
options: {
  storySort: {
    order: ['Welcome', 'Atoms', 'Molecules', 'Organisms', 'Tokens'],
  }
}
```

### Theme Customization

The system supports theme switching through the `data-theme` attribute:

```typescript
decorators: [
  (story, context) => html` <div data-theme=${context.args.mode || 'default'}>${story()}</div> `,
];
```

## Best Practices

### Documentation Guidelines

1. Component Documentation

- Overview
- Props/API
- Examples
- Best practices
- Accessibility considerations

2. Code Examples

- Basic usage
- Common patterns
- Edge cases

3. Writing Style

- Clear and concise
- Consistent terminology
- Progressive disclosure
- Include visual examples

### Accessibility

1. Testing

- Use a11y addon
- Test with screen readers
- Keyboard navigation
- Color contrast

2. Documentation

- ARIA roles
- Keyboard interactions
- Screen reader behavior

## Contributing

### Documentation Updates

1. Fork the repository
2. Create feature branch
3. Make changes following the story organization guidelines
4. Submit pull request

### Review Process

1. Documentation review
2. Technical review
3. Accessibility review
4. Final approval

### Style Guide

1. File Organization

- Follow standard story file structure
- Use consistent naming
- Maintain clear hierarchy

2. Code Examples

- Follow style guide
- Include comments
- Show best practices

## Next Steps

After setup:

1. Review existing documentation
2. Identify gaps
3. Plan documentation structure
4. Create contribution guidelines
5. Set up automated deployment
