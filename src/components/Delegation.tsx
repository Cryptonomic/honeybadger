import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button} from 'native-base';
import {useSelector} from 'react-redux';
import moment from 'moment';

import DelegationIllustration from '../../assets/delegation-illustration.svg';
import CustomIcon from '../components/CustomIcon';
import {formatAmount} from '../utils/currency';
import {truncateHash} from '../utils/general';
import {State} from '../reducers/types';

interface DelegationProps {
    onDelegate: () => void;
}

const Delegation = ({onDelegate}: DelegationProps) => {
    const delegation = useSelector((state: State) => state.app.delegation);
    const balance = useSelector((state: State) => state.app.balance);
    const expectedPaymentDate = useSelector(
        (state: State) => state.app.expectedPaymentDate,
    );

    return (
        <View style={styles.container}>
            {delegation.length === 0 && (
                <>
                    <DelegationIllustration />
                    <Text style={[styles.title, styles.typo1]}>
                        Grow your Tezos stash
                    </Text>
                    <Text style={[styles.subtitle, styles.typo2]}>
                        Delegate XTZ to earn returns.
                    </Text>
                    <Button style={styles.btn} onPress={onDelegate}>
                        <Text style={styles.typo3}>Delegate Now</Text>
                    </Button>
                </>
            )}
            {delegation.length > 0 && (
                <>
                    <View style={styles.delegationHeader}>
                        <View style={styles.dot} />
                        <Text style={styles.typo4}>Currently Delegating</Text>
                        <Button
                            transparent
                            style={styles.edit}
                            onPress={onDelegate}>
                            <CustomIcon name="Edit" color="#4b4b4b"/>
                        </Button>
                    </View>
                    {/* <Text style={styles.typo5}>First payout in 35 days</Text> */}
                    <View style={styles.delegationPaper}>
                        <View style={styles.row}>
                            <Text style={styles.typo6}>Amount</Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    style={[
                                        styles.paperTextMargin,
                                        styles.typo7,
                                    ]}>
                                    {formatAmount(balance)}
                                </Text>
                                <CustomIcon
                                    name="XTZ"
                                    size={16}
                                    color="#343434"
                                    style={{marginTop: 10}}
                                />
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.typo6}>Baker Service</Text>
                            <Text
                                style={[styles.paperTextMargin, styles.typo7]}>
                                {truncateHash(delegation)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.delegationDate}>
                        <Text style={styles.typo6}>
                            Next payment expected on{' '}
                            {moment
                                .utc(new Date(expectedPaymentDate))
                                .local()
                                .format('MMM D, HH:mm')}
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 25,
    },
    title: {
        marginTop: 25,
    },
    subtitle: {
        marginTop: 10,
    },
    delegationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    delegationPaper: {
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#eeeded',
        borderRadius: 9,
        width: '100%',
    },
    paperTextMargin: {
        marginTop: 10,
    },
    delegationDate: {
        marginTop: 10,
        marginLeft: 10,
        alignSelf: 'flex-start',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#e6e4e4',
    },
    row: {
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 18,
    },
    dot: {
        width: 11,
        height: 11,
        backgroundColor: '#8ae95a',
        borderRadius: 5.5,
        marginHorizontal: 5,
    },
    btn: {
        marginTop: 22,
        width: 256,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
        justifyContent: 'center',
    },
    edit: {
        width: 40,
        height: 40,
        borderColor: '#dbe7fc',
        borderWidth: 1,
        borderRadius: 20,
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        color: 'rgb(75, 75, 75)',
    },
    typo2: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 21,
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
    },
    typo4: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        letterSpacing: 0.75,
    },
    typo5: {
        fontFamily: 'Roboto-Light',
        fontSize: 13,
        fontWeight: '300',
    },
    typo6: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.38)',
    },
    typo7: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
    },
});

export default Delegation;
