'use strict';
import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import TouchID from "react-native-touch-id";

export interface State {
    biometryType: any
}

export interface Props {
    
}

export default class FingerPrint extends Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      biometryType: null
    };
  }

  componentDidMount() {
    TouchID.isSupported()
    .then(biometryType => {
      this.setState({ biometryType });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.btn}
          onPress={this.clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>
            {`Authenticate with ${this.state.biometryType}`}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  clickHandler() {
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
        Alert.alert('TouchID not supported');
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7'
  }
});

function authenticate() {
  return TouchID.authenticate()
    .then((success: any) => {
        Alert.alert('Authenticated Successfully');
    })
    .catch((error: any) => {
      console.log(error)
      Alert.alert(error.message);
    });
}