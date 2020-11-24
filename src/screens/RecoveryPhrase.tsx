import React, {useState, useEffect} from 'react';
import {StyleSheet,  ScrollView, Image, TouchableOpacity} from 'react-native';
import {View, Text, Container, Button} from 'native-base';
import {colors} from '../theme';
import MobileIllustration from '../../assets/camera.svg';
import QuiteIllustration from '../../assets/quiet.svg';
import RightArrow from '../../assets/right-arr.svg';
import CustomHeader from '../components/CustomHeader';
import * as Keychain from 'react-native-keychain';

import {SeedPhraseProps} from './types';

const RecoveryPhrase = ({navigation}: SeedPhraseProps) => {
    const [securityLevel, setSecurityLevel] = useState("0");
    const [step, setStep] = useState(0);
    useEffect(() => {
        async function load() {
            try {
                let securityLevel: any = await Keychain.getInternetCredentials('securityLevel');
                if(securityLevel.password) {
                    setSecurityLevel(securityLevel.password);
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        load();
    }, []);

    return (
            <Container style={styles.container}>
                {
                step ==0 &&
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <Image style={{width:'100%',height:249,marginTop:34,marginBottom:60}} source={require('../../assets/banner.png')} />
                        <View style={{alignItems:"center", paddingBottom:34, paddingTop:10, paddingLeft:60, paddingRight:60}}>
                            
                            <Text style={styles.typo1}>
                                Are you away from snooping eyes?
                            </Text>
                            <Text style={styles.typo5}>
                                Take a look arround. Make sure you have complete privacy and no one is looking over your shoulder.
                            </Text>
                            <Text style={styles.borderBottom}></Text>
                            <Text style={styles.typo3}>
                                Anyone with your recovery phrase can steal your funds.
                            </Text>
                            <Button style={styles.btn} onPress={() => setStep(1)}>
                                <Text>I am ready</Text>
                            </Button>
                            <Text style={styles.typo6}>
                                No, I’ll do it later
                            </Text>
                        </View>
                    </ScrollView>
                }
                {
                    step == 1 &&
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <Image style={styles.backgroundImage} source={require('../../assets/banner.png')} />
                        <View style={styles.content}>
                            <Text style={styles.typo7}>
                                Security Tips
                            </Text>
                            <Text style={styles.borderBottom}></Text>
                            <MobileIllustration style={{marginTop:25,marginBottom:25,marginLeft:'auto',marginRight:'auto'}}></MobileIllustration>
                            <Text style={styles.typo1}>
                                Screenshots are not secure
                            </Text>
                            <Text style={styles.typo5}>
                                Many apps have access to your media and can view your screenshots.
                            </Text>
                            <View style={styles.levelMain}>
                                <View style={styles.levels}>
                                    <Text style={styles.orangeDot1}>
                                    </Text>
                                    <Text style={styles.greyDots1}>
                                    </Text>
                                </View>
                                <Button
                                    onPress={() => setStep(2)}
                                    style={styles.btnWhite}>
                                    <Text style={{color:'#333'}}>Next</Text> 
                                    <RightArrow></RightArrow>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                }
                {
                    step == 2 &&
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <Image style={{width:'100%',height:249,marginTop:34,marginBottom:60}} source={require('../../assets/banner.png')} />
                        <View style={styles.content}>
                            <Text style={styles.typo7}>
                                Security Tips
                            </Text>
                            <Text style={styles.borderBottom}></Text>
                            <QuiteIllustration style={{marginTop:25,marginBottom:25,marginLeft:'auto',marginRight:'auto'}}></QuiteIllustration>
                            <Text style={styles.typo1}>
                                Don’t read your recovery phrase aloud
                            </Text>
                            <Text style={styles.typo5}>
                            Keep in mind that someone might be listening (maybe Alexa?).
                            </Text>
                            <View style={styles.levelMain}>
                                <View style={styles.levels}>
                                    <Text style={styles.greyDots2}>
                                    </Text>
                                    <Text style={styles.orangeDot2}>
                                    </Text>
                                </View>
                                <Button
                                    onPress={() => navigation.navigate("SeedPhrase")}
                                    style={styles.btnBlack}>
                                    <Text>Got It</Text> 
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                }   
                
            </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    content: {
        backgroundColor: '#ffffff',
        flexGrow: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 30,
        paddingTop:22,
        borderTopWidth:10,
        borderTopColor:colors.bg,
        paddingLeft:40,
        paddingRight:40
    },
    backgroundImage: {
        height:190,
        marginTop:34,
        resizeMode: 'cover', // or 'stretch'
      },
    btn: {
        width: 256,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    btnWhite: {
        width: 156,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        color:'#000',
        borderColor:'#333',
        backgroundColor:'#fff',
        borderWidth: 1,
        marginBottom: 20
    },
    btnBlack: {
        width: 156,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        color:'#000',
        borderColor:'#333',
        backgroundColor:'#4B4B4B',
        borderWidth: 1,
        marginBottom: 20
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
        color: '#3C3B3B',
        marginBottom:15,
        textAlign:'center'
    },
    typo2: {
        fontFamily: 'Roboto-Medium',
        fontSize: 36,
        fontWeight: '500',
        color: 'rgb(26, 25, 25)',
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 27,
        textTransform: 'capitalize',
        textAlign:'center',
        marginBottom:20,
        borderBottomWidth: 2,
        borderBottomColor: '#e6e4e4',
        marginTop:20,
        color:'#E3787D'
    },
    typo4: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'normal',
    },
    typo5: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 18,
        letterSpacing: 0.67,
        textAlign:'center',
        lineHeight: 30,
        marginBottom:20
    },
    typo6: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 16,
    },
    typo7: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 27,
        textTransform: 'capitalize',
        textAlign:'center',
        marginBottom:20,
        borderBottomWidth: 2,
        borderBottomColor: '#e6e4e4',
    },
    inputField: {
        padding:13,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius:12,
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        marginBottom:30,
        lineHeight: 24,
        color: '#4D4D4D'
    },
    security: {
        borderRadius: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 16,
        marginTop:20,
        marginBottom:20,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems:'center'
    },
    levelMain: {
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        flexWrap:'wrap',
        marginTop:50
    },
    levels: {
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        flex:60
    },
    dotsContainer: {
        height:60,
    },
    greyDots1: {
        height:8,
        width:8,
        borderWidth:8,
        borderRadius: 8,
        borderColor:'#C1C1C1',
        marginLeft:16,
    },
    orangeDot1: {
        height:8,
        width:8,
        borderWidth:8,
        borderRadius: 8,
        borderColor:'#F5942A',
        marginLeft:5.5,
    },
    greyDots2: {
        height:8,
        width:8,
        borderWidth:8,
        borderRadius: 8,
        borderColor:'#C1C1C1',
        marginRight:16,
    },
    orangeDot2: {
        height:8,
        width:8,
        borderWidth:8,
        borderRadius: 8,
        borderColor:'#F5942A',
        marginLeft:5.5,
    },
    borderBottom: {
        width:'100%',
        height:1,
        backgroundColor:'#E6E4E4'
    }
});

export default RecoveryPhrase;
