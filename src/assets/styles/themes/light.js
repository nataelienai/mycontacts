import colors from './colors';
import common from './common';

export default {
  colors: {
    ...colors,
    ...common.colors,
    background: colors.primary.lightest,
    cardBackground: '#FFF',
    formInputBackground: '#FFF',
    formInputBackgroundDisabled: colors.gray[100],
    labelBackground: colors.primary.lighter,
    modalBackground: '#FFF',
    loaderBackground: 'rgb(246, 245, 252, 0.8)',
    disabledButtonBackground: '#CCC',

    formInputBorder: '#FFF',
    formInputBorderDisabled: colors.gray[200],

    separator: 'rgb(0, 0, 0, 0.05)',

    primaryText: colors.gray[900],
    secondaryText: colors.gray[200],
    placeholder: colors.gray[200],
    labelText: colors.primary.main,
  },
};
