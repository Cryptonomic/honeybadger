/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Input, Button, Item, Content, Text } from 'native-base';

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

const App: () => React$Node = () => {
  const [text, setText] = useState('tz3gN8NTLNLJg5KRsUU47NHNVHbdhcFXjjaB');
  const [balance, setBalance] = useState(0);


  function getQuery() {
    return {
      aggregation: [],
      fields: [],
      limit: 1,
      orderBy: [],
      predicates: [
        {
          field: 'account_id',
          inverse: false,
          operation: 'eq',
          set: [text]
        }
      ]
    }
  }

  async function getBalanceApi() {
    const url = `${serverInfo.url}/v2/data/tezos/${serverInfo.network}/accounts`;
    const query = getQuery();
    return fetch(url, {
      method: 'post',
      headers: { 'apiKey': serverInfo.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    })
    .then((r) => r.json())
    .then((responseJson) => {
      console.log('newBal---', responseJson);
      return responseJson[0].balance
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
  }

  async function getBalance() {
    const newBal = await getBalanceApi();
    setBalance(newBal);
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
    paddingVertical: 50,
    backgroundColor: Colors.white,
    justifyContent: "center"
  },
  balanceTitle: {
    marginTop: 32,
    fontSize: 24
  },
  button: {
    marginTop: 32,
  },
  buttonText: {
    width: '100%',
    textAlign: 'center'
  }
});

export default App;
