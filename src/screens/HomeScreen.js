//Library Import
import React, {memo, useMemo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

// Local Import
import {colors, styles} from '../themes';
import Header from '../components/common/Header';
import {Button, Loader, Text} from '../components';
import {moderateScale} from '../common/constants';
import {showPopupWithOkAndCancel} from '../utils/helpers';
import strings from '../utils/constant';
import {StackNav} from '../navigation/NavigationKeys';
import {DeleteIcon, EditIcon} from '../assets/svgs';

// Redux Actions
import {
  removeTodoAction,
  addFireStoreDataAction,
} from '../redux/actions/todoActions';

// FireStore Actions
import {deleteTodoItem, getTodoListItem} from '../services/FireStore';

const Todo = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const todos = data.todo.todos;

  useEffect(() => {
    getTodoData();
  }, []);

  // Get Todo Data from FireStore
  const getTodoData = async () => {
    try {
      setIsLoading(true);
      const data = await getTodoListItem();
      if (data) {
        // add all data to initial Store
        dispatch(addFireStoreDataAction(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove Todo Item
  const onPressRemoveTodo = item => {
    //Remove Todo Action
    const deleteTodo = async () => {
      //Remove Todo Item from FireStore
      const {success, error} = await deleteTodoItem(item?.id);
      if (success) {
        // Remove From Redux Store
        dispatch(removeTodoAction(item));
      } else {
        showPopupWithOk(strings.addTodo, error);
      }
    };

    // Alert for Confirmation
    showPopupWithOkAndCancel(
      strings.removeTodo,
      strings.removeTodoConfirm,
      deleteTodo,
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
        {/* Todo Text */}
        <View style={localStyles.todoText}>
          <Text type={'R14'}>{item.task}</Text>
        </View>
        {/* Edit Todo */}
        <TouchableOpacity
          style={[localStyles.removeTodo, {backgroundColor: colors.green}]}
          onPress={() => editTodoPress(item)}>
          <EditIcon />
        </TouchableOpacity>
        {/* Delete Todo  */}
        <TouchableOpacity
          style={[localStyles.removeTodo, {backgroundColor: colors.red}]}
          onPress={() => onPressRemoveTodo(item)}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    );
  });

  // Empty Todo List
  const RenderEmptyView = () => {
    if (!isLoading) {
      return (
        <View style={localStyles.emptyView}>
          <Text align={'center'} type={'M14'}>
            {strings.emptyViewTodo}
          </Text>
        </View>
      );
    }
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
      {/* Header */}
      <Header title={strings.TodoList} />
      {/* Main Body */}
      <View style={localStyles.mainArea}>
        {/* Add Todo Button */}
        {AddTodoButton}
        {/* Title */}
        <Text type={'B26'}>{strings.listTodo} :</Text>
        {/* Todo List Items */}
        <FlatList
          data={todos}
          style={styles.mt10}
          renderItem={handleRenderTodoItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={RenderEmptyView}
        />
      </View>
      {isLoading && <Loader />}
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
    ...styles.mr10,
  },
  emptyView: {
    ...styles.mt20,
  },
});

export default Todo;
