import colors from './colors';

export const shadows = {
  subtle: {
    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;

export default shadows;
