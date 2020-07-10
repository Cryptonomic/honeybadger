import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, View} from 'native-base';

import {sendDelegation} from '../reducers/app/thunks';
import Review from '../components/Review';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../theme';
import LinkIcon from '../../assets/link-icon.svg';

import {State} from '../reducers/types';
import {DelegateReviewProps} from './types';

const DelegateReview = ({navigation}: DelegateReviewProps) => {
    const dispatch = useDispatch();
    const publicKeyHash = useSelector(
        (state: State) => state.app.publicKeyHash,
    );
    const address = useSelector((state: State) => state.app.delegateAddress);

    const onSend = () => {
        dispatch(sendDelegation());
        navigation.replace('Account');
    };

    return (
        <Container style={styles.container}>
            <CustomHeader
                title="Review Delegation"
                onBack={() => navigation.goBack()}
                onClose={() => navigation.navigate('Account')}
            />
            <Review
                fromTitle="My Account"
                from={publicKeyHash}
                toTitle="To Baker’s Service"
                to={address}
                onSend={onSend}>
                <View style={styles.icon}>
                    <LinkIcon />
                </View>
            </Review>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    icon: {
        width: 89,
        height: 89,
        borderWidth: 2,
        borderColor: colors.bg,
        borderRadius: 44.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DelegateReview;
