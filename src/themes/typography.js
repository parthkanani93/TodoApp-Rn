import {moderateScale} from '../common/constants';

// App Font-Family:
const fontWeights = {
  Regular: {
    fontFamily: 'Inter-Regular',
  },
  Medium: {
    fontFamily: 'Inter-Medium',
  },
  SemiBold: {
    fontFamily: 'Inter-SemiBold',
  },
};

// App font sizes:
const fontSizes = {
  f12: {
    fontSize: moderateScale(12),
  },
  f14: {
    fontSize: moderateScale(14),
  },
  f16: {
    fontSize: moderateScale(16),
  },
  f18: {
    fontSize: moderateScale(18),
  },
  f20: {
    fontSize: moderateScale(20),
  },
  f22: {
    fontSize: moderateScale(20),
  },
  f24: {
    fontSize: moderateScale(24),
  },
  f26: {
    fontSize: moderateScale(26),
  },
  f28: {
    fontSize: moderateScale(28),
  },
  f30: {
    fontSize: moderateScale(30),
  },
  f32: {
    fontSize: moderateScale(32),
  },
  f36: {
    fontSize: moderateScale(36),
  },
};

const typography = {fontWeights, fontSizes};

export default typography;
