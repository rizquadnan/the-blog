import { extendTheme } from '@chakra-ui/react'

import { VStack } from './VStackConfig'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'dark',
  },
  components: { VStack },
})

export default theme
