import React, {memo} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Skeleton} from 'react-native-animated-skeleton';
import {Card, Title} from 'react-native-paper';
import Line from '../../components/Line';
import {colors} from '../../constants/colors';

const CardAchievement = ({data}) => {
  return (
    <Card
      style={{
        backgroundColor: colors.primary,
        borderRadius: 14,
        elevation: 10,
      }}>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Title style={{color: colors.white}}>Pencapaian Anda</Title>
        </View>
        <Line />
        {data ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <TouchableOpacity
              style={{flex: 1, marginRight: 16}}
              onPress={() =>
                Alert.alert(
                  'Hari Ini',
                  'Jumlah paket yang telah anda pickup hari ini',
                )
              }>
              <Text style={{color: colors.white}}>Hari Ini</Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 32,
                  fontWeight: 'bold',
                }}>
                {data && data.daily}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, marginRight: 16}}
              onPress={() =>
                Alert.alert(
                  'Bulan Ini',
                  'Jumlah paket yang telah anda pickup bulan ini',
                )
              }>
              <Text style={{color: colors.white}}>Bulan Ini</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 32,
                    fontWeight: 'bold',
                  }}>
                  {data && data.monthly}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <Skeleton
              loaderStyle={{
                borderRadius: 4,
                width: 80,
                height: 40,
                backgroundColor: '#ddd',
              }}
              numberOfItems={1}
            />
            <Skeleton
              loaderStyle={{
                borderRadius: 4,
                width: 80,
                height: 40,
                backgroundColor: '#ddd',
              }}
              numberOfItems={1}
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default memo(CardAchievement);
