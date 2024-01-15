import colors from './colors';
import common from './common';

export default {
  colors: {
    ...colors,
    ...common.colors,
    background: colors.primary.darkest,
    cardBackground: colors.primary.darker,
    formInputBackground: colors.primary.darker,
    formInputBackgroundDisabled: 'rgb(255, 255, 255, 0.02)',
    labelBackground: colors.primary.dark,
    modalBackground: colors.primary.darker,
    loaderBackground: 'rgb(34, 33, 40, 0.8)',
    disabledButtonBackground: 'rgb(255, 255, 255, 0.2)',

    formInputBorder: colors.primary.darker,
    formInputBorderDisabled: colors.primary.darker,

    separator: 'rgb(255, 255, 255, 0.10)',

    primaryText: colors.gray[100],
    secondaryText: colors.gray[300],
    placeholder: colors.gray[300],
    labelText: colors.primary.lighter,
  },
};
