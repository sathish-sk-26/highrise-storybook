<template>
  <div class="hr-tokens-page">
    <header class="hr-tokens-header">
      <div class="hr-tokens-header-inner">
        <div>
          <h1>HighRise Design Tokens</h1>
          <p>Foundation · <code>@platform-ui/highrise</code></p>
        </div>
        <nav class="hr-tokens-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['hr-tab', { 'hr-tab--active': activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </header>

    <main class="hr-tokens-main">

      <!-- COLORS -->
      <section v-if="activeTab === 'colors'">
        <div v-for="group in colorGroups" :key="group.label" class="hr-section">
          <h2 class="hr-section-title">{{ group.label }}</h2>
          <p v-if="group.description" class="hr-section-desc">{{ group.description }}</p>
          <div class="hr-color-scales">
            <div v-for="scale in group.scales" :key="scale.name" class="hr-scale-row">
              <span class="hr-scale-name">{{ scale.name }}</span>
              <div class="hr-swatches">
                <div
                  v-for="swatch in scale.swatches"
                  :key="swatch.step"
                  class="hr-swatch"
                  :style="{ background: swatch.hex }"
                  :title="`${scale.varPrefix}-${swatch.step}: ${swatch.hex}`"
                >
                  <span class="hr-swatch-tooltip">
                    <strong>{{ swatch.step }}</strong><br />{{ swatch.hex }}
                  </span>
                </div>
              </div>
            </div>
            <div class="hr-step-labels">
              <span></span>
              <div class="hr-step-label-row">
                <span v-for="step in steps" :key="step">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TYPOGRAPHY -->
      <section v-if="activeTab === 'typography'">
        <div class="hr-section">
          <h2 class="hr-section-title">Display Sizes</h2>
          <div class="hr-type-rows">
            <div v-for="t in displaySizes" :key="t.token" class="hr-type-row">
              <div class="hr-type-meta">
                <code>{{ t.token }}</code>
                <span>{{ t.size }} / {{ t.lh }}</span>
              </div>
              <div class="hr-type-sample" :style="{ fontSize: t.size, lineHeight: t.lh }">
                The quick brown fox
              </div>
            </div>
          </div>
        </div>
        <div class="hr-section">
          <h2 class="hr-section-title">UI / Body Sizes</h2>
          <div class="hr-type-rows">
            <div v-for="t in uiSizes" :key="t.token" class="hr-type-row">
              <div class="hr-type-meta">
                <code>{{ t.token }}</code>
                <span>{{ t.size }} / {{ t.lh }}</span>
              </div>
              <div class="hr-type-sample" :style="{ fontSize: t.size, lineHeight: t.lh }">
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          </div>
        </div>
        <div class="hr-section">
          <h2 class="hr-section-title">Font Weights</h2>
          <div class="hr-weight-rows">
            <div v-for="w in weights" :key="w.token" class="hr-weight-row">
              <code>{{ w.token }}</code>
              <span :style="{ fontWeight: w.value, fontSize: '18px' }">{{ w.label }} — {{ w.value }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SHADOWS -->
      <section v-if="activeTab === 'shadows'">
        <div class="hr-section">
          <h2 class="hr-section-title">Shadow Tokens</h2>
          <p class="hr-section-desc">All shadows use <code>color-mix()</code> with <code>--gray-900</code> for automatic dark mode adaptation.</p>
          <div class="hr-shadow-grid">
            <div v-for="s in shadows" :key="s.token" class="hr-shadow-card" :style="{ boxShadow: s.value }">
              <code>{{ s.token }}</code>
              <span>{{ s.label }}</span>
            </div>
          </div>
          <h2 class="hr-section-title" style="margin-top:2rem">Focus / Box Shadow</h2>
          <div class="hr-shadow-grid">
            <div v-for="s in focusShadows" :key="s.token" class="hr-shadow-card" :style="{ boxShadow: s.value }">
              <code>{{ s.token }}</code>
              <span>{{ s.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SPACING -->
      <section v-if="activeTab === 'spacing'">
        <div class="hr-section">
          <h2 class="hr-section-title">Spacing Scale</h2>
          <div class="hr-spacing-rows">
            <div v-for="s in spacingScale" :key="s.token" class="hr-spacing-row">
              <code>{{ s.token }}</code>
              <span class="hr-spacing-value">{{ s.rem }}</span>
              <span class="hr-spacing-value">{{ s.value }}</span>
              <div class="hr-spacing-bar-wrap">
                <div class="hr-spacing-bar" :style="{ width: s.value }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="hr-section">
          <h2 class="hr-section-title">Border Radius</h2>
          <div class="hr-radius-grid">
            <div v-for="r in radiusScale" :key="r.token" class="hr-radius-card">
              <div class="hr-radius-box" :style="{ borderRadius: r.value }"></div>
              <code>{{ r.token }}</code>
              <span>{{ r.value }}</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ activeTab?: string }>()
const activeTab = ref(props.activeTab ?? 'colors')

const tabs = [
  { id: 'colors',     label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'shadows',    label: 'Shadows' },
  { id: 'spacing',    label: 'Spacing' },
]

const steps = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

function makeScale(name: string, varPrefix: string, hexes: string[]) {
  return { name, varPrefix, swatches: steps.map((s, i) => ({ step: s, hex: hexes[i] })) }
}

const colorGroups = [
  {
    label: 'Base',
    description: 'Base black and white styles.',
    scales: [
      { name: 'White / Black', varPrefix: 'base', swatches: [
        { step: 'white', hex: '#ffffff' }, { step: 'black', hex: '#000000' },
      ]},
    ],
  },
  {
    label: 'Brand & Semantic',
    description: 'Primary brand color and semantic feedback colors.',
    scales: [
      makeScale('Primary', '--primary', ['#f5f8ff','#eff4ff','#d1e0ff','#b2ccff','#84adff','#528bff','#2970ff','#155eef','#004eeb','#0040c1','#00359e']),
      makeScale('Success', '--success', ['#f6fef9','#ecfdf3','#d1fadf','#a6f4c5','#6ce9a6','#32d583','#12b76a','#039855','#027a48','#05603a','#054f31']),
      makeScale('Warning', '--warning', ['#fffcf5','#fffaeb','#fef0c7','#fedf89','#fec84b','#fdb022','#f79009','#dc6803','#b54708','#93370d','#7a2e0e']),
      makeScale('Error',   '--error',   ['#fffbfa','#fef3f2','#fee4e2','#fecdca','#fda29b','#f97066','#f04438','#d92d20','#b42318','#912018','#7a271a']),
    ],
  },
  {
    label: 'Gray Scales',
    description: 'Eight gray variants for different interface contexts.',
    scales: [
      makeScale('Gray',         '--gray',         ['#fcfcfd','#f9fafb','#f2f4f7','#eaecf0','#d0d5dd','#98a2b3','#667085','#475467','#344054','#1d2939','#101828']),
      makeScale('Gray Blue',    '--gray-blue',    ['#fcfcfd','#f8f9fc','#eaecf5','#d5d9eb','#b3b8db','#717bbc','#4e5ba6','#3e4784','#363f72','#293056','#101323']),
      makeScale('Gray Cool',    '--gray-cool',    ['#fcfcfd','#f9f9fb','#eff1f5','#dcdfea','#b9c0d4','#7d89b0','#5d6b98','#4a5578','#404968','#30374f','#111322']),
      makeScale('Gray Modern',  '--gray-modern',  ['#fcfcfd','#f8fafc','#eef2f6','#e3e8ef','#cdd5df','#9aa4b2','#697586','#4b5565','#364152','#202939','#121926']),
      makeScale('Gray Neutral', '--gray-neutral', ['#fcfcfd','#f9fafb','#f3f4f6','#e5e7eb','#d2d6db','#9da4ae','#6c737f','#4d5761','#384250','#1f2a37','#111927']),
      makeScale('Gray Iron',    '--gray-iron',    ['#fcfcfc','#fafafa','#f4f4f5','#e4e4e7','#d1d1d6','#a0a0ab','#70707b','#51525c','#3f3f46','#26272b','#18181b']),
      makeScale('Gray True',    '--gray-true',    ['#fcfcfc','#fafafa','#f5f5f5','#e5e5e5','#d6d6d6','#a3a3a3','#737373','#525252','#424242','#292929','#141414']),
      makeScale('Gray Warm',    '--gray-warm',    ['#fdfdfc','#fafaf9','#f5f5f4','#e7e5e4','#d7d3d0','#a9a29d','#79716b','#57534e','#44403c','#292524','#1c1917']),
    ],
  },
  {
    label: 'Blue Variants',
    scales: [
      makeScale('Blue Light', '--blue-light', ['#f5fbff','#f0f9ff','#e0f2fe','#b9e6fe','#7cd4fd','#36bffa','#0ba5ec','#0086c9','#026aa2','#065986','#0b4a6f']),
      makeScale('Blue',       '--blue',       ['#f5faff','#eff8ff','#d1e9ff','#b2ddff','#84caff','#53b1fd','#2e90fa','#1570ef','#175cd3','#1849a9','#194185']),
      makeScale('Blue Dark',  '--blue-dark',  ['#f5f8ff','#eff4ff','#d1e0ff','#b2ccff','#84adff','#528bff','#2970ff','#155eef','#004eeb','#0040c1','#00359e']),
      makeScale('Cyan',       '--cyan',       ['#f5feff','#ecfdff','#cff9fe','#a5f0fc','#67e3f9','#22ccee','#06aed4','#088ab2','#0e7090','#155b75','#164c63']),
      makeScale('Indigo',     '--indigo',     ['#f5f8ff','#eef4ff','#e0eaff','#c7d7fe','#a4bcfd','#8098f9','#6172f3','#444ce7','#3538cd','#2d31a6','#2d3282']),
    ],
  },
  {
    label: 'Purple Variants',
    scales: [
      makeScale('Violet',  '--violet',  ['#fbfaff','#f5f3ff','#ece9fe','#ddd6fe','#c3b5fd','#a48afb','#875bf7','#7839ee','#6927da','#5720b7','#491c96']),
      makeScale('Purple',  '--purple',  ['#fafaff','#f4f3ff','#ebe9fe','#d9d6fe','#bdb4fe','#9b8afb','#7a5af8','#6938ef','#5925dc','#4a1fb8','#3e1c96']),
      makeScale('Fuchsia', '--fuchsia', ['#fefaff','#fdf4ff','#fbe8ff','#f6d0fe','#eeaafd','#e478fa','#d444f1','#ba24d5','#9f1ab1','#821890','#6f1877']),
    ],
  },
  {
    label: 'Warm Colors',
    scales: [
      makeScale('Pink',        '--pink',        ['#fef6fb','#fdf2fa','#fce7f6','#fcceee','#faa7e0','#f670c7','#ee46bc','#dd2590','#c11574','#9e165f','#851651']),
      makeScale('Rose',        '--rose',        ['#fff5f6','#fff1f3','#ffe4e8','#fecdd6','#fea3b4','#fd6f8e','#f63d68','#e31b54','#c01048','#a11043','#89123e']),
      makeScale('Orange Dark', '--orange-dark', ['#fff9f5','#fff4ed','#ffe6d5','#ffd6ae','#ff9c66','#ff692e','#ff4405','#e62e05','#bc1b06','#97180c','#771a0d']),
      makeScale('Orange',      '--orange',      ['#fefaf5','#fef6ee','#fdead7','#f9dbaf','#f7b27a','#f38744','#ef6820','#e04f16','#b93815','#932f19','#772917']),
      makeScale('Yellow',      '--yellow',      ['#fefdf0','#fefbe8','#fef7c3','#feee95','#fde272','#fac515','#eaaa08','#ca8504','#a15c07','#854a0e','#713b12']),
    ],
  },
  {
    label: 'Nature Colors',
    scales: [
      makeScale('Moss',        '--moss',        ['#fafdf7','#f5fbee','#e6f4d7','#ceeab0','#acdc79','#86cb3c','#669f2a','#4f7a21','#3f621a','#335015','#2b4212']),
      makeScale('Green Light', '--green-light', ['#fafef5','#f3fee7','#e3fbcc','#d0f8ab','#a6ef67','#85e13a','#66c61c','#4ca30d','#3b7c0f','#326212','#2b5314']),
      makeScale('Green',       '--green',       ['#f6fef9','#edfcf2','#d3f8df','#aaf0c4','#73e2a3','#3ccb7f','#16b364','#099250','#087443','#095c37','#084c2e']),
      makeScale('Teal',        '--teal',        ['#f6fefc','#f0fdf9','#ccfbef','#99f6e0','#5fe9d0','#2ed3b7','#15b79e','#0e9384','#107569','#125d56','#134e48']),
    ],
  },
]

const displaySizes = [
  { token: '--hr-font-size-display-lg', size: '48px', lh: '60px' },
  { token: '--hr-font-size-display-md', size: '36px', lh: '44px' },
  { token: '--hr-font-size-display-sm', size: '30px', lh: '38px' },
  { token: '--hr-font-size-display-xs', size: '24px', lh: '32px' },
]

const uiSizes = [
  { token: '--hr-font-size-4xl', size: '20px', lh: '30px' },
  { token: '--hr-font-size-3xl', size: '18px', lh: '28px' },
  { token: '--hr-font-size-2xl', size: '16px', lh: '24px' },
  { token: '--hr-font-size-xl',  size: '15px', lh: '20px' },
  { token: '--hr-font-size-lg',  size: '14px', lh: '20px' },
  { token: '--hr-font-size-md',  size: '13px', lh: '18px' },
  { token: '--hr-font-size-sm',  size: '12px', lh: '17px' },
  { token: '--hr-font-size-xs',  size: '11px', lh: '16px' },
  { token: '--hr-font-size-2xs', size: '10px', lh: '15px' },
  { token: '--hr-font-size-3xs', size: '9px',  lh: '14px' },
  { token: '--hr-font-size-4xs', size: '8px',  lh: '12px' },
]

const weights = [
  { token: '--hr-font-weight-regular',  value: '400', label: 'Regular' },
  { token: '--hr-font-weight-medium',   value: '500', label: 'Medium' },
  { token: '--hr-font-weight-semibold', value: '600', label: 'Semibold' },
  { token: '--hr-font-weight-bold',     value: '700', label: 'Bold' },
]

const shadows = [
  { token: '--shadow-xs',  label: 'Extra small', value: '0px 1px 2px rgba(16,24,40,0.05)' },
  { token: '--shadow-md',  label: 'Medium',      value: '0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06)' },
  { token: '--shadow-lg',  label: 'Large',       value: '0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)' },
  { token: '--shadow-xl',  label: 'Extra large', value: '0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)' },
  { token: '--shadow-2xl', label: '2X large',    value: '0px 24px 48px -12px rgba(16,24,40,0.18)' },
  { token: '--shadow-3xl', label: '3X large',    value: '0px 32px 64px -12px rgba(16,24,40,0.14)' },
]

const focusShadows = [
  { token: '--box-shadow / --shadow-focus-primary', label: 'Primary focus ring', value: '0 0 0 2px rgba(21,94,239,0.20)' },
  { token: '--shadow-focus-error',                  label: 'Error focus ring',   value: '0 0 0 2px rgba(217,45,32,0.20)' },
]

const spacingScale = [
  { token: '--hr-space-1',  rem: '0.25rem', value: '4px' },
  { token: '--hr-space-2',  rem: '0.5rem',  value: '8px' },
  { token: '--hr-space-3',  rem: '0.75rem', value: '12px' },
  { token: '--hr-space-4',  rem: '1rem',    value: '16px' },
  { token: '--hr-space-5',  rem: '1.25rem', value: '20px' },
  { token: '--hr-space-6',  rem: '1.5rem',  value: '24px' },
  { token: '--hr-space-8',  rem: '2rem',    value: '32px' },
  { token: '--hr-space-10', rem: '2.5rem',  value: '40px' },
  { token: '--hr-space-12', rem: '3rem',    value: '48px' },
  { token: '--hr-space-16', rem: '4rem',    value: '64px' },
  { token: '--hr-space-20', rem: '5rem',    value: '80px' },
  { token: '--hr-space-24', rem: '6rem',    value: '96px' },
  { token: '--hr-space-32', rem: '8rem',    value: '128px' },
  { token: '--hr-space-40', rem: '10rem',   value: '160px' },
  { token: '--hr-space-48', rem: '12rem',   value: '192px' },
  { token: '--hr-space-56', rem: '14rem',   value: '224px' },
  { token: '--hr-space-64', rem: '16rem',   value: '256px' },
]

const radiusScale = [
  { token: '--radius-none', value: '0px' },
  { token: '--radius-xs',   value: '2px' },
  { token: '--radius-sm',   value: '4px' },
  { token: '--radius-md',   value: '6px' },
  { token: '--radius-lg',   value: '8px' },
  { token: '--radius-xl',   value: '12px' },
  { token: '--radius-2xl',  value: '16px' },
  { token: '--radius-3xl',  value: '24px' },
  { token: '--radius-full', value: '9999px' },
]
</script>

<style scoped>
.hr-tokens-page {
  font-family: "Inter var", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #101828;
  background: #f9fafb;
  min-height: 100vh;
}
.hr-tokens-header {
  background: #fff;
  border-bottom: 1px solid #eaecf0;
  position: sticky;
  top: 0;
  z-index: 100;
}
.hr-tokens-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.hr-tokens-header h1 {
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 2px;
}
.hr-tokens-header p {
  font-size: 12px;
  color: #667085;
  margin: 0;
}
.hr-tokens-header code {
  font-size: 11px;
  background: #f2f4f7;
  padding: 1px 6px;
  border-radius: 4px;
  color: #344054;
}
.hr-tokens-tabs {
  display: flex;
  gap: 4px;
}
.hr-tab {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: #475467;
  transition: all 150ms ease;
}
.hr-tab:hover { background: #f2f4f7; color: #344054; }
.hr-tab--active {
  background: #fff;
  border-color: #d0d5dd;
  color: #101828;
  box-shadow: 0px 1px 2px rgba(16,24,40,0.05);
}
.hr-tokens-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}
.hr-section { margin-bottom: 40px; }
.hr-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 4px;
}
.hr-section-desc {
  font-size: 12px;
  color: #667085;
  margin: 0 0 16px;
}
.hr-section-desc code {
  font-size: 11px;
  background: #f2f4f7;
  padding: 1px 5px;
  border-radius: 3px;
  color: #344054;
}

/* Color scales */
.hr-color-scales { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
.hr-scale-row { display: grid; grid-template-columns: 100px 1fr; align-items: center; gap: 8px; }
.hr-scale-name { font-size: 12px; font-weight: 500; color: #344054; }
.hr-swatches { display: grid; grid-template-columns: repeat(11, 1fr); gap: 3px; }
.hr-swatch {
  height: 40px;
  border-radius: 4px;
  position: relative;
  cursor: default;
  border: 0.5px solid rgba(0,0,0,0.06);
}
.hr-swatch:hover .hr-swatch-tooltip { opacity: 1; }
.hr-swatch-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1d2939;
  color: #fff;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms;
  z-index: 10;
  line-height: 1.5;
}
.hr-step-labels { display: grid; grid-template-columns: 100px 1fr; gap: 8px; margin-top: 3px; }
.hr-step-label-row { display: grid; grid-template-columns: repeat(11, 1fr); gap: 3px; }
.hr-step-label-row span { font-size: 9px; color: #98a2b3; text-align: center; }

/* Typography */
.hr-type-rows { display: flex; flex-direction: column; gap: 0; margin-top: 12px; }
.hr-type-row {
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
  border-bottom: 1px solid #f2f4f7;
}
.hr-type-meta { display: flex; flex-direction: column; gap: 2px; }
.hr-type-meta code { font-size: 11px; color: #155eef; background: #eff4ff; padding: 2px 6px; border-radius: 4px; }
.hr-type-meta span { font-size: 11px; color: #98a2b3; }
.hr-type-sample { color: #344054; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hr-weight-rows { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
.hr-weight-row { display: grid; grid-template-columns: 240px 1fr; align-items: center; gap: 24px; }
.hr-weight-row code { font-size: 11px; color: #155eef; background: #eff4ff; padding: 2px 6px; border-radius: 4px; }
.hr-weight-row span { color: #344054; }

/* Shadows */
.hr-shadow-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; }
.hr-shadow-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hr-shadow-card code { font-size: 11px; color: #155eef; background: #eff4ff; padding: 2px 6px; border-radius: 4px; width: fit-content; }
.hr-shadow-card span { font-size: 12px; color: #667085; }

/* Spacing */
.hr-spacing-rows { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
.hr-spacing-row { display: grid; grid-template-columns: 160px 56px 48px 1fr; align-items: center; gap: 12px; }
.hr-spacing-row code { font-size: 11px; color: #155eef; background: #eff4ff; padding: 2px 6px; border-radius: 4px; }
.hr-spacing-value { font-size: 11px; color: #98a2b3; font-variant-numeric: tabular-nums; }
.hr-spacing-bar-wrap { height: 8px; }
.hr-spacing-bar { height: 8px; background: #2970ff; border-radius: 2px; max-width: 100%; }

/* Radius */
.hr-radius-grid { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end; margin-top: 16px; }
.hr-radius-card { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.hr-radius-box {
  width: 56px;
  height: 56px;
  background: #eff4ff;
  border: 1px solid #84adff;
}
.hr-radius-card code { font-size: 10px; color: #155eef; background: #eff4ff; padding: 2px 5px; border-radius: 3px; }
.hr-radius-card span { font-size: 10px; color: #98a2b3; }
</style>
