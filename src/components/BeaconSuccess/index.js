import React from 'react';
import { Container, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';

import Checkmark from '../../../assets/checkmark.svg';

const BeaconSuccess = (props: any) => {

    return (
        <Container>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Checkmark />
                    </View>
                    <Text style={styles.title}>QR code scanned</Text>
                    <Text style={styles.paragraph}>{props.text}</Text>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        borderTopWidth: 200,
        borderTopColor: '#FAD049',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    container: {
        backgroundColor: '#FFF',
        flex: .8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        textAlign: 'center',
        margin: 20,
        marginTop: -180,
        borderRadius: 10,
        shadowColor: 'rgba(31, 31, 31, 0.77)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
        //boxShadow: 'rgba(31, 31, 31, 0.77) 1px 7px 33px -24px'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: -10, // hack
        marginRight: -10,
    },
    paragraph: {
        fontWeight: '400',
        fontSize: 16,
        marginTop: 20
    },
    icon: {
        width: 81,
        height: 65,
        marginBottom: 10
    },
});

export default BeaconSuccess;