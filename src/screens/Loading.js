import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button, View} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import Checkmark from '../../assets/checkmark.svg';

const Loading = ({navigation}) => {
    const [ready, setReady] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        try {
            // add create account request
            setTimeout(() => {
                setReady(true);
            }, 4000);
        } catch {}
    }, []);

    useEffect(() => {
        if (ready) {
            setProgress(100);
            setTimeout(() => {
                navigation.replace('Account');
            }, 2000);
            return;
        }

        if (progress >= 90) {
            return;
        }

        setTimeout(() => {
            const newProgress = progress + 15;
            setProgress(newProgress);
        }, 1000);
    }, [navigation, progress, ready]);

    return (
        <Container style={styles.container}>
            <View style={styles.item}>
                <ProgressCircle
                    percent={progress}
                    radius={100}
                    borderWidth={3}
                    color="#4b4b4b"
                    shadowColor="#ff8f00"
                    bgColor="#fcd104">
                    <Text style={styles.typo1}>
                        {progress === 100 ? (
                            <View style={styles.icon}>
                                <Checkmark />
                            </View>
                        ) : (
                            'preparing account...'
                        )}
                    </Text>
                </ProgressCircle>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd104',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        marginBottom: 100,
    },
    icon: {
        width: 81,
        height: 65,
    },
    typo1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: 'normal',
        lineHeight: 42,
        color: 'rgb(26, 25, 25)',
    },
});

export default Loading;
