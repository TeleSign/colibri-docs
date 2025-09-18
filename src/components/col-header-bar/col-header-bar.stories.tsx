import { html } from 'lit';
import type { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {};

const meta = {
  title: 'Patterns/Header Bar',
  parameters: {
    backgrounds: {
      default: 'Light',
    },
    docs: {
      story: {
        // Render inside an iframe for proper layout
        inline: false,
        height: '400px',
      },
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * All Functions Header Bar composition with title, status, quick filters, filter drawer, and primary action.
 */
export const AllFunctionsHeader: Story = {
  name: 'All Functions Header Bar',
  render: () => html`
    <!-- Top-level form owner for toolbar and drawer inputs -->
    <col-toolbar id="header" gap="small" aria-label="Header Bar" wrap>
      <!-- Left side content, Heading element with Icon or Status -->
      <div style="display: flex; align-items: center; gap: 4px">
        <col-icon name="edit" size="24"></col-icon>
        <col-typography variant="heading">This is a heading’s page</col-typography>
      </div>
      <col-spacer></col-spacer>
      <!-- When we want Filter Bar behavior, we need to capture the inputs -->
      <form id="header-form"></form>
      <!-- Filter bar with quick filters, advanced filters trigger, and primary actions -->
      <col-toolbar id="toolbar" align="right" gap="small" wrap aria-label="Filter Bar">
        <!-- Quick filters (form-associated via form attribute) -->
        <col-select
          id="organization"
          name="organization"
          sub-label="Organization"
          placeholder="Choose one"
          form="header-form"
          custom-width="200px"
        >
          <col-list-menu>
            <col-list-menu-item value="suborg1">Organization - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Organization - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Organization - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <!-- Advanced filters trigger with active count badge -->
        <col-button id="filter-button" aria-label="Open filters" onclick="openDrawer()">
          <col-icon name="filter" size="16"></col-icon>
          <col-badge id="filter-counter" aria-label="Active filters count">0</col-badge>
        </col-button>

        <!-- Primary actions -->
        <col-button id="search-button" type="submit" form="header-form" color="primary"
          >Search</col-button
        >
      </col-toolbar>
      <col-divider orientation="vertical" style="height: 20px"></col-divider>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 124px;
          height: 32px;
          border: 1px dashed var(--col-colors-stroke-default-light);
          background-color: var(--col-colors-ui-disabled);
        "
      >
        Slot
      </div>
    </col-toolbar>

    <!-- Advanced filters drawer -->
    <col-drawer id="filter-drawer" aria-label="Advanced Filters Drawer">
      <col-modal-header slot="header" title="Advanced Filters"></col-modal-header>
      <div id="drawer-content" style="display: flex; flex-direction: column; gap: 12px">
        <col-text-field
          id="transaction-name"
          name="transactionName"
          form="header-form"
          label="Transaction Name"
          input-type="text"
          variant="outline"
          placeholder="Enter partial name here..."
          validation-timing="blur"
          custom-width="100%"
        >
        </col-text-field>

        <col-select
          id="status"
          name="status"
          form="header-form"
          label="Status"
          placeholder="Choose a status"
          custom-width="100%"
        >
          <col-list-menu>
            <col-list-menu-item value="active">Active</col-list-menu-item>
            <col-list-menu-item value="inactive">Inactive</col-list-menu-item>
            <col-list-menu-item value="pending">Pending</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-number-field
          id="amount"
          name="amount"
          form="header-form"
          label="Transaction cost"
          placeholder="Enter amount..."
          display-type="placeholder"
          helper-text="In USD"
          precision="2"
          custom-width="100%"
        ></col-number-field>
      </div>
      <col-modal-footer slot="footer">
        <col-button
          id="drawer-cancel"
          slot="actions"
          variant="outlined"
          onclick="closeAndClearDrawer()"
          >Cancel</col-button
        >
        <col-button id="drawer-apply" slot="actions" color="primary" onclick="closeDrawer()"
          >Apply</col-button
        >
      </col-modal-footer>
    </col-drawer>

    <script>
      // Handle Form logic
      const form = document.getElementById('header-form');
      const toolbarElements = document
        .querySelector('#toolbar')
        .querySelectorAll('col-search-bar, col-select');
      const drawerElements = document
        .querySelector('#drawer-content')
        .querySelectorAll('col-text-field, col-select, col-number-field');

      const updateBadge = () => {
        let total = 0;
        toolbarElements.forEach(el => {
          if (el && typeof el.value !== 'undefined' && String(el.value || '').trim()) total += 1;
        });
        drawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined' && String(el.value || '').trim()) total += 1;
        });
        const filterCounter = document.querySelector('#filter-counter');
        if (filterCounter) filterCounter.textContent = String(total);
      };

      // Add event listeners to update badge on input changes
      [...toolbarElements, ...drawerElements].forEach(el => {
        el?.addEventListener('change', updateBadge);
        el?.addEventListener('input', updateBadge);
      });

      // Functions
      const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData(form);
        const filters = Object.fromEntries(formData.entries());
        console.log('[HeaderBar] Search with filters:', filters);
      };

      const clearForm = () => {
        toolbarElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        drawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        updateBadge();
      };

      const onReset = event => {
        event.preventDefault();
        form.reset();
        clearForm();
      };

      form.addEventListener('submit', onSubmit);
      form.addEventListener('reset', onReset);

      // Handle Drawer open/close logic
      const drawer = document.querySelector('#filter-drawer');
      const openDrawer = () => (drawer.active = true);
      const closeDrawer = () => (drawer.active = false);
      const closeAndClearDrawer = () => {
        drawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        updateBadge();
        closeDrawer();
      };
      drawer.addEventListener('overlay-click-outside', closeAndClearDrawer);
      drawer.addEventListener('on-close', closeAndClearDrawer);

      // Initialize
      updateBadge();
    </script>
  `,
};

/**
 * Quick Filters Only Header Bar composition with title and quick filters.
 */
export const QuickFiltersOnly: Story = {
  name: 'Quick Filters Only Header Bar',
  render: () => html`
    <!-- Top-level form owner for toolbar and drawer inputs -->
    <col-toolbar id="header" gap="small" aria-label="Header Bar" wrap>
      <!-- Left side content, Heading element with Icon or Status -->
      <div style="display: flex; align-items: center; gap: 4px">
        <col-typography variant="heading">This is a heading’s page</col-typography>
      </div>
      <col-spacer></col-spacer>
      <!-- When we want Filter Bar behavior, we need to capture the inputs -->
      <form id="header-form"></form>
      <!-- Filter bar with quick filters, advanced filters trigger, and primary actions -->
      <col-toolbar id="toolbar" align="right" gap="small" wrap aria-label="Filter Bar">
        <!-- Quick filters (form-associated via form attribute) -->
        <col-select
          id="organization"
          name="organization"
          sub-label="Organization"
          placeholder="Choose one"
          custom-width="200px"
          form="header-form"
        >
          <col-list-menu>
            <col-list-menu-item value="suborg1">Organization - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Organization - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Organization - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-select
          id="date-range"
          name="dateRange"
          sub-label="Date Range"
          placeholder="Choose a date range"
          form="header-form"
        >
          <col-list-menu>
            <col-list-menu-item value="15d">Last 15 days</col-list-menu-item>
            <col-list-menu-item value="30d">Last 30 days</col-list-menu-item>
            <col-list-menu-item value="90d">Last 90 days</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <!-- Primary actions -->
        <col-button id="search-button" type="submit" form="header-form" color="primary"
          >Search</col-button
        >
      </col-toolbar>
    </col-toolbar>

    <script>
      // Handle Form logic
      const form = document.getElementById('header-form');
      const toolbarElements = document
        .querySelector('#toolbar')
        .querySelectorAll('col-search-bar, col-select');

      // Functions
      const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData(form);
        const filters = Object.fromEntries(formData.entries());
        console.log('[HeaderBar] Search with filters:', filters);
      };

      const clearForm = () => {
        toolbarElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
      };

      const onReset = event => {
        event.preventDefault();
        form.reset();
        clearForm();
      };

      form.addEventListener('submit', onSubmit);
      form.addEventListener('reset', onReset);
    </script>
  `,
};

/**
 * Advanced Filters Header Bar composition with title and advanced filters.
 */
export const AdvancedFiltersHeaderBar: Story = {
  name: 'Advanced Filters Header Bar',
  render: () => html`
    <!-- Top-level form owner for toolbar and drawer inputs -->
    <col-toolbar id="header" gap="small" aria-label="Header Bar" wrap>
      <!-- Left side content, Heading element with Icon or Status -->
      <div style="display: flex; align-items: center; gap: 4px">
        <col-typography variant="heading">This is a heading’s page</col-typography>
      </div>
      <col-spacer></col-spacer>
      <!-- When we want Filter Bar behavior, we need to capture the inputs -->
      <form id="header-form"></form>
      <!-- Filter bar with quick filters, advanced filters trigger, and primary actions -->
      <col-toolbar id="toolbar" align="right" gap="small" wrap aria-label="Filter Bar">
        <!-- Quick filters (form-associated via form attribute) -->
        <col-select
          id="organization"
          name="organization"
          sub-label="Organization"
          placeholder="Choose one"
          custom-width="200px"
          form="header-form"
        >
          <col-list-menu>
            <col-list-menu-item value="suborg1">Organization - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Organization - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Organization - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <!-- Advanced filters trigger with active count badge -->
        <col-button id="filter-button" aria-label="Open filters" onclick="openDrawer()">
          <col-icon name="filter" size="16"></col-icon>
          <col-badge id="filter-counter" aria-label="Active filters count">0</col-badge>
        </col-button>

        <!-- Primary actions -->
        <col-button id="search-button" type="submit" form="header-form" color="primary"
          >Search</col-button
        >
      </col-toolbar>
    </col-toolbar>

    <!-- Advanced filters drawer -->
    <col-drawer id="filter-drawer" aria-label="Advanced Filters Drawer">
      <col-modal-header slot="header" title="Advanced Filters"></col-modal-header>
      <div id="drawer-content" style="display: flex; flex-direction: column; gap: 12px">
        <col-text-field
          id="transaction-name"
          name="transactionName"
          form="header-form"
          label="Transaction Name"
          input-type="text"
          variant="outline"
          placeholder="Enter partial name here..."
          validation-timing="blur"
          custom-width="100%"
        >
        </col-text-field>

        <col-select
          id="status"
          name="status"
          form="header-form"
          label="Status"
          placeholder="Choose a status"
          custom-width="100%"
        >
          <col-list-menu>
            <col-list-menu-item value="active">Active</col-list-menu-item>
            <col-list-menu-item value="inactive">Inactive</col-list-menu-item>
            <col-list-menu-item value="pending">Pending</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-number-field
          id="amount"
          name="amount"
          form="header-form"
          label="Transaction cost"
          placeholder="Enter amount..."
          display-type="placeholder"
          helper-text="In USD"
          precision="2"
          custom-width="100%"
        ></col-number-field>
      </div>
      <col-modal-footer slot="footer">
        <col-button
          id="drawer-cancel"
          slot="actions"
          variant="outlined"
          onclick="closeAndClearDrawer()"
          >Cancel</col-button
        >
        <col-button id="drawer-apply" slot="actions" color="primary" onclick="closeDrawer()"
          >Apply</col-button
        >
      </col-modal-footer>
    </col-drawer>

    <script>
      // Handle Form logic
      const form = document.getElementById('header-form');
      const toolbarElements = document
        .querySelector('#toolbar')
        .querySelectorAll('col-search-bar, col-select');
      const drawerElements = document
        .querySelector('#drawer-content')
        .querySelectorAll('col-text-field, col-select, col-number-field');

      const updateBadge = () => {
        let total = 0;
        toolbarElements.forEach(el => {
          if (el && typeof el.value !== 'undefined' && String(el.value || '').trim()) total += 1;
        });
        drawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined' && String(el.value || '').trim()) total += 1;
        });
        const filterCounter = document.querySelector('#filter-counter');
        if (filterCounter) filterCounter.textContent = String(total);
      };

      // Add event listeners to update badge on input changes
      [...toolbarElements, ...drawerElements].forEach(el => {
        el?.addEventListener('change', updateBadge);
        el?.addEventListener('input', updateBadge);
      });

      // Functions
      const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData(form);
        const filters = Object.fromEntries(formData.entries());
        console.log('[HeaderBar] Search with filters:', filters);
      };

      const clearForm = () => {
        toolbarElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        drawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        updateBadge();
      };

      const onReset = event => {
        event.preventDefault();
        form.reset();
        clearForm();
      };

      form.addEventListener('submit', onSubmit);
      form.addEventListener('reset', onReset);

      // Handle Drawer open/close logic
      const drawer = document.querySelector('#filter-drawer');
      const openDrawer = () => (drawer.active = true);
      const closeDrawer = () => (drawer.active = false);
      const closeAndClearDrawer = () => {
        drawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        updateBadge();
        closeDrawer();
      };
      drawer.addEventListener('overlay-click-outside', closeAndClearDrawer);
      drawer.addEventListener('on-close', closeAndClearDrawer);

      // Initialize
      updateBadge();
    </script>
  `,
};

/**
 * Title and Slot Header Bar composition with title, and slot available for custom content, but no filtering.
 */
export const TitleAndSlotHeaderBar: Story = {
  name: 'Title and Slot Header Bar',
  render: () => html`
    <!-- Top-level form owner for toolbar and drawer inputs -->
    <col-toolbar id="header" gap="small" aria-label="Header Bar" wrap>
      <!-- Left side content, Heading element with Icon or Status -->
      <div style="display: flex; align-items: center; gap: 4px">
        <col-typography variant="heading">This is a heading’s page</col-typography>
      </div>
      <col-spacer></col-spacer>
      <div class="slot">Slot</div>
    </col-toolbar>
  `,
};
