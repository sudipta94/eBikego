import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../globalStyle';
import {ThemeItem} from '../../themes/EBikeGoLightTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {userCreateModel} from '../../models/userModel';
const ProfileView = ({user, LogOut}: profileViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 40,
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: theme.colors.primaryConstrast,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            color={theme.colors.darkTint}
            name={'person-circle-outline'}
            size={100}
          />
        </View>
        <Text
          style={{
            color: theme.colors.primaryConstrast,
            fontSize: theme.fonts.mediumFont,
          }}>
          {user?.user_name}
        </Text>
        <Text
          style={{
            color: theme.colors.primaryConstrast,
            fontSize: theme.fonts.mediumFont,
          }}>
          {user?.user_email}
        </Text>
      </View>
      <View
        style={{
          flex: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => LogOut()}
          style={[
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.roundness.mediumRoundness,
            },
            globalStyles.boxShadow,
          ]}>
          <Text
            style={{
              padding: 10,
              fontSize: theme.fonts.mediumFont,
              color: theme.colors.primaryConstrast,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileView;

interface profileViewProps {
  user?: userCreateModel;
  LogOut?: any;
}
