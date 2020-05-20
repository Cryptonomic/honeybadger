/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Input, Button, Item, Text } from 'native-base';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { Snackbar } from 'react-native-paper';
import TransportHID from '@ledgerhq/react-native-hid';
import { TezosConseilClient } from 'conseiljs';
import { KeyStoreUtils } from 'conseiljs-ledgersigner';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const serverInfo = {
  url: 'https://conseil-dev.cryptonomic-infra.tech:443',
  apiKey: 'galleon',
  network: 'carthagenet'
};

const derivationPath = `44'/1729'/0'/0'/0'`;

const App: () => React$Node = () => {
  const [text, setText] = useState('tz3gN8NTLNLJg5KRsUU47NHNVHbdhcFXjjaB');
  const [balance, setBalance] = useState(0);
  const [secureTxt, setSecureTxt] = useState('');
  const [localHash, setLocalHash] = useState('');
  const [pkh, setPkh] = useState('');
  const [open, setOpen] = useState(false);

  async function getBalance() {
    const newBal = await TezosConseilClient.getAccount(serverInfo, serverInfo.network, text)
    .catch((err) => {
      return {balance: 0}
    });
    setBalance(newBal.balance);
  }

  async function onSaveToStorage() {
    const result = await RNSecureStorage.set('hash', secureTxt, {accessible: ACCESSIBLE.WHEN_UNLOCKED});
    console.log('save------', result);
  }

  async function onGetFromStorage() {
    const newHash = await RNSecureStorage.get('hash');
    setLocalHash(newHash);
  }
  async function onGetLederAddress() {
    const devicesList = await TransportHID.list();
    if (devicesList.length === 0) {
      setOpen(true);

    } else {
      const newKeyStore = await KeyStoreUtils.unlockAddress(derivationPath).catch(() => {
        return {
          publicKeyHash: ''
        }
      });
      setPkh(newKeyStore.publicKeyHash);
    }
    
  }

  return (
    <>
      <Container style={styles.main}>
        <Item regular>
          <Input
            style={styles.input}
            placeholder="Type here address!"
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
        </Item>
        <Text style={styles.balanceTitle}>
          {balance}
        </Text>
        <Button style={styles.button} onPress={() => getBalance()}>
          <Text style={styles.buttonText}>Get</Text>
        </Button>
      </Container>
      <Container style={styles.main}>
        <Item regular>
          <Input
            style={styles.input}
            placeholder="Type here hash!"
            onChangeText={txt => setSecureTxt(txt)}
            value={secureTxt}
          />
        </Item>

        <Text style={styles.balanceTitle}>
          Saved Value: {localHash}
        </Text>

        <Container style={styles.buttonGr}>
          <Button style={styles.secureBtn} onPress={() => onSaveToStorage()}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <Button style={styles.secureBtn} onPress={() => onGetFromStorage()}>
            <Text style={styles.buttonText}>Get</Text>
          </Button>
        </Container>
          
      </Container>

      <Container style={styles.main}>
          <Text style={styles.balanceTitle}>
            PublicKeyHash: {pkh}
          </Text>

          <Button style={styles.button} onPress={() => onGetLederAddress()}>
            <Text style={styles.buttonText}>Connect Ledger</Text>
          </Button>
          
      </Container>
      <Snackbar
        visible={open}
        duration={3000}
        onDismiss={()=>setOpen(false)}
      >
        Ledger device not found
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3
  },
  main: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    justifyContent: "center"
  },
  balanceTitle: {
    marginTop: 32,
    fontSize: 24
  },
  button: {
    marginTop: 32
  },
  buttonText: {
    width: '100%',
    textAlign: 'center'
  },
  buttonGr: {
    flexDirection: 'row',
    marginTop: 32,
    justifyContent: 'space-between'
  },
  secureBtn: {
    width: '40%'
  }
});

export default App;
