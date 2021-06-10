import {DefaultTheme} from '@react-navigation/native';

const EbikeGoLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3a3377',
    primaryTint: '#4e4785',
    primaryShade: '#332d69',
    primaryConstrast: 'rgb(255, 255, 255)',
    secondary: '#f5bb0f',
    secondaryTint: '#ffdb70',
    secondaryShade: '#ffa600',
    secondaryConstrast: 'rgb(0, 0, 0)',
    tertiary: '#76BA1B',
    tertiaryTint: '#a1d45d',
    tertiaryShade: '#2A4A00',
    tertiaryConstrast: 'rgb(255, 255, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    cardalt: 'rgb(245, 245, 245)',
    cardprimary: '#3a3377',
    border: 'rgb(194, 206, 209)',
    notification: 'rgb(255, 69, 58)',
    text: 'rgb(41,108,185)',
    dark: '#141414',
    darkTint: '#959595',
    darkShade: '#000000',
    transparent: 'rgba(0, 0, 0, 0)',
    danger: 'rgb(179, 40, 30)',
    success: '#76BA1B',
    placeholderText: 'rgb(141, 160, 166)',
    errorToast: '#b3281e',
    messageToast: '#707070',
    inputBorder: 'rgba(141, 160, 166, 0.4)',
  },
  fonts: {
    massiveFont: 26,
    bigFont: 20,
    mediumFont: 18,
    smallFont: 16,
    extraSmallFont: 14,
    extremeSmallFont: 12,
  },
  icons: {
    massiveIcon: 50,
    bigIcon: 36,
    mediumIcon: 26,
    smallIcon: 18,
    extraSmallIcon: 14,
  },
  roundness: {
    bigRoundness: 30,
    mediumRoundness: 12,
    smallRoundness: 5,
  },
};

export default EbikeGoLightTheme;

export interface ThemeItem {
  colors: Colors;
  fonts: Fonts;
  icons: Icons;
  roundness: Roundness;
}

interface Roundness {
  bigRoundness: number;
  mediumRoundness: number;
  smallRoundness: number;
}

interface Icons {
  massiveIcon: number;
  bigIcon: number;
  mediumIcon: number;
  smallIcon: number;
  extraSmallIcon: number;
}

interface Fonts {
  massiveFont: number;
  bigFont: number;
  mediumFont: number;
  smallFont: number;
  extraSmallFont: number;
  extremeSmallFont: number;
}

interface Colors {
  primary: string;
  primaryTint: string;
  primaryShade: string;
  primaryConstrast: string;
  secondary: string;
  secondaryTint: string;
  secondaryShade: string;
  secondaryConstrast: string;
  background: string;
  card: string;
  cardalt: string;
  cardprimary: string;
  border: string;
  notification: string;
  text: string;
  transparent: string;
  danger: string;
  success: string;
  placeholderText: string;
  errorToast: string;
  messageToast: string;
  inputBorder: string;
  dark: string;
  darkTint: string;
  darkShade: string;
  tertiary: string;
  tertiaryTint: string;
  tertiaryShade: string;
  tertiaryConstrast: string;
}
