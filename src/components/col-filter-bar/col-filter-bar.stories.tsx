import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {};

const meta = {
  title: 'Patterns/Filter Bar',
  parameters: {
    backgrounds: {
      default: 'Light',
    },
    docs: {
      story: {
        // Renders the story in an iframe within the docs
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
 * Basic Filter Bar pattern with search and quick filters.
 */
export const BasicFilterBar: Story = {
  name: 'Basic Filter Bar',
  render: () => {
    return html`
      <form id="basic-form"></form>
      <col-toolbar id="basic-search" align="space-between" gap="small" wrap>
        <col-search-bar
          id="demo-search-bar"
          name="query"
          variant="expanded"
          placeholder="Search…"
          form="basic-form"
        ></col-search-bar>
        <col-select
          id="sub-org-id"
          name="sub-org-id"
          sub-label="Account"
          placeholder="Choose an account"
          form="basic-form"
        >
          <col-list-menu>
            <col-list-menu-item value="suborg1">Account - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Account - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Account - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-select
          id="date"
          name="date"
          sub-label="Date Range"
          placeholder="Choose a date range"
          form="basic-form"
        >
          <col-list-menu>
            <col-list-menu-item value="date-range-15">15 days</col-list-menu-item>
            <col-list-menu-item value="date-range-30">30 days</col-list-menu-item>
            <col-list-menu-item value="date-range-90">90 days</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-spacer></col-spacer>
        <col-button color="primary" form="basic-form" type="submit">Search</col-button>
      </col-toolbar>
      <script>
        const basicForm = document.getElementById('basic-form');
        basicForm.addEventListener('submit', event => {
          event.preventDefault();
          const formData = new FormData(basicForm);
          const filters = Object.fromEntries(formData.entries());
          console.log('[Basic Search] Search with filters:', filters);
        });
      </script>
    `;
  },
};

export const FilterButton: Story = {
  name: 'Filter Button',
  render: () => html`
    <!-- Advanced filters trigger with active count badge -->
    <col-button id="example-filter-button" aria-label="Open filters" onclick="openExampleDrawer()">
      <col-icon name="filter" size="16"></col-icon>
      <col-badge id="example-filter-counter" aria-label="Active filters count">0</col-badge>
    </col-button>

    <!-- Advanced filters drawer -->
    <col-drawer id="example-filter-drawer" aria-label="Advanced Filters Drawer">
      <col-modal-header slot="header" title="Advanced Filters"></col-modal-header>
      <div id="example-drawer-content" style="display: flex; flex-direction: column; gap: 12px">
        <col-text-field
          id="example-transaction-name"
          name="transactionName"
          label="Transaction Name"
          input-type="text"
          variant="outline"
          placeholder="Enter partial name here..."
          validation-timing="blur"
          custom-width="100%"
        >
        </col-text-field>

        <col-select
          id="example-status"
          name="status"
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
          id="example-amount"
          name="amount"
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
          id="example-drawer-cancel"
          slot="actions"
          variant="outlined"
          onclick="closeAndClearExampleDrawer()"
          >Clear</col-button
        >
        <col-button
          id="example-drawer-apply"
          slot="actions"
          color="primary"
          onclick="closeExampleDrawer()"
          >Apply</col-button
        >
      </col-modal-footer>
    </col-drawer>

    <script>
      // Grab drawer elements to monitor changes
      const exampleDrawerElements = document
        .querySelector('#example-drawer-content')
        .querySelectorAll('col-text-field, col-select, col-number-field');

      // Centralize badge update logic
      const updateExampleBadge = () => {
        let total = 0;
        exampleDrawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined' && String(el.value || '').trim()) total += 1;
        });
        const filterCounter = document.querySelector('#example-filter-counter');
        if (filterCounter) filterCounter.textContent = String(total);
      };

      // Listen to changes on drawer elements to update badge
      exampleDrawerElements.forEach(el => {
        el?.addEventListener('change', updateExampleBadge);
        el?.addEventListener('input', updateExampleBadge);
      });

      // Handle Drawer open/close logic
      const exampleDrawer = document.querySelector('#example-filter-drawer');
      const openExampleDrawer = () => (exampleDrawer.active = true);
      const closeExampleDrawer = () => {
        const formData = { transactionName: '', status: '', amount: '' };
        formData.transactionName = document.querySelector('#example-transaction-name').value;
        formData.status = document.querySelector('#example-status').value;
        formData.amount = document.querySelector('#example-amount').value;
        console.log('[Filter Button] Search with filters:', formData);
        exampleDrawer.active = false;
      };
      const closeAndClearExampleDrawer = () => {
        exampleDrawerElements.forEach(el => {
          if (el && typeof el.value !== 'undefined') el.value = '';
        });
        updateExampleBadge();
        closeExampleDrawer();
      };
      exampleDrawer.addEventListener('overlay-click-outside', closeAndClearExampleDrawer);
      exampleDrawer.addEventListener('on-close', closeAndClearExampleDrawer);

      // Initialize
      updateExampleBadge();
    </script>
  `,
};

export const AdvancedFilterBar: Story = {
  name: 'Advanced Filter Bar',
  render: () => {
    return html`
      <!-- Top-level form owner for toolbar and drawer inputs -->
      <form id="filter-form"></form>
      <col-toolbar id="toolbar" align="space-between" gap="small" wrap aria-label="Filter Bar">
        <!-- Search input (toolbar) -->
        <col-search-bar id="search" name="q" form="filter-form" variant="expanded" placeholder="Search…" custom-width="150px"></col-search-bar>

        <!-- Quick filters (form-associated via form attribute) -->
        <col-select id="account" name="account" sub-label="Account" placeholder="Choose an account" form="filter-form" custom-width="200px">
          <col-list-menu>
            <col-list-menu-item value="suborg1">Account - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Account - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Account - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-select id="date-range" name="dateRange" sub-label="Date Range" placeholder="Choose a date range"
          form="filter-form" custom-width="200px">
          <col-list-menu>
            <col-list-menu-item value="15d">Last 15 days</col-list-menu-item>
            <col-list-menu-item value="30d">Last 30 days</col-list-menu-item>
            <col-list-menu-item value="90d">Last 90 days</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-spacer></col-spacer>

        <!-- Advanced filters trigger with active count badge -->
        <col-button id="filter-button" aria-label="Open filters" onclick="openDrawer()">
          <col-icon name="filter" size="16"></col-icon>
          <col-badge id="filter-counter" aria-label="Active filters count">0</col-badge>
        </col-button>

        <!-- Secondary and primary actions -->
        <col-button id="reset-button" type="reset" form="filter-form" variant="outlined">Clear</col-button>
        <col-button id="search-button" type="submit" form="filter-form" color="primary">Search</col-button>
      </col-toolbar>

      <!-- Advanced filters drawer -->
      <col-drawer id="filter-drawer" aria-label="Advanced Filters Drawer">
        <col-modal-header slot="header" title="Advanced Filters"></col-modal-header>
        <div id="drawer-content" style="display: flex; flex-direction: column; gap: 12px">
          <col-text-field id="transaction-name" name="transactionName" form="filter-form" label="Transaction Name"
            input-type="text" variant="outline" placeholder="Enter partial name here..." validation-timing="blur"
            custom-width="100%">
          </col-text-field>

          <col-select id="status" name="status" form="filter-form" label="Status" placeholder="Choose a status"
            custom-width="100%">
            <col-list-menu>
              <col-list-menu-item value="active">Active</col-list-menu-item>
              <col-list-menu-item value="inactive">Inactive</col-list-menu-item>
              <col-list-menu-item value="pending">Pending</col-list-menu-item>
            </col-list-menu>
          </col-select>

          <col-number-field id="amount" name="amount" form="filter-form" label="Transaction cost"
            placeholder="Enter amount..." display-type="placeholder" helper-text="In USD" precision="2"
            custom-width="100%"></col-number-field>
        </div>
        <col-modal-footer slot="footer">
          <col-button id="drawer-cancel" slot="actions" variant="outlined" onclick="closeAndClearDrawer()">Clear</col-button>
          <col-button id="drawer-apply" slot="actions" color="primary" onclick="closeDrawer()">Apply</col-button>
        </col-modal-footer>
      </col-drawer>
      </section>

      <script>
        // Handle Form logic
        const form = document.getElementById('filter-form');
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
          console.log('[FilterBar] Search with filters:', filters);
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
    `;
  },
};
