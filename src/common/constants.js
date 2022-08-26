import {Dimensions} from 'react-native';

let sampleHeight = 896;
let sampleWidth = 414;

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

const scale = size => (screenWidth / sampleWidth) * size;

export function moderateScale(size, factor = 0.5) {
  return size + (scale(size) - size) * factor;
}
