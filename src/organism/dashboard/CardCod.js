import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Skeleton} from 'react-native-animated-skeleton';
import {Caption, Card, Title} from 'react-native-paper';
import Line from '../../components/Line';
import {colors} from '../../constants/colors';
import {currencyFormat} from '../../utils/formatter';

const CardCod = ({data}) => {
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
          <Title style={{color: colors.white}}>Tagihan COD</Title>
          <Caption style={{color: colors.white}}>Lihat Selengkapnya</Caption>
        </View>
        <Line />
        {data ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <View style={{flex: 1, marginRight: 16}}>
              <Text style={{color: colors.white}}>Jumlah</Text>
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
                  {data && data.count}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, marginRight: 16}}>
              <Text style={{color: colors.white}}>Nominal</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 26,
                    fontWeight: 'bold',
                  }}>
                  Rp{currencyFormat(data && data.value)}
                </Text>
              </View>
            </View>
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
                width: 200,
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

export default memo(CardCod);
