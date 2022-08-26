// Library Imports
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Local Imports
import {colors, styles} from '../../themes';
import Text from './Text';

function Header(props) {
  const {title, isBack} = props;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <View style={localStyles.container}>
      {isBack && (
        <TouchableOpacity onPress={goBack}>
          <Text type={'M24'} color={colors.black}>
            {'<'}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.ml10} type={'M24'}>
        {title}
      </Text>
    </View>
  );
}

export default React.memo(Header);

const localStyles = StyleSheet.create({
  container: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.ph20,
    ...styles.pv15,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
});
