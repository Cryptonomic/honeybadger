import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button} from 'native-base';

const Welcome = ({navigation}) => {
    const getStarted = () => navigation.replace('Loading');
    return (
        <Container style={styles.container}>
            <Text>Logo</Text>
            <Text>Product of Cryptonomic</Text>
            <Button onPress={getStarted}>
                <Text>Get Started</Text>
            </Button>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        paddingVertical: 250,
        display: 'flex',
        alignItems: 'center',
    },
});

export default Welcome;
