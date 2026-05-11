/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'SpaceMono_700Bold',
    serif: 'SpaceMono_700Bold',
    rounded: 'SpaceMono_700Bold',
    mono: 'SpaceMono_700Bold',
  },
  default: {
    sans: 'SpaceMono_700Bold',
    serif: 'SpaceMono_700Bold',
    rounded: 'SpaceMono_700Bold',
    mono: 'SpaceMono_700Bold',
  },
  web: {
    sans: "'SpaceMono_700Bold', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "'SpaceMono_700Bold', Georgia, 'Times New Roman', serif",
    rounded: "'SpaceMono_700Bold', 'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "'SpaceMono_700Bold', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
