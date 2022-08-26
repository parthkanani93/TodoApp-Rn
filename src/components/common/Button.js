// Library Import
import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';

// Local Import
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import Text from './Text';

const Button = props => {
  const {title, onPress, containerStyle, type, textColor, loading} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[localStyle.btnContainer, styles.rowCenter, containerStyle]}
      {...props}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.border} />
      ) : (
        <Text type={type} align="center" color={textColor}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const localStyle = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(8),
    height: moderateScale(50),
  },
});

export default Button;
