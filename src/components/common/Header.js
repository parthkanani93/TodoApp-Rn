// Library Imports
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Local Imports
import {colors, styles} from '../../themes';
import Text from './Text';
import {BackIcon} from '../../assets/svgs';

function Header(props) {
  const {title, isBack} = props;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <View style={localStyles.container}>
      {isBack && (
        <TouchableOpacity onPress={goBack}>
          <BackIcon width={30} height={30} />
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
