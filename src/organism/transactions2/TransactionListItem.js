import React, {memo, useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {Checkbox, Divider, List} from 'react-native-paper';
import {colors} from '../../constants/colors';
import {currencyFormat} from '../../utils/formatter';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionListItem = ({
  onPress,
  item,
  isSelected,
  option,
  deleteSelected,
  addSelected,
}) => {
  const [totalDuration, setTotalDuration] = useState(0);
  useEffect(() => {
    // Coundown timer for a given expiry date-time
    let date = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

    // Getting the current date-time
    // You can set your own date-time
    let expirydate = item.bracket_date + ' ' + item.ec_bracket_end;

    let diffr = moment.duration(moment(expirydate).diff(moment(date)));
    // Difference of the expiry date-time
    var hours = Number(diffr.asHours());
    var minutes = Number(diffr.minutes());
    var seconds = Number(diffr.seconds());

    // Converting in seconds
    var d = hours * 60 * 60 + minutes * 60 + seconds;

    // Settign up the duration of countdown
    setTotalDuration(d);
  }, []);
  return (
    <>
      <List.Item
        style={{
          backgroundColor: isSelected ? colors.grayLight : colors.white,
        }}
        onPress={onPress}
        title={`[${item.sourcename}] ${item.custname.toUpperCase()}`}
        titleStyle={{fontSize: 16}}
        titleNumberOfLines={2}
        descriptionNumberOfLines={3}
        description={item.trxno}
        right={() => (
          <View style={{position: 'absolute', right: 0, top: 0}}>
            {option === 'cod' && (
              <Checkbox
                color={colors.primary}
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() =>
                  isSelected ? deleteSelected(item) : addSelected(item)
                }
              />
            )}
            {totalDuration > 0 && Number(item.status) === 4 && (
              <CountDown
                onPress={() =>
                  Alert.alert(
                    'Kirim sebelum:',
                    item.bracket_date + ' ' + item.ec_bracket_end,
                  )
                }
                until={totalDuration}
                timetoShow={('H', 'M', 'S')}
                digitStyle={{backgroundColor: colors.primary}}
                digitTxtStyle={{color: colors.white}}
                timeLabelStyle={{color: colors.primary, fontWeight: 'bold'}}
                size={12}
              />
            )}
          </View>
        )}
      />
      <Divider />
    </>
  );
};

export default memo(TransactionListItem);
