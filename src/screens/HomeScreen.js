//Library Import
import React, {memo, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

// Local Import
import {colors, styles} from '../themes';
import Header from '../components/common/Header';
import {Button, Text} from '../components';
import {moderateScale} from '../common/constants';
import {showPopupWithOkAndCancel} from '../utils/helpers';
import strings from '../utils/constant';
import {StackNav} from '../navigation/NavigationKeys';
import {DeleteIcon, EditIcon} from '../assets/svgs';

// Redux Actions
import {removeTodoAction} from '../redux/actions/todoActions';

const Todo = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const todos = data.todo.todos;

  // Remove Todo Item
  const onPressRemoveTodo = item => {
    showPopupWithOkAndCancel(
      strings.removeTodo,
      strings.removeTodoConfirm,
      () => dispatch(removeTodoAction(item)),
    );
  };

  // Navigate To Edit Todo Screen
  const editTodoPress = item => {
    navigation.navigate(StackNav.Add, {item: item});
  };

  // Navigate To Add Todo Screen
  const addTodoPress = () => {
    navigation.navigate(StackNav.Add);
  };

  // Render Todo List Item
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
          <EditIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            localStyles.removeTodo,
            styles.mr10,
            {backgroundColor: colors.red},
          ]}
          onPress={() => onPressRemoveTodo(item)}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    );
  });

  // Empty Todo List
  const RenderEmptyView = () => {
    return (
      <View style={localStyles.emptyView}>
        <Text align={'center'} type={'M14'}>
          {strings.emptyViewTodo}
        </Text>
      </View>
    );
  };

  // Render Todo List
  const handleRenderTodoItem = ({item}) => <RenderTodoItems item={item} />;

  //Add Todo button
  const AddTodoButton = useMemo(() => {
    return (
      <Button
        title={strings.addTodo}
        onPress={addTodoPress}
        type={'M24'}
        textColor={colors.white}
        containerStyle={localStyles.addTodoBtn}
      />
    );
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header title={strings.TodoList} />
      <View style={localStyles.mainArea}>
        {AddTodoButton}
        <Text type={'B26'}>{strings.listTodo} :</Text>
        <FlatList
          data={todos}
          style={styles.mt10}
          renderItem={handleRenderTodoItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={RenderEmptyView}
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
  emptyView: {
    ...styles.mt20,
  },
});
export default Todo;
