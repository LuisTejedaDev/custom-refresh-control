import DeviceInfo from 'react-native-device-info'

const {isTablet} = DeviceInfo

export const primary = '#5AB821'
export const secondary = '#51A71E'

export const dIsTablet = isTablet()
export const MAX_SWIPE_SCROLL = 155