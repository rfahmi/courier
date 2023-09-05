import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

const PageSkeleton = () => {
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const CONTENT_WIDTH = WINDOW_WIDTH - 32;
  const SKELETON_COLOR = '#ddd';

  return (
    <View>
      <View style={styles.headerLoader} />
      <View style={styles.contentContainer}>
        {[1, 2, 3].map((item) => (
          <View style={styles.itemContainer} key={item} />
        ))}
        {[1, 2, 3].map((item) => (
          <View style={styles.itemContainer} key={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLoader: {
    width: '100%',
    aspectRatio: 4 / 1,
    backgroundColor: '#ddd',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    width: CONTENT_WIDTH / 3,
    height: CONTENT_WIDTH / 3,
    margin: 4,
    backgroundColor: '#ddd',
  },
});

export default PageSkeleton;
