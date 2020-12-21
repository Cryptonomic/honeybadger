/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
import * as Keychain from 'react-native-keychain';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import {syncAccount} from '../reducers/app/thunks';
import {setMessage} from '../reducers/messages/actions';
import Transactions from '../components/Transactions';
import Delegation from '../components/Delegation';
import SecurityLevelButton from '../components/SecurityLevelButton';
import Receive from '../../assets/receive.svg';
import Send from '../../assets/send.svg';

import CustomIcon from '../components/CustomIcon';
import {truncateHash} from '../utils/general';
import {formatAmount} from '../utils/currency';

import {State} from '../reducers/types';
import {AccountProps} from './types';
import Fish from '../../assets/fish.svg';
import Circle from '../../assets/circle.svg';
import RightArrow from '../../assets/right-arrow.svg';
import Salmon from '../../assets/salmon.svg';

const RestoreAccount = ({navigation}: AccountProps) => {
    return (
        <Text>Hello From Restore account</Text>
    )
}

export default RestoreAccount;