import React from 'react';
import { Dimensions, View, ActivityIndicator, StyleSheet } from 'react-native';

const ProductSkeleton = () => {
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const CONTENT_WIDTH = WINDOW_WIDTH - 32;
  const SKELETON_COLOR = '#ddd';

  return (
    <View>
      <View style={[styles.loader, { width: WINDOW_WIDTH, height: WINDOW_WIDTH }]} />
      <View style={styles.contentContainer}>
        <View style={[styles.skeletonLoader, { width: CONTENT_WIDTH * 0.3, height: 22 }]} />
        <View style={[styles.skeletonLoader, { width: CONTENT_WIDTH * 0.7, height: 22 }]} />
        <View style={styles.descriptionContainer}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={[styles.skeletonLoader, { width: CONTENT_WIDTH, height: 14, marginBottom: 4 }]} />
          ))}
        </View>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={SKELETON_COLOR} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    backgroundColor: '#ddd',
  },
  contentContainer: {
    padding: 16,
  },
  skeletonLoader: {
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
  descriptionContainer: {
    marginVertical: 8,
  },
  activityIndicatorContainer: {
    height: 100,
    justifyContent: 'center',
  },
});

export default ProductSkeleton;
