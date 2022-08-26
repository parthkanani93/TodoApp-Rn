import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import Text from './Text';

const Input = props => {
  let {
    value,
    inputContainerStyle,
    inputBoxStyle,
    onChangeText,
    placeHolder,
    maxLength,
  } = props;

  return (
    <View style={[localStyle.inputContainer, inputContainerStyle]}>
      <TextInput
        value={value}
        maxLength={maxLength}
        defaultValue={value}
        autoCorrect={false}
        placeholderTextColor={colors.placeHolder}
        onChangeText={onChangeText}
        placeholder={placeHolder}
        style={[localStyle.inputBox, inputBoxStyle]}
        {...props}
      />
      {maxLength && value?.length >= maxLength ? (
        <Text type={'R14'} style={localStyle.errorText}>
          It should be maximum {maxLength} character
        </Text>
      ) : null}
    </View>
  );
};

const localStyle = StyleSheet.create({
  inputBox: {
    width: '100%',
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Regular,
    ...styles.ph10,
    height: moderateScale(50),
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    borderColor: colors.inputBorder,
    height: moderateScale(50),
  },
  errorText: {
    color: colors.red,
    textAlign: 'left',
    ...styles.mt5,
  },
});

export default Input;
