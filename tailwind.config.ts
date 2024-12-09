import type { Config } from 'tailwindcss'

import fs from 'fs'
import path from 'path'

// @ts-ignore
import { tailwind } from '@byte-creators/config'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  ...tailwind,
  // content: ['./node_modules/@packages/shared/src/ui/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    ...(tailwind.plugins || []),
    plugin(({ addBase, theme }) => {
      let scssVars = ''

      const generateCssVars = (config: Record<string, any>, prefix: string) => {
        Object.entries(config).forEach(([property, propertyValue]) => {
          if (property === 'global-hover' || property === 'no-hover') {
            return
          }
          if (
            typeof propertyValue === 'object' &&
            propertyValue !== null &&
            !Array.isArray(propertyValue)
          ) {
            Object.entries(propertyValue).forEach(([shade, shadeValue]) => {
              if (typeof shadeValue === 'string') {
                scssVars += `$${prefix}-${property}-${shade}: ${shadeValue};\n`
                addBase({
                  ':root': {
                    [`--${prefix}-${property}-${shade}`]: shadeValue,
                  },
                })
              }
            })
          } else if (Array.isArray(propertyValue)) {
            const [size, { lineHeight }] = propertyValue

            scssVars += `$${prefix}-${property}: ${size};\n`
            scssVars += `$${prefix}-${property}-line-height: ${lineHeight};\n`

            addBase({
              ':root': {
                [`--${prefix}-${property}`]: size,
                [`--${prefix}-${property}-line-height`]: lineHeight,
              },
            })
          } else {
            scssVars += `$${prefix}-${property}: ${propertyValue};\n`
            addBase({
              ':root': {
                [`--${prefix}-${property}`]: propertyValue,
              },
            })
          }

          fs.writeFileSync(path.resolve(__dirname, 'src', 'styles', 'vars.scss'), scssVars, 'utf8')
        })
      }

      if (theme('colors')) {
        generateCssVars(theme('colors'), 'color')
      }
      if (theme('fontSize')) {
        generateCssVars(theme('fontSize'), 'font-size')
      }
      if (theme('screens')) {
        generateCssVars(theme('screens'), 'screen')
      }
    }),
  ],
}

export default config
