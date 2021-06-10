import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModels';
import globalStyles from '../../globalStyle';
import Spinner from 'react-native-spinkit';
import {ThemeItem} from '../../themes/EBikeGoLightTheme';

const SpinnerView = (props: any) => {
  console.log(props);

  const theme: ThemeItem = Object(useTheme());
  const styles = StyleSheet.create({
    spinnerContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 999,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return props.loading ? (
    <View style={styles.spinnerContainer}>
      <View>
        <Spinner
          color={'#fff'}
          size={120}
          type="9CubeGrid"
          isVisible={props.loading}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps)(SpinnerView);
