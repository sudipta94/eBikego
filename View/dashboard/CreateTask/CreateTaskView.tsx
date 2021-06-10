import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../../globalStyle';
import {ThemeItem} from '../../../themes/EBikeGoLightTheme';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {userCreateModel} from '../../../models/userModel';
const CreateTaskView = ({userList, Submit}: ViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [dateShow, SetDateShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [user, Setuser] = useState<number>();
  const [date, Setdate] = useState<any>(new Date());
  return (
    <View style={{flex: 1}}>
      <Header />
      {dateShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display="default"
          onChange={(event, selectedDate) => (
            Setdate(selectedDate), SetDateShow(false)
          )}
          onTouchCancel={() => SetDateShow(false)}
        />
      )}
      <ScrollView>
        <View
          style={{
            flex: 1,
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 20,
              minHeight: 50,
              width: '100%',
              borderColor: theme.colors.inputBorder,
              borderWidth: 1,
              borderRadius: theme.roundness.bigRoundness,
            }}>
            <TextInput
              placeholder={'Title'}
              value={title}
              onChangeText={text => setTitle(text)}
              style={[
                {
                  fontSize: theme.fonts.mediumFont,
                  paddingLeft: 10,
                },
                globalStyles.fontFamily,
              ]}></TextInput>
          </View>
          <View
            style={{
              marginTop: 20,
              minHeight: 50,
              width: '100%',
              borderColor: theme.colors.inputBorder,
              borderWidth: 1,
              borderRadius: theme.roundness.bigRoundness,
            }}>
            <TextInput
              placeholder={'Description'}
              value={desc}
              onChangeText={text => setDesc(text)}
              style={[
                {
                  fontSize: theme.fonts.mediumFont,
                  paddingLeft: 10,
                },
                globalStyles.fontFamily,
              ]}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => SetDateShow(true)}
            style={{
              marginTop: 20,
              minHeight: 50,
              width: '100%',
              paddingLeft: 15,
              justifyContent: 'center',
              borderColor: theme.colors.inputBorder,
              borderWidth: 1,
              borderRadius: theme.roundness.bigRoundness,
            }}>
            <Text style={{color: theme.colors.placeholderText}}>
              {!!date ? moment(date).format('LLL') : 'Completion Date'}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              minHeight: 50,
              width: '100%',
              borderColor: theme.colors.inputBorder,
              borderWidth: 1,
              borderRadius: theme.roundness.bigRoundness,
            }}>
            <Picker
              onValueChange={value => Setuser(+value)}
              selectedValue={user}
              style={{color: theme.colors.placeholderText}}>
              <Picker.Item label={'Select User'} value={-1} key={-1} />
              {!!userList &&
                userList.map(item => (
                  <Picker.Item
                    label={item.user_name}
                    value={item.user_id}
                    key={item.user_id}
                  />
                ))}
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() =>
              Submit({
                task_id: null,
                task_title: title,
                task_desc: desc,
                date: date,
                assign_to: user,
                status: 1,
              })
            }
            style={[
              {
                width: '50%',
                marginTop: 20,
                borderColor: theme.colors.inputBorder,
                borderWidth: 1,
                borderRadius: theme.roundness.bigRoundness,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: theme.colors.primary,
              },
              globalStyles.boxShadow,
            ]}>
            <Text
              style={[
                {
                  fontSize: theme.fonts.bigFont,
                  color: theme.colors.primaryConstrast,
                },
                globalStyles.fontFamily,
              ]}>
              Create Task
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateTaskView;

const Header = () => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        height: 55,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        paddingLeft: 40,
      }}>
      <Text
        style={[
          {
            fontSize: theme.fonts.mediumFont,
            color: theme.colors.primaryConstrast,
          },
          globalStyles.fontFamily,
        ]}>
        Create Task
      </Text>
    </View>
  );
};

interface ViewProps {
  userList?: userCreateModel[];
  Submit?: any;
}
