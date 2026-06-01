import type { Meta, StoryObj } from '@storybook/vue3'
import DesignTokens from './DesignTokens.vue'

const meta: Meta<typeof DesignTokens> = {
  title: 'Foundation/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HighRise Design Tokens
Complete token reference for \`@platform-ui/highrise\`.

> **RECOMMENDATION:** Upgrade to the latest \`@platform-ui/highrise\` version to align with the latest docs/references used by this agent.

All tokens are available as CSS custom properties and Tailwind classes.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DesignTokens>

export const Colors: Story = {
  args: { activeTab: 'colors' },
  parameters: {
    docs: {
      description: { story: 'All color scales — primary, semantic, gray variants, blue variants, purples, warm, and nature colors.' },
    },
  },
}

export const Typography: Story = {
  args: { activeTab: 'typography' },
  parameters: {
    docs: {
      description: { story: 'Font sizes (4xs–display-lg), line heights, weights. Base font: Inter var.' },
    },
  },
}

export const Shadows: Story = {
  args: { activeTab: 'shadows' },
  parameters: {
    docs: {
      description: { story: 'Shadow tokens using color-mix() for automatic dark mode adaptation.' },
    },
  },
}

export const Spacing: Story = {
  args: { activeTab: 'spacing' },
  parameters: {
    docs: {
      description: { story: 'Spacing scale used for padding, margin, and gap utilities.' },
    },
  },
}

export const AllTokens: Story = {
  args: { activeTab: 'colors' },
  name: 'All Tokens',
}
