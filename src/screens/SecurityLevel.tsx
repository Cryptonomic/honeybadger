import React, {useState, useEffect} from 'react';
import {StyleSheet,  ScrollView, Image, TouchableOpacity} from 'react-native';
import {View, Text, Container, Button} from 'native-base';
import {colors} from '../theme';
import CustomHeader from '../components/CustomHeader';
import * as Keychain from 'react-native-keychain';

import {SeedPhraseProps} from './types';

const SecurityLevel = ({navigation}: SeedPhraseProps) => {
    const [securityLevel, setSecurityLevel] = useState("0");
    useEffect(() => {
        // async function load() {
        //     try {
        //         let securityLevel: any = await Keychain.getInternetCredentials('securityLevel');
        //         if(securityLevel.password) {
        //             setSecurityLevel(securityLevel.password);
        //         }
        //     } catch (error) {
        //         console.log("Keychain couldn't be accessed!", error);
        //     }
        // }
        // load();
        navigation.addListener(
            'didFocus', async (payload: any) => {
                try {
                    let securityLevel: any = await Keychain.getInternetCredentials('securityLevel');
                    if(securityLevel.password) {
                        setSecurityLevel(securityLevel.password);
                    }
                } catch (error) {
                    // error
                    console.log("Keychain couldn't be accessed!", error);
                }
            }
        )
    }, []);

    const getSecurityLevel = () => {
        if(securityLevel === "0") {
            return "Level 1: Goldfish";
        } else if(securityLevel === "1") {
            return "Level 2: Savvy Salmon";
        } else {
            return "Level 3: Discreet Dolphin";
        }
    }

    const getSubText = () => {
        if(securityLevel === "0") {
            return "Your funds are not secure";
        } else if(securityLevel === "1") {
            return "Backed Up Recovery Phrase";
        } else {
            return "Enabled App Lock";
        }
    }

    const getLevelText = () => {
        if(securityLevel === "0") {
            return "Your Security Level"
        } else if(securityLevel === "1") {
            return "Next Level";
        } else {
            return "";
        }
        
    }

    const handleNavigation = () => {
        if (securityLevel === '1') {
            navigation.navigate("AccountSetup")
        } else if(securityLevel === '0') {
            navigation.navigate("RecoveryPhrase")
        }
    }

    return (
            <Container style={styles.container}>
                <CustomHeader
                    title="Security Level"
                    onBack={() => navigation.goBack()}
                />
                <View style={{alignItems:"center", paddingBottom:34}}>
                    <Image style={{width:91,height:68, marginTop:34, marginBottom:24}} source={require('../../assets/goldfish.png')} />
                    <Text style={styles.typo1}>
                        { getSecurityLevel() }
                    </Text>
                    <Text style={styles.typo5}>
                        {getSubText()}
                    </Text>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.content}>
                        <Text style={styles.typo3}>
                            { 
                                securityLevel === "2" ?
                                "You Have Reached The Final Level! "
                                :
                                "Level Up Your Security"
                            }
                        </Text>
                        <TouchableOpacity style={styles.security} onPress={()=> handleNavigation()}>
                            <View>
                                {
                                    securityLevel === "0" &&
                                    <Image style={{width:47,height:35,marginRight:16}} source={require('../../assets/fish.png')} />
                                }
                                {
                                    securityLevel === "1" &&
                                    <Image style={{width:47,height:35,marginRight:16}} source={require('../../assets/salmon.png')} />
                                }
                                {
                                    securityLevel === "2" &&
                                    <Image style={{width:47,height:35,marginRight:16}} source={require('../../assets/dolphin.png')} />
                                }
                            </View>
                            <View style={{width:'57%'}}>
                            <Text style={styles.typo6}>{getLevelText()}</Text>
                                <Text style={styles.typo3}>{ getSecurityLevel() }</Text>
                            </View>
                            <View>
                                <Image style={{width:40,height:42,marginRight:16}} source={require('../../assets/circle.png')} />
                            </View>
                            <View>
                                {
                                    securityLevel !== "2" &&
                                    <Image style={{width:9,height:14}} source={require('../../assets/right-arrow.png')} />
                                }
                                
                            </View>
                        </TouchableOpacity>
                        {/* Levels Grid */}
                        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <View>
                            <Text style={styles.typo3}>
                                Levels
                            </Text>
                            <View style={styles.levelMain}>
                                <View style={{paddingTop:18}}>
                                    {/* Level 1 */}
                                    {
                                        securityLevel === "0" &&
                                        <React.Fragment>
                                            <View style={styles.dotsContainer}>
                                                <Text style={styles.greyDots1}></Text>
                                                <Text style={styles.orangeDot1}></Text>
                                                <Text style={styles.greyLine1}></Text>
                                            </View>
                                            <View style={styles.dotsContainer}>
                                                <Text style={styles.greyDots1}></Text>
                                                <Text style={styles.greyLine1}></Text>
                                            </View>
                                            <View >
                                                <Text style={styles.greyDots3}></Text>
                                                <Image style={{width:15,height:16,marginTop:-28,marginLeft:7}} source={require('../../assets/flag.png')} />
                                            </View>
                                        </React.Fragment>
                                    }
                                    {
                                        securityLevel === "1" &&
                                        <React.Fragment>
                                            <View style={styles.dotsContainer}>
                                                <Text style={styles.greyDots2}></Text>
                                                <Text style={styles.orangeDot1}></Text>
                                                <Text style={styles.orangeLine1}></Text>
                                            </View>
                                            <View style={styles.dotsContainer}>
                                                <Text style={styles.greyDots1}></Text>
                                                <Text style={styles.orangeDot1}></Text>
                                                <Text style={styles.greyLine1}></Text>
                                            </View>
                                            <View >
                                                <Text style={styles.greyDots3}></Text>
                                                <Image style={{width:15,height:16,marginTop:-28,marginLeft:7}} source={require('../../assets/flag.png')} />
                                            </View>
                                        </React.Fragment>
                                    }
                                    {
                                        securityLevel === "2" &&
                                        <React.Fragment>
                                            <View style={styles.dotsContainer}>
                                                <Text style={styles.greyDots2}></Text>
                                                <Text style={styles.orangeDot1}></Text>
                                                <Text style={styles.orangeLine1}></Text>
                                            </View>
                                            <View style={styles.dotsContainer}>
                                                <Text style={styles.greyDots2}></Text>
                                                <Text style={styles.orangeDot1}></Text>
                                                <Text style={styles.orangeLine1}></Text>
                                            </View>
                                            
                                            <View >
                                                <Text style={styles.orangeDot3}></Text>
                                                <Image style={{width:15,height:16,marginTop:-28,marginLeft:7}} source={require('../../assets/whiteflag.png')} />
                                            </View>
                                        </React.Fragment>
                                    }
                                    
                                    {/* Level 2
                                    <View style={styles.dotsContainer}>
                                        <Text style={styles.greyDots2}></Text>
                                        <Text style={styles.orangeDot1}></Text>
                                        <Text style={styles.orangeLine1}></Text>
                                    </View>
                                    <View style={styles.dotsContainer}>
                                        <Text style={styles.greyDots1}></Text>
                                        <Text style={styles.orangeDot1}></Text>
                                        <Text style={styles.greyLine1}></Text>
                                    </View>
                                    <View >
                                        <Text style={styles.greyDots3}></Text>
                                        <Image style={{width:15,height:16,marginTop:-28,marginLeft:7}} source={require('../../assets/flag.png')} />
                                    </View>
                                    */}
                                    {/* Level 3 
                                    <View style={styles.dotsContainer}>
                                        <Text style={styles.greyDots2}></Text>
                                        <Text style={styles.orangeDot1}></Text>
                                        <Text style={styles.orangeLine1}></Text>
                                    </View>
                                    <View style={styles.dotsContainer}>
                                        <Text style={styles.greyDots2}></Text>
                                        <Text style={styles.orangeDot1}></Text>
                                        <Text style={styles.orangeLine1}></Text>
                                    </View>
                                    
                                    <View >
                                        <Text style={styles.orangeDot3}></Text>
                                        <Image style={{width:15,height:16,marginTop:-28,marginLeft:7}} source={require('../../assets/whiteflag.png')} />
                                    </View>
                                    */}
                                </View>
                                <View>
                                    <View style={styles.levels}>
                                        <View>
                                            <Image style={{width:47,height:35,marginRight:16}} source={require('../../assets/fish.png')} />
                                        </View>
                                        <View>
                                            <Text style={styles.typo3}>Level 1: Goldfish</Text>
                                            <Text style={styles.typo6}>No Security</Text>
                                        </View>
                                    </View>
                                    <View style={styles.levels}>
                                        <View>
                                            <Image style={{width:47,height:35,marginRight:16}} source={require('../../assets/salmon.png')} />
                                        </View>
                                        <View>
                                            <Text style={styles.typo3}>Level 2: Savvy Salmon</Text>
                                            <Text style={styles.typo6}>Back Up Recovery Phrase</Text>
                                        </View>
                                    </View>
                                    <View style={styles.levels}>
                                        <View>
                                            <Image style={{width:47,height:42,marginRight:16}} source={require('../../assets/dolphin.png')} />
                                        </View>
                                        <View>
                                            <Text style={styles.typo3}>Level 3: Discreet Dolphin</Text>
                                            <Text style={styles.typo6}>Enable App Lock</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                        {/* Levels Grid */}
                    </View>
                </ScrollView>
            </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    content: {
        backgroundColor: '#ffffff',
        flexGrow: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 30,
        paddingTop:22
    },
    btn: {
        width: 256,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 24,
        color: '#3C3B3B',
        marginBottom:5
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
        fontWeight: '500',
        lineHeight: 27,
        textTransform: 'capitalize',
        color: '#4B4B4B'
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
    },
    typo6: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 14,
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
        alignItems:'center'
    },
    levels: {
        marginTop:20,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems:'center'
    },
    dotsContainer: {
        height:60,
    },
    greyDots1: {
        height:12,
        width:12,
        borderWidth:12,
        borderRadius: 12,
        borderColor:'#E8E8E8',
        marginRight:24,
    },
    greyDots2: {
        height:12,
        width:12,
        borderWidth:12,
        borderRadius: 12,
        borderColor:'#F5942A',
        marginRight:24,
    },
    greyDots3: {
        height:20,
        width:20,
        borderWidth:20,
        borderRadius: 20,
        borderColor:'#E8E8E8',
        marginRight:24,
        marginLeft:-6,
    },
    orangeDot3: {
        height:20,
        width:20,
        borderWidth:20,
        borderRadius: 20,
        borderColor:'#F5942A',
        marginRight:24,
        marginLeft:-6,
    },
    orangeDot1: {
        height:6,
        width:6,
        borderWidth:6,
        borderRadius: 6,
        borderColor:'#F5942A',
        marginTop:-18,
        marginLeft:5.5,
    },
    greyLine1: {
        width:3,
        height:40,
        backgroundColor: '#E8E8E8',
        position:'absolute',
        left:11,
        top:20,
    },
    orangeLine1: {
        width:3,
        height:40,
        backgroundColor: '#F5942A',
        position:'absolute',
        left:11,
        top:20,
    }
});

export default SecurityLevel;
