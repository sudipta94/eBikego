import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import globalStyles from '../../globalStyle';
import {ThemeItem} from '../../themes/EBikeGoLightTheme';

const SignupView = ({Goback, SingUp}: SignupViewProps) => {
  const theme: ThemeItem = Object(useTheme());
  const [name, SetName] = useState<string>();
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
          Signup
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
          placeholder={'Name'}
          onChangeText={text => SetName(text)}
          value={name}
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
            SingUp({
              user_email: email,
              user_name: name,
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
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => Goback()}
        style={{
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: theme.fonts.smallFont,
            color: theme.colors.primary,
          }}>
          Back to Login?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupView;

interface SignupViewProps {
  Goback?: any;
  SingUp?: any;
}
