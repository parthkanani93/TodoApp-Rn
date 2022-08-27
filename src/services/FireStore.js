import firestore from '@react-native-firebase/firestore';

// Get All TodoList from FireStore
const getTodoListItem = async () => {
  return await firestore()
    .collection('Todo')
    .get()
    .then(querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({id: doc.id, ...doc.data()});
      });
      return data;
    });
};

// Set TodoList to FireStore
const addTodoItem = async data => {
  return await firestore()
    .collection('Todo')
    .add(data)
    .then(() => {
      return {success: true};
    })
    .catch(error => {
      return {success: false, error: error};
    });
};

// Update TodoList to FireStore
const updateTodoItem = async (id, data) => {
  return await firestore()
    .collection('Todo')
    .where('id', '==', id)
    .get()
    .then(querySnapshot => {
      let docId = querySnapshot.docs[0].id;
      return firestore()
        .collection('Todo')
        .doc(docId)
        .update(data)
        .then(() => {
          return {success: true};
        })
        .catch(error => {
          return {success: false, error: error};
        });
    });
};

// Delete TodoList to FireStore
const deleteTodoItem = async id => {
  return await firestore()
    .collection('Todo')
    .where('id', '==', id)
    .get()
    .then(querySnapshot => {
      let docId = querySnapshot.docs[0].id;
      return firestore()
        .collection('Todo')
        .doc(docId)
        .delete()
        .then(() => {
          return {success: true};
        })
        .catch(error => {
          return {success: false, error: error};
        });
    });
};

export {getTodoListItem, addTodoItem, updateTodoItem, deleteTodoItem};
