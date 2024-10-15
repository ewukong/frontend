import { useMediaQuery } from 'react-responsive'

import { responsiveConfig } from '@/config/responsive'

export const useResponsive = () => ({
  isSm: useMediaQuery({ minWidth: responsiveConfig.isSm }),
  isMd: useMediaQuery({ minWidth: responsiveConfig.isMd }),
  isLg: useMediaQuery({ minWidth: responsiveConfig.isLg }),
  isXl: useMediaQuery({ minWidth: responsiveConfig.isXl }),

  isMaxSm: useMediaQuery({ maxWidth: responsiveConfig.isSm }),
  isMaxMd: useMediaQuery({ maxWidth: responsiveConfig.isMd }),
  isMaxLg: useMediaQuery({ maxWidth: responsiveConfig.isLg }),
  isMaxXl: useMediaQuery({ maxWidth: responsiveConfig.isXl }),
})
