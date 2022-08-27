//Library Imports
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal} from 'react-native';

//Local Imports
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';

//Loader Component
const Loader = () => {
  return (
    <Modal transparent>
      <View style={localStyles.vwMainStyle}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  vwMainStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    ...styles.center,
  },
  vwLoaderSubStyle: {
    padding: moderateScale(30),
    borderRadius: moderateScale(5),
  },
});

export default React.memo(Loader);
