import React from 'react';
import { Dimensions, View, ActivityIndicator, StyleSheet } from 'react-native';

const HomeSkeleton = () => {
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const CONTENT_WIDTH = WINDOW_WIDTH - 16;
  const SKELETON_COLOR = '#ddd';

  return (
    <View>
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={SKELETON_COLOR}
        />
      </View>
      <View style={styles.contentContainer}>
        {[1, 2, 3].map((item) => (
          <View style={styles.itemContainer} key={item}>
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color={SKELETON_COLOR}
            />
          </View>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {[1, 2, 3].map((item) => (
          <View style={styles.itemContainer} key={item}>
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color={SKELETON_COLOR}
            />
          </View>
        ))}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={SKELETON_COLOR}
          />
        </View>
        {[1, 2, 3, 4].map((item) => (
          <View style={styles.itemContainer} key={item}>
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color={SKELETON_COLOR}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: WINDOW_WIDTH * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: CONTENT_WIDTH / 3,
    height: CONTENT_WIDTH / 3,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeSkeleton;
