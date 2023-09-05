import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const ListSkeleton = () => {
  const CONTENT_WIDTH = Dimensions.get('window').width - 32;
  const SKELETON_COLOR = '#ddd';

  return (
    <>
      <View style={styles.listItemContainer}>
        <View style={[styles.skeletonLoader, { width: CONTENT_WIDTH * 0.3 }]} />
        <View style={[styles.skeletonLoader, { width: CONTENT_WIDTH * 0.7 }]} />
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  skeletonLoader: {
    backgroundColor: '#ddd',
    height: 20,
    borderRadius: 4,
    marginVertical: 4,
  },
});

export default ListSkeleton;
