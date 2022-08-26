import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {
  addNewToDoAction,
  editTodoAction,
  removeTodoAction,
} from '../redux/actions/todoActions';
import {colors, styles} from '../themes';
import Header from '../components/common/Header';
import {Button, Input, Text} from '../components';
import {moderateScale} from '../common/constants';
import {showPopupWithOk, showPopupWithOkAndCancel} from '../utils/helpers';
import strings from '../utils/constant';

const Todo = ({navigation, route}) => {
  const [todoValue, setTodoValue] = useState('');
  const dispatch = useDispatch();
  const item = route.params?.item;

  useEffect(() => {
    if (item) {
      setTodoValue(item.text);
    }
  }, []);

  const addTodoPress = () => {
    if (item) {
      if (todoValue.trim()) {
        dispatch(
          editTodoAction({
            id: item.id,
            text: todoValue.trim(),
          }),
        );
        navigation.goBack();
      } else {
        showPopupWithOk(strings.removeTodo, strings.emptyTodo);
      }
    } else {
      if (todoValue.trim()) {
        dispatch(addNewToDoAction(todoValue.trim()));
        navigation.goBack();
      } else {
        showPopupWithOk(strings.removeTodo, strings.emptyTodo);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header isBack title={item ? strings.editTodo : strings.addTodo} />
      <View style={localStyles.mainArea}>
        <Input
          value={todoValue}
          placeholder={strings.addTodoHere}
          onChangeText={text => setTodoValue(text)}
        />
        <Button
          title={item ? strings.save : strings.addTodo}
          onPress={addTodoPress}
          type={'M24'}
          TextColor={colors.white}
          containerStyle={localStyles.addTodoBtn}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  mainArea: {
    ...styles.flex,
    ...styles.ph20,
    ...styles.pv30,
  },
  addTodoBtn: {
    ...styles.mv20,
  },
});
export default Todo;
