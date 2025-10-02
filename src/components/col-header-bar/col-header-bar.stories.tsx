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

type InitializedHTMLFormElement = globalThis.HTMLFormElement & { _initialized?: boolean };
interface ColibriFormElement extends globalThis.Element {
  value?: string | number;
}
interface ColibriDrawerElement extends globalThis.Element {
  active?: boolean;
}

/**
 * All Functions Header Bar composition with title, status, quick filters, filter drawer, and primary action.
 */
export const AllFunctionsHeader: Story = {
  name: 'All Functions Header Bar',
  render: () => {
    const uniqueId = `header-${Date.now().toString(36)}`;

    setTimeout(() => {
      // Handle Form logic
      const form = document.getElementById(`${uniqueId}-form`) as InitializedHTMLFormElement;
      const toolbarElements = document
        .querySelector(`#${uniqueId}-toolbar`)
        ?.querySelectorAll('col-search-bar, col-select');
      const drawerElements = document
        .querySelector(`#${uniqueId}-drawer-content`)
        ?.querySelectorAll('col-text-field, col-select, col-number-field');

      if (!form || !toolbarElements || !drawerElements) return;

      if (form._initialized) return;
      form._initialized = true;

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
        globalThis.console.log('[HeaderBar] Search with filters:', filters);
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
      <col-toolbar id="${uniqueId}-header" gap="small" aria-label="Header Bar" wrap>
        <!-- Left side content, Heading element with Icon or Status -->
        <div style="display: flex; align-items: center; gap: 4px">
          <col-icon name="edit" size="24"></col-icon>
          <col-typography variant="heading">This is a heading’s page</col-typography>
        </div>
        <col-spacer></col-spacer>
        <!-- When we want Filter Bar behavior, we need to capture the inputs -->
        <form id="${uniqueId}-form"></form>
        <!-- Filter bar with quick filters, advanced filters trigger, and primary actions -->
        <col-toolbar
          id="${uniqueId}-toolbar"
          align="right"
          gap="small"
          wrap
          aria-label="Filter Bar"
        >
          <!-- Quick filters (form-associated via form attribute) -->
          <col-select
            id="${uniqueId}-organization"
            name="organization"
            sub-label="Organization"
            placeholder="Choose one"
            form="${uniqueId}-form"
            custom-width="200px"
          >
            <col-list-menu>
              <col-list-menu-item value="suborg1">Organization - 1</col-list-menu-item>
              <col-list-menu-item value="suborg2">Organization - 2</col-list-menu-item>
              <col-list-menu-item value="suborg3">Organization - 3</col-list-menu-item>
            </col-list-menu>
          </col-select>

          <!-- Advanced filters trigger with active count badge -->
          <col-button id="${uniqueId}-filter-button" aria-label="Open filters">
            <col-icon name="filter" size="16"></col-icon>
            <col-badge id="${uniqueId}-filter-counter" aria-label="Active filters count">
              0
            </col-badge>
          </col-button>

          <!-- Primary actions -->
          <col-button
            id="${uniqueId}-search-button"
            type="submit"
            form="${uniqueId}-form"
            color="primary"
          >
            Search
          </col-button>
        </col-toolbar>
        <col-divider orientation="vertical" style="height: 20px"></col-divider>
        <div class="slot">Slot</div>
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
            >Cancel</col-button
          >
          <col-button id="${uniqueId}-drawer-apply" slot="actions" color="primary"
            >Apply</col-button
          >
        </col-modal-footer>
      </col-drawer>
    `;
  },
};

/**
 * Quick Filters Only Header Bar composition with title and quick filters.
 */
export const QuickFiltersOnly: Story = {
  name: 'Quick Filters Only Header Bar',
  render: () => {
    const uniqueId = `quick-${Date.now().toString(36)}`;

    setTimeout(() => {
      const form = document.getElementById(`${uniqueId}-form`) as InitializedHTMLFormElement;
      const toolbarElements = document
        .querySelector(`#${uniqueId}-toolbar`)
        ?.querySelectorAll('col-search-bar, col-select');

      if (!form || !toolbarElements) return;
      if (form._initialized) return;
      form._initialized = true;

      const onSubmit = (event: Event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const filters = Object.fromEntries(formData.entries());
        globalThis.console.log('[HeaderBar] Search with filters:', filters);
      };

      const clearForm = () => {
        toolbarElements.forEach(el => {
          const formEl = el as ColibriFormElement;
          if (formEl && typeof formEl.value !== 'undefined') formEl.value = '';
        });
      };

      const onReset = (event: Event) => {
        event.preventDefault();
        form.reset();
        clearForm();
      };

      form.addEventListener('submit', onSubmit);
      form.addEventListener('reset', onReset);
    }, 0);

    return html`
      <!-- Top-level form owner for toolbar and drawer inputs -->
      <col-toolbar id="${uniqueId}-header" gap="small" aria-label="Header Bar" wrap>
        <!-- Left side content, Heading element with Icon or Status -->
        <div style="display: flex; align-items: center; gap: 4px">
          <col-typography variant="heading">This is a heading’s page</col-typography>
        </div>
        <col-spacer></col-spacer>
        <!-- When we want Filter Bar behavior, we need to capture the inputs -->
        <form id="${uniqueId}-form"></form>
        <!-- Filter bar with quick filters, advanced filters trigger, and primary actions -->
        <col-toolbar
          id="${uniqueId}-toolbar"
          align="right"
          gap="small"
          wrap
          aria-label="Filter Bar"
        >
          <!-- Quick filters (form-associated via form attribute) -->
          <col-select
            id="${uniqueId}-organization"
            name="organization"
            sub-label="Organization"
            placeholder="Choose one"
            custom-width="200px"
            form="${uniqueId}-form"
          >
            <col-list-menu>
              <col-list-menu-item value="suborg1">Organization - 1</col-list-menu-item>
              <col-list-menu-item value="suborg2">Organization - 2</col-list-menu-item>
              <col-list-menu-item value="suborg3">Organization - 3</col-list-menu-item>
            </col-list-menu>
          </col-select>

          <col-select
            id="${uniqueId}-date-range"
            name="dateRange"
            sub-label="Date Range"
            placeholder="Choose a date range"
            form="${uniqueId}-form"
          >
            <col-list-menu>
              <col-list-menu-item value="15d">Last 15 days</col-list-menu-item>
              <col-list-menu-item value="30d">Last 30 days</col-list-menu-item>
              <col-list-menu-item value="90d">Last 90 days</col-list-menu-item>
            </col-list-menu>
          </col-select>

          <!-- Primary actions -->
          <col-button
            id="${uniqueId}-search-button"
            type="submit"
            form="${uniqueId}-form"
            color="primary"
          >
            Search
          </col-button>
        </col-toolbar>
      </col-toolbar>
    `;
  },
};

/**
 * Advanced Filters Header Bar composition with title and advanced filters.
 */
export const AdvancedFiltersHeaderBar: Story = {
  name: 'Advanced Filters Header Bar',
  render: () => {
    const uniqueId = `adv-${Date.now().toString(36)}`;

    setTimeout(() => {
      // Handle Form logic
      const form = document.getElementById(`${uniqueId}-form`) as InitializedHTMLFormElement;
      const toolbarElements = document
        .querySelector(`#${uniqueId}-toolbar`)
        ?.querySelectorAll('col-search-bar, col-select');
      const drawerElements = document
        .querySelector(`#${uniqueId}-drawer-content`)
        ?.querySelectorAll('col-text-field, col-select, col-number-field');

      if (!form || !toolbarElements || !drawerElements) return;

      if (form._initialized) return;
      form._initialized = true;

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
        globalThis.console.log('[HeaderBar] Search with filters:', filters);
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
      <col-toolbar id="${uniqueId}-header" gap="small" aria-label="Header Bar" wrap>
        <!-- Left side content, Heading element with Icon or Status -->
        <div style="display: flex; align-items: center; gap: 4px">
          <col-typography variant="heading">This is a heading’s page</col-typography>
        </div>
        <col-spacer></col-spacer>
        <!-- When we want Filter Bar behavior, we need to capture the inputs -->
        <form id="${uniqueId}-form"></form>
        <!-- Filter bar with quick filters, advanced filters trigger, and primary actions -->
        <col-toolbar
          id="${uniqueId}-toolbar"
          align="right"
          gap="small"
          wrap
          aria-label="Filter Bar"
        >
          <!-- Quick filters (form-associated via form attribute) -->
          <col-select
            id="${uniqueId}-organization"
            name="organization"
            sub-label="Organization"
            placeholder="Choose one"
            custom-width="200px"
            form="${uniqueId}-form"
          >
            <col-list-menu>
              <col-list-menu-item value="suborg1">Organization - 1</col-list-menu-item>
              <col-list-menu-item value="suborg2">Organization - 2</col-list-menu-item>
              <col-list-menu-item value="suborg3">Organization - 3</col-list-menu-item>
            </col-list-menu>
          </col-select>

          <!-- Advanced filters trigger with active count badge -->
          <col-button id="${uniqueId}-filter-button" aria-label="Open filters">
            <col-icon name="filter" size="16"></col-icon>
            <col-badge id="${uniqueId}-filter-counter" aria-label="Active filters count">
              0
            </col-badge>
          </col-button>

          <!-- Primary actions -->
          <col-button
            id="${uniqueId}-search-button"
            type="submit"
            form="${uniqueId}-form"
            color="primary"
          >
            Search
          </col-button>
        </col-toolbar>
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
            >Cancel</col-button
          >
          <col-button id="${uniqueId}-drawer-apply" slot="actions" color="primary"
            >Apply</col-button
          >
        </col-modal-footer>
      </col-drawer>
    `;
  },
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
