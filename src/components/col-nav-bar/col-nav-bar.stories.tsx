import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {};

const meta = {
  title: 'Patterns/Nav Bar',
  parameters: {
    backgrounds: { default: 'Light' },
    docs: {
      story: {
        inline: false,
        height: '220px',
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

const timezoneScript = `(() => {
  const select = document.getElementById('timezones');
  const menu = document.getElementById('timezones-menu');
  if (!select || !menu) return;
  const timezoneOffsets = ['-12','-11','-10','-8','-7','-6','-5','-4','-3','-2','-1','0','1','2','3','4','5','6','7','8','9','10','11','12','13'];
  setTimeout(() => {
    timezoneOffsets.forEach(offsetString => {
      const option = document.createElement('col-list-menu-item');
      option.value = offsetString;
      option.textContent = 'UTC ' + offsetString;
      menu.appendChild(option);
    });
    select.removeAttribute('loading');
  }, 500);
})();`;

/**
 * Full Nav Bar with breadcrumb, timezone, language, policy/support menus and user avatar.
 */
export const AllFunctionsNavBar: Story = {
  name: 'All Functions Nav Bar',
  render: () => html`
    <col-toolbar align="space-between" border="bottom" sticky="top" wrap>
      <col-breadcrumb>
        <col-breadcrumb-item>Level 1</col-breadcrumb-item>
        <col-breadcrumb-item current>Level 2</col-breadcrumb-item>
      </col-breadcrumb>
      <col-toolbar gap="none" wrap>
        <col-select
          id="timezones"
          name="timezones"
          sub-label="Time Zone"
          placeholder="Choose an option"
          loading
          clearable
        >
          <col-icon slot="icon" name="timer" size="16px"></col-icon>
          <col-list-menu id="timezones-menu"></col-list-menu>
        </col-select>
        <col-divider orientation="vertical" style="height:20px"></col-divider>
        <col-select id="language" name="language" value="en" custom-width="90px">
          <col-icon slot="icon" name="language" size="16px"></col-icon>
          <col-list-menu id="language-menu">
            <col-list-menu-item value="en">EN</col-list-menu-item>
            <col-list-menu-item value="es">ES</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-divider orientation="vertical" style="height:20px"></col-divider>
        <col-dropdown id="privacy" placement="start">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="privacy-menu"
            aria-expanded="false"
            aria-label="Privacy and Terms"
          >
            <col-icon name="question-mark-circle"></col-icon>
          </col-button>
          <col-list-menu id="privacy-menu" role="menu">
            <col-list-menu-item href="https://www.telesign.com/privacy-notice" newtab
              >Privacy Policy</col-list-menu-item
            >
            <col-list-menu-item href="https://www.telesign.com/terms-conditions" newtab
              >Terms of Service</col-list-menu-item
            >
          </col-list-menu>
        </col-dropdown>
        <col-dropdown id="support" placement="start">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="support-menu"
            aria-expanded="false"
            aria-label="Support"
          >
            <col-icon name="2way"></col-icon>
          </col-button>
          <col-list-menu id="support-menu" role="menu">
            <col-list-menu-item href="https://support.telesign.com/s/" newtab
              >Support</col-list-menu-item
            >
            <col-list-menu-item href="https://www.telesign.com/resources?paged=1" newtab
              >Resources</col-list-menu-item
            >
          </col-list-menu>
        </col-dropdown>
        <col-divider orientation="vertical" style="height:20px"></col-divider>
        <col-dropdown id="user-profile">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="user-profile-menu"
            aria-expanded="false"
            aria-label="User Profile"
          >
            <col-avatar name="User Avatar"></col-avatar>
          </col-button>
          <col-list-menu role="menu" id="user-profile-menu">
            <col-list-menu-item>
              <col-icon name="profile"></col-icon>
              My Profile
            </col-list-menu-item>
            <col-list-menu-item>
              <col-icon name="power"></col-icon>
              Log out
            </col-list-menu-item>
          </col-list-menu>
        </col-dropdown>
      </col-toolbar>
    </col-toolbar>
    <script>
      ${timezoneScript};
    </script>
  `,
};

/**
 * Nav Bar variation without the timezone select.
 */
export const NoTimezoneNavBar: Story = {
  name: 'No Timezone Select',
  render: () => html`
    <col-toolbar align="space-between" border="bottom" sticky="top" wrap>
      <col-breadcrumb>
        <col-breadcrumb-item>Level 1</col-breadcrumb-item>
        <col-breadcrumb-item>Level 2</col-breadcrumb-item>
        <col-breadcrumb-item current>Level 3</col-breadcrumb-item>
      </col-breadcrumb>
      <col-toolbar gap="none" wrap>
        <col-select id="language" name="language" value="en" custom-width="90px">
          <col-icon slot="icon" name="language" size="16px"></col-icon>
          <col-list-menu>
            <col-list-menu-item value="en">EN</col-list-menu-item>
            <col-list-menu-item value="es">ES</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-divider orientation="vertical" style="height:20px"></col-divider>
        <col-dropdown id="privacy" placement="start">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="privacy-menu"
            aria-expanded="false"
            aria-label="Privacy and Terms"
          >
            <col-icon name="question-mark-circle"></col-icon>
          </col-button>
          <col-list-menu id="privacy-menu" role="menu">
            <col-list-menu-item href="https://www.telesign.com/privacy-notice" newtab
              >Privacy Policy</col-list-menu-item
            >
            <col-list-menu-item href="https://www.telesign.com/terms-conditions" newtab
              >Terms of Service</col-list-menu-item
            >
          </col-list-menu>
        </col-dropdown>
        <col-dropdown id="support" placement="start">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="support-menu"
            aria-expanded="false"
            aria-label="Support"
          >
            <col-icon name="2way"></col-icon>
          </col-button>
          <col-list-menu id="support-menu" role="menu">
            <col-list-menu-item href="https://support.telesign.com/s/" newtab
              >Support</col-list-menu-item
            >
            <col-list-menu-item href="https://www.telesign.com/resources?paged=1" newtab
              >Resources</col-list-menu-item
            >
          </col-list-menu>
        </col-dropdown>
        <col-divider orientation="vertical" style="height:20px"></col-divider>
        <col-dropdown id="user-profile">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="user-profile-menu"
            aria-expanded="false"
            aria-label="User Profile"
          >
            <col-avatar name="User Avatar"></col-avatar>
          </col-button>
          <col-list-menu role="menu" id="user-profile-menu">
            <col-list-menu-item>
              <col-icon name="profile"></col-icon>
              My Profile
            </col-list-menu-item>
            <col-list-menu-item>
              <col-icon name="power"></col-icon>
              Log out
            </col-list-menu-item>
          </col-list-menu>
        </col-dropdown>
      </col-toolbar>
    </col-toolbar>
  `,
};

/**
 * Minimal Nav Bar with only language selector and user avatar menu.
 */
export const LanguageAndAvatarNavBar: Story = {
  name: 'Language + Avatar Only',
  render: () => html`
    <col-toolbar align="space-between" border="bottom" sticky="top" wrap>
      <col-breadcrumb>
        <col-breadcrumb-item>Home</col-breadcrumb-item>
        <col-breadcrumb-item>Dashboard</col-breadcrumb-item>
        <col-breadcrumb-item current>Reports</col-breadcrumb-item>
      </col-breadcrumb>
      <col-toolbar gap="none" wrap>
        <col-select id="language" name="language" value="en" custom-width="90px">
          <col-icon slot="icon" name="language" size="16px"></col-icon>
          <col-list-menu>
            <col-list-menu-item value="en">EN</col-list-menu-item>
            <col-list-menu-item value="es">ES</col-list-menu-item>
          </col-list-menu>
        </col-select>
        <col-divider orientation="vertical" style="height:20px"></col-divider>
        <col-dropdown id="user-profile">
          <col-button
            slot="trigger"
            aria-haspopup="true"
            aria-controls="user-profile-menu"
            aria-expanded="false"
            aria-label="User Profile"
          >
            <col-avatar name="User Avatar"></col-avatar>
          </col-button>
          <col-list-menu role="menu" id="user-profile-menu">
            <col-list-menu-item>
              <col-icon name="profile"></col-icon>
              My Profile
            </col-list-menu-item>
            <col-list-menu-item>
              <col-icon name="power"></col-icon>
              Log out
            </col-list-menu-item>
          </col-list-menu>
        </col-dropdown>
      </col-toolbar>
    </col-toolbar>
  `,
};
