import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {moderateScale} from '../../common/constants';
import {colors} from '../../themes';
import Text from './Text';

const Toast = props => {
  const {children, show, onToastHide, speed = 'slow'} = props;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(
        () => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
          onToastHide();
        },
        speed === 'fast' ? 1000 : 3000,
      );
    }
  }, [show]);

  return (
    <Animated.View style={{...styles.toastContainer, opacity}}>
      <Text color={colors.white} type={'r14'}>
        {children}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    top: '90%',
    alignSelf: 'center',
    backgroundColor: colors.onBoardingSubTitleText,
  },
});

export default Toast;
