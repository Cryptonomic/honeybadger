import React, {useState} from 'react';
import { Container, Text, View, Button } from 'native-base';
import { StyleSheet, Image } from 'react-native';

const EnableBiometric = (props: any) => {
    const [isSuccess, setSuccess] = useState(false);

    const handleBiometric = () => {
        props.enableBiometric();
        setSuccess(true);
    }

    return (
        <Container>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Image style={{width: 100, height: 100,marginBottom:10}} source={require('../../../assets/check.png')} />
                    { 
                        props.isBiometric ?
                        <Text style={styles.title}>App Lock Enabled with Biometrics</Text>
                        :
                        <Text style={styles.title}>App Lock Enabled with a Pin</Text>
                    }
                    <Text style={styles.paragraph}>Every extra protective measure you take matters. It's all part of being a responsible crypto owner.</Text>
                </View>
                {
                    !isSuccess &&
                    <React.Fragment>
                        <Button style={styles.btn} onPress={handleBiometric}>
                            <Text style={styles.typo3}>Enable Biometrics</Text>
                        </Button>
                        <Text style={{marginBottom: 40}} onPress={props.skipBiometric}>Go to wallet</Text>
                    </React.Fragment>
                }
                {
                    isSuccess &&
                    <Button style={styles.btn} onPress={props.skipBiometric}>
                        <Text style={styles.typo3}>Go to wallet</Text>
                    </Button>
                }
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
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    paragraph: {
        fontWeight: '400',
        fontSize: 16,
        marginTop: 20
    },
    btn: {
        width: 256,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
        alignSelf: 'center',
        marginBottom: 20,
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
        textTransform: 'capitalize',
    },
});

export default EnableBiometric;