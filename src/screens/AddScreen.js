// Library Import
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';

// Local Import
import {colors, styles} from '../themes';
import Header from '../components/common/Header';
import {Button, Input} from '../components';
import {showPopupWithOk} from '../utils/helpers';
import strings from '../utils/constant';

// Redux Actions
import {addNewToDoAction, editTodoAction} from '../redux/actions/todoActions';
import {addTodoItem, updateTodoItem} from '../services/FireStore';

const Todo = props => {
  const {navigation, route} = props;
  const [todoValue, setTodoValue] = useState('');
  // Redux Action Dispatcher
  const dispatch = useDispatch();
  // Todo item get from route params
  const item = route.params?.item;

  // It todo item is get then set to the initial state
  useEffect(() => {
    if (item) {
      setTodoValue(item.task);
    }
  }, []);

  // onPress Add-save Todo Press
  const addTodoPress = async () => {
    if (item) {
      if (todoValue.trim()) {
        const editTodoData = {
          id: item.id,
          task: todoValue.trim(),
        };
        const {success, error} = await updateTodoItem(item.id, editTodoData);
        if (success) {
          dispatch(editTodoAction(editTodoData));
          navigation.goBack();
        } else {
          showPopupWithOk(strings.editTodo, error);
        }
      } else {
        showPopupWithOk(strings.removeTodo, strings.emptyTodo);
      }
    } else {
      if (todoValue.trim()) {
        const addTodoData = {
          id: Math.random(),
          task: todoValue.trim(),
        };
        const {success, error} = await addTodoItem(addTodoData);
        if (success) {
          dispatch(addNewToDoAction(addTodoData));
          navigation.goBack();
        } else {
          showPopupWithOk(strings.addTodo, error);
        }
      } else {
        showPopupWithOk(strings.removeTodo, strings.emptyTodo);
      }
    }
  };

  //Add-Save Todo button
  const TodoButton = useMemo(() => {
    return (
      <Button
        title={item ? strings.save : strings.addTodo}
        onPress={addTodoPress}
        type={'M24'}
        textColor={colors.white}
        containerStyle={localStyles.addTodoBtn}
      />
    );
  }, [item, todoValue]);

  // handle input text change
  const onHandleInputChange = text => setTodoValue(text);

  return (
    <View style={styles.mainContainer}>
      <Header isBack title={item ? strings.editTodo : strings.addTodo} />
      <View style={localStyles.mainArea}>
        <Input
          value={todoValue}
          placeholder={strings.addTodoHere}
          onChangeText={onHandleInputChange}
        />
        {TodoButton}
      </View>
    </View>
  );
};

// Local Styles
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
