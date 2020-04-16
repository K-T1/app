import { css } from 'styled-components'

export enum fontSizes {
  large7 = 48,
  large6 = 36,
  large5 = 32,
  large4 = 28,
  large3 = 24,
  large2 = 20,
  large1 = 18,
  normal = 16,
  small1 = 14,
  small2 = 12,
  small3 = 10,
}

export enum lineHeights {
  large7 = 72,
  large6 = 54,
  large5 = 44,
  large4 = 40,
  large3 = 36,
  large2 = 32,
  large1 = 28,
  normal = 24,
  small1 = 20,
  small2 = 16,
  small3 = 14,
}

export const textSizes = Object.keys(fontSizes).reduce((accTextSizes, size) => {
  accTextSizes[size] = css`
    font-size: ${fontSizes[size]};
    line-height: ${lineHeights[size]};
  `
  return accTextSizes
}, {}) as typeof fontSizes

export enum spaces {
  large12 = '200px',
  large11 = '160px',
  large10 = '144px',
  large9 = '128px',
  large8 = '96px',
  large7 = '80px',
  large6 = '64px',
  large5 = '48px',
  large4 = '32px',
  large3 = '24px',
  large2 = '16px',
  large1 = '12px',
  normal = '8px',
  small1 = '4px',
  small2 = '2px',
  small3 = '1px',
}
