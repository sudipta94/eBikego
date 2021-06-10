import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../globalStyle';
import {Createuser} from '../../service';
import {ThemeItem} from '../../themes/EBikeGoLightTheme';

const LoginView = ({Signupcall, LoginEvent}: LoginViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [email, SetEmail] = useState<string>();
  const [password, SetPassword] = useState<string>();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <View style={{margin: 20}}>
        <Text
          style={[
            {fontSize: theme.fonts.massiveFont, fontWeight: 'bold'},
            globalStyles.fontFamily,
          ]}>
          Login
        </Text>
      </View>
      <View
        style={{
          height: 50,
          width: '100%',
          borderColor: theme.colors.inputBorder,
          borderWidth: 1,
          borderRadius: theme.roundness.bigRoundness,
        }}>
        <TextInput
          onChangeText={text => SetEmail(text)}
          value={email}
          placeholder={'Email'}
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
          height: 50,
          width: '100%',
          borderColor: theme.colors.inputBorder,
          borderWidth: 1,
          borderRadius: theme.roundness.bigRoundness,
        }}>
        <TextInput
          onChangeText={text => SetPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={'Password'}
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
          width: '60%',
        }}>
        <TouchableOpacity
          onPress={() =>
            LoginEvent({
              user_email: email,
              user_password: password,
            })
          }
          style={{
            marginTop: 20,
            width: '100%',
            borderColor: theme.colors.inputBorder,
            borderWidth: 1,
            borderRadius: theme.roundness.bigRoundness,
            backgroundColor: theme.colors.primary,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primaryConstrast,
              },
              globalStyles.fontFamily,
            ]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 15,
          width: '60%',
        }}>
        <TouchableOpacity
          onPress={() => Signupcall()}
          style={{
            width: '100%',
            borderColor: theme.colors.inputBorder,
            borderWidth: 1,
            borderRadius: theme.roundness.bigRoundness,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: theme.fonts.bigFont,
                color: theme.colors.primary,
              },
              globalStyles.fontFamily,
            ]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.smallFont,
            color: theme.colors.primary,
          }}>
          Forget Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;
interface LoginViewProps {
  Signupcall?: any;
  LoginEvent?: any;
}
