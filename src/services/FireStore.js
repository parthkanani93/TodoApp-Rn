import firestore from '@react-native-firebase/firestore';

export const getTodoListItem = async () => {
  return await firestore()
    .collection('Todo')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({id: doc.id, ...doc.data()});
      });
      console.log('querySnapshot====>', data);
      return data;
    });
};
