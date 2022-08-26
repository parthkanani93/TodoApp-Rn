import React, {memo, useState} from 'react';
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
import {StackNav} from '../navigation/NavigationKeys';

const Todo = ({navigation}) => {
  const [todoValue, setTodoValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const todos = data.todo.todos;

  const removeTodoPress = item => {
    showPopupWithOkAndCancel(
      strings.removeTodo,
      strings.removeTodoConfirm,
      () => dispatch(removeTodoAction(item)),
    );
  };

  const editTodoPress = item => {
    navigation.navigate(StackNav.Add, {item: item});
  };

  const addTodoPress = () => {
    navigation.navigate(StackNav.Add);
  };

  const RenderTodoItems = memo(({item}) => {
    return (
      <View style={localStyles.todoView}>
        <View style={localStyles.todoText}>
          <Text type={'R14'}>{item.text}</Text>
        </View>
        <TouchableOpacity
          style={[
            localStyles.removeTodo,
            styles.mr10,
            {backgroundColor: colors.green},
          ]}
          onPress={() => editTodoPress(item)}>
          <Text>E</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            localStyles.removeTodo,
            styles.mr10,
            {backgroundColor: colors.red},
          ]}
          onPress={() => removeTodoPress(item)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.mainContainer}>
      <Header title={strings.TodoList} />
      <View style={localStyles.mainArea}>
        <Button
          title={strings.addTodo}
          onPress={addTodoPress}
          type={'M24'}
          TextColor={colors.white}
          containerStyle={localStyles.addTodoBtn}
        />

        <Text type={'B26'}>{strings.listTodo} :</Text>
        <FlatList
          data={todos}
          style={styles.mt10}
          renderItem={({item}) => <RenderTodoItems item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View style={localStyles.emptyView}>
                <Text align={'center'} type={'M14'}>
                  {strings.emptyViewTodo}
                </Text>
              </View>
            );
          }}
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
    ...styles.mb20,
  },
  todoView: {
    ...styles.flex,
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  todoText: {
    ...styles.flex,
    ...styles.ph10,
    ...styles.pv10,
    ...styles.mr15,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    backgroundColor: colors.lightGray,
  },
  removeTodo: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(5),
    ...styles.center,
  },
  editBtns: {
    ...styles.mv20,
    width: '48%',
  },
  emptyView: {
    ...styles.mt20,
  },
});
export default Todo;
