import { Dimensions, PixelRatio } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

const scaling = size => WINDOW_WIDTH / guidelineBaseWidth * size;

const moderateScale = (size, factor = 0.5) => size + ( scaling(size) - size ) * factor;
const scaleSize = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;
const scaleFont = (size) => Math.round(PixelRatio.roundToNearestPixel(size));
const getWidth = () => WINDOW_WIDTH;
const getHeight = () => Dimensions.get('screen').height;

export default { moderateScale, scaleSize, scaleFont, getHeight, getWidth };