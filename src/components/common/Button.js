import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import Text from './Text';

const Button = ({
  title,
  onPress,
  containerStyle,
  type,
  TextColor,
  loading,
  ...props
}) => {
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
        <Text type={type} align="center" color={TextColor}>
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
