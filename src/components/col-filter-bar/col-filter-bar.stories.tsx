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
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
    __sb: {
      height: '400px',
    },
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

type InitializedElement = Element & { _initialized?: boolean };
type InitializedHTMLFormElement = HTMLFormElement & { _initialized?: boolean };
interface ColibriFormElement extends Element {
  value?: string | number;
}
interface ColibriDrawerElement extends Element {
  active?: boolean;
}

/**
 * Basic Filter Bar pattern with search and quick filters.
 */
export const BasicFilterBar: Story = {
  name: 'Basic Filter Bar',
  render: () => {
    const uniqueId = `basic-${Date.now().toString(36)}`;

    setTimeout(() => {
      const basicForm = document.getElementById(`${uniqueId}-form`) as InitializedHTMLFormElement;
      if (!basicForm || basicForm._initialized) return;

      // Mark as initialized to prevent duplicate listeners
      basicForm._initialized = true;

      const handleSubmit = (event: Event) => {
        event.preventDefault();
        const formData = new FormData(basicForm);
        const filters = Object.fromEntries(formData.entries());
        console.log('[Basic Search] Search with filters:', filters);
      };

      basicForm.addEventListener('submit', handleSubmit);
    }, 0);

    return html`
      <form id="${uniqueId}-form"></form>
      <col-toolbar id="${uniqueId}-search" align="space-between" gap="small" wrap>
        <col-search-bar
          id="${uniqueId}-search-bar"
          name="query"
          variant="expanded"
          placeholder="Search…"
          form="${uniqueId}-form"
        ></col-search-bar>
        <col-select
          id="${uniqueId}-sub-org-id"
          name="sub-org-id"
          sub-label="Account"
          placeholder="Choose an account"
          form="${uniqueId}-form"
        >
          <col-list-menu>
            <col-list-menu-item value="suborg1">Account - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Account - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Account - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-select
          id="${uniqueId}-date"
          name="date"
          sub-label="Date Range"
          placeholder="Choose a date range"
          form="${uniqueId}-form"
        >
          <col-list-menu>
            <col-list-menu-item value="date-range-15">15 days</col-list-menu-item>
            <col-list-menu-item value="date-range-30">30 days</col-list-menu-item>
            <col-list-menu-item value="date-range-90">90 days</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-spacer></col-spacer>
        <col-button color="primary" form="${uniqueId}-form" type="submit">Search</col-button>
      </col-toolbar>
    `;
  },
};

export const FilterButton: Story = {
  name: 'Filter Button',
  render: () => {
    const uniqueId = `example-${Date.now().toString(36)}`;

    setTimeout(() => {
      // Grab drawer elements to monitor changes
      const exampleDrawerElements = document
        .querySelector(`#${uniqueId}-drawer-content`)
        ?.querySelectorAll('col-text-field, col-select, col-number-field');

      if (!exampleDrawerElements) return;

      // Check if already initialized to prevent duplicate listeners
      const drawerContent = document.querySelector(
        `#${uniqueId}-drawer-content`
      ) as InitializedElement;
      if (drawerContent?._initialized) return;
      if (drawerContent) drawerContent._initialized = true;

      // Centralize badge update logic
      const updateExampleBadge = () => {
        let total = 0;
        exampleDrawerElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined' && String(formEl.value || '').trim())
            total += 1;
        });
        const filterCounter = document.querySelector(`#${uniqueId}-filter-counter`);
        if (filterCounter) filterCounter.textContent = String(total);
      };

      // Listen to changes on drawer elements to update badge
      exampleDrawerElements.forEach(el => {
        el?.addEventListener('change', updateExampleBadge);
        el?.addEventListener('input', updateExampleBadge);
      });

      // Handle Drawer open/close logic
      const exampleDrawer = document.querySelector(
        `#${uniqueId}-filter-drawer`
      ) as ColibriDrawerElement;
      const filterButton = document.querySelector(`#${uniqueId}-filter-button`);
      const closeExampleDrawer = () => {
        const formData = { transactionName: '', status: '', amount: '' };
        const transactionEl = document.querySelector(
          `#${uniqueId}-transaction-name`
        ) as ColibriFormElement;
        const statusEl = document.querySelector(`#${uniqueId}-status`) as ColibriFormElement;
        const amountEl = document.querySelector(`#${uniqueId}-amount`) as ColibriFormElement;

        if (transactionEl?.value) formData.transactionName = String(transactionEl.value);
        if (statusEl?.value) formData.status = String(statusEl.value);
        if (amountEl?.value) formData.amount = String(amountEl.value);

        console.log('[Filter Button] Search with filters:', formData);
        if (exampleDrawer?.active !== undefined) exampleDrawer.active = false;
      };
      const closeAndClearExampleDrawer = () => {
        exampleDrawerElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined') formEl.value = '';
        });
        updateExampleBadge();
        closeExampleDrawer();
      };

      if (filterButton) {
        filterButton.addEventListener('click', () => {
          if (exampleDrawer?.active !== undefined) exampleDrawer.active = true;
        });
      }

      const applyButton = document.querySelector(`#${uniqueId}-drawer-apply`);
      const cancelButton = document.querySelector(`#${uniqueId}-drawer-cancel`);

      if (applyButton) {
        applyButton.addEventListener('click', closeExampleDrawer);
      }

      if (cancelButton) {
        cancelButton.addEventListener('click', closeAndClearExampleDrawer);
      }

      if (exampleDrawer) {
        exampleDrawer.addEventListener('overlay-click-outside', closeAndClearExampleDrawer);
        exampleDrawer.addEventListener('on-close', closeAndClearExampleDrawer);
      }

      // Initialize
      updateExampleBadge();
    }, 0);

    return html`
      <!-- Advanced filters trigger with active count badge -->
      <col-button id="${uniqueId}-filter-button" aria-label="Open filters">
        <col-icon name="filter" size="16"></col-icon>
        <col-badge id="${uniqueId}-filter-counter" aria-label="Active filters count">0</col-badge>
      </col-button>

      <!-- Advanced filters drawer -->
      <col-drawer id="${uniqueId}-filter-drawer" aria-label="Advanced Filters Drawer">
        <col-modal-header slot="header" title="Advanced Filters"></col-modal-header>
        <div
          id="${uniqueId}-drawer-content"
          style="display: flex; flex-direction: column; gap: 12px"
        >
          <col-text-field
            id="${uniqueId}-transaction-name"
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
            id="${uniqueId}-status"
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
            id="${uniqueId}-amount"
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
          <col-button id="${uniqueId}-drawer-cancel" slot="actions" variant="outlined"
            >Clear</col-button
          >
          <col-button id="${uniqueId}-drawer-apply" slot="actions" color="primary"
            >Apply</col-button
          >
        </col-modal-footer>
      </col-drawer>
    `;
  },
};

export const AdvancedFilterBar: Story = {
  name: 'Advanced Filter Bar',
  render: () => {
    const uniqueId = `filter-${Date.now().toString(36)}`;

    setTimeout(() => {
      // Handle Form logic
      const form = document.getElementById(`${uniqueId}-form`) as HTMLFormElement;
      const toolbarElements = document
        .querySelector(`#${uniqueId}-toolbar`)
        ?.querySelectorAll('col-search-bar, col-select');
      const drawerElements = document
        .querySelector(`#${uniqueId}-drawer-content`)
        ?.querySelectorAll('col-text-field, col-select, col-number-field');

      if (!form || !toolbarElements || !drawerElements) return;

      // Check if already initialized to prevent duplicate listeners
      const initializedForm = form as InitializedHTMLFormElement;
      if (initializedForm._initialized) return;
      initializedForm._initialized = true;

      const updateBadge = () => {
        let total = 0;
        toolbarElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined' && String(formEl.value || '').trim())
            total += 1;
        });
        drawerElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined' && String(formEl.value || '').trim())
            total += 1;
        });
        const filterCounter = document.querySelector(`#${uniqueId}-filter-counter`);
        if (filterCounter) filterCounter.textContent = String(total);
      };

      // Add event listeners to update badge on input changes
      [...Array.from(toolbarElements), ...Array.from(drawerElements)].forEach(el => {
        el?.addEventListener('change', updateBadge);
        el?.addEventListener('input', updateBadge);
      });

      // Functions
      const onSubmit = (event: Event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const filters = Object.fromEntries(formData.entries());
        console.log('[FilterBar] Search with filters:', filters);
      };

      const clearForm = () => {
        toolbarElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined') formEl.value = '';
        });
        drawerElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined') formEl.value = '';
        });
        updateBadge();
      };

      const onReset = (event: Event) => {
        event.preventDefault();
        form.reset();
        clearForm();
      };

      form.addEventListener('submit', onSubmit);
      form.addEventListener('reset', onReset);

      // Handle Drawer open/close logic
      const drawer = document.querySelector(`#${uniqueId}-filter-drawer`) as ColibriDrawerElement;
      const filterButton = document.querySelector(`#${uniqueId}-filter-button`);
      const applyButton = document.querySelector(`#${uniqueId}-drawer-apply`);
      const cancelButton = document.querySelector(`#${uniqueId}-drawer-cancel`);

      const closeAndClearDrawer = () => {
        drawerElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined') formEl.value = '';
        });
        updateBadge();
        if (drawer?.active !== undefined) drawer.active = false;
      };

      const closeDrawer = () => {
        if (drawer?.active !== undefined) drawer.active = false;
      };

      if (filterButton) {
        filterButton.addEventListener('click', () => {
          if (drawer?.active !== undefined) drawer.active = true;
        });
      }

      if (applyButton) {
        applyButton.addEventListener('click', closeDrawer);
      }

      if (cancelButton) {
        cancelButton.addEventListener('click', closeAndClearDrawer);
      }

      if (drawer) {
        drawer.addEventListener('overlay-click-outside', closeAndClearDrawer);
        drawer.addEventListener('on-close', closeAndClearDrawer);
      }

      // Initialize
      updateBadge();
    }, 0);

    return html`
      <!-- Top-level form owner for toolbar and drawer inputs -->
      <form id="${uniqueId}-form"></form>
      <col-toolbar
        id="${uniqueId}-toolbar"
        align="space-between"
        gap="small"
        wrap
        aria-label="Filter Bar"
      >
        <!-- Search input (toolbar) -->
        <col-search-bar
          id="${uniqueId}-search"
          name="q"
          form="${uniqueId}-form"
          variant="expanded"
          placeholder="Search…"
          custom-width="150px"
        ></col-search-bar>

        <!-- Quick filters (form-associated via form attribute) -->
        <col-select
          id="${uniqueId}-account"
          name="account"
          sub-label="Account"
          placeholder="Choose an account"
          form="${uniqueId}-form"
          custom-width="200px"
        >
          <col-list-menu>
            <col-list-menu-item value="suborg1">Account - 1</col-list-menu-item>
            <col-list-menu-item value="suborg2">Account - 2</col-list-menu-item>
            <col-list-menu-item value="suborg3">Account - 3</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-select
          id="${uniqueId}-date-range"
          name="dateRange"
          sub-label="Date Range"
          placeholder="Choose a date range"
          form="${uniqueId}-form"
          custom-width="200px"
        >
          <col-list-menu>
            <col-list-menu-item value="15d">Last 15 days</col-list-menu-item>
            <col-list-menu-item value="30d">Last 30 days</col-list-menu-item>
            <col-list-menu-item value="90d">Last 90 days</col-list-menu-item>
          </col-list-menu>
        </col-select>

        <col-spacer></col-spacer>

        <!-- Advanced filters trigger with active count badge -->
        <col-button id="${uniqueId}-filter-button" aria-label="Open filters">
          <col-icon name="filter" size="16"></col-icon>
          <col-badge id="${uniqueId}-filter-counter" aria-label="Active filters count">0</col-badge>
        </col-button>

        <!-- Secondary and primary actions -->
        <col-button
          id="${uniqueId}-reset-button"
          type="reset"
          form="${uniqueId}-form"
          variant="outlined"
          >Clear</col-button
        >
        <col-button
          id="${uniqueId}-search-button"
          type="submit"
          form="${uniqueId}-form"
          color="primary"
          >Search</col-button
        >
      </col-toolbar>

      <!-- Advanced filters drawer -->
      <col-drawer id="${uniqueId}-filter-drawer" aria-label="Advanced Filters Drawer">
        <col-modal-header slot="header" title="Advanced Filters"></col-modal-header>
        <div
          id="${uniqueId}-drawer-content"
          style="display: flex; flex-direction: column; gap: 12px"
        >
          <col-text-field
            id="${uniqueId}-transaction-name"
            name="transactionName"
            form="${uniqueId}-form"
            label="Transaction Name"
            input-type="text"
            variant="outline"
            placeholder="Enter partial name here..."
            validation-timing="blur"
            custom-width="100%"
          >
          </col-text-field>

          <col-select
            id="${uniqueId}-status"
            name="status"
            form="${uniqueId}-form"
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
            id="${uniqueId}-amount"
            name="amount"
            form="${uniqueId}-form"
            label="Transaction cost"
            placeholder="Enter amount..."
            display-type="placeholder"
            helper-text="In USD"
            precision="2"
            custom-width="100%"
          ></col-number-field>
        </div>
        <col-modal-footer slot="footer">
          <col-button id="${uniqueId}-drawer-cancel" slot="actions" variant="outlined"
            >Clear</col-button
          >
          <col-button id="${uniqueId}-drawer-apply" slot="actions" color="primary"
            >Apply</col-button
          >
        </col-modal-footer>
      </col-drawer>
    `;
  },
};
