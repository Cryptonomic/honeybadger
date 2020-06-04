import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button} from 'native-base';

const Loading = ({navigation}) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 5000);
    }, []);

    if (ready) {
        setTimeout(() => {
            navigation.replace('Account');
        }, 2000);
    }

    return (
        <Container style={styles.container}>
            {!ready && <Text>preparing account...</Text>}
            {ready && <Text>ready</Text>}
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

export default Loading;
