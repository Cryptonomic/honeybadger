/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef} from 'react';
import { Text } from 'native-base';
import { StyleSheet, View, TextInput } from "react-native";

const PinCode = (props: any) => {
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    const [pin, setPin] = useState('');
    const [pinCodePosition, setPinCodePosition] = useState(1);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');

    const onChangePin = (pinCode: any, position: number) => {
        pinCode = pinCode.charAt(0);
        const newPin = `${pin}${pinCode}`;
        if(position === 6) {
            // redirect to next screen
            props.isResetNeeded && resetForm();
            props.handlePin(newPin)
        } else {
            setPin(newPin);
            setPinCodePosition(position + 1);
            allowAutoFocus(position + 1);
        }
    }

    const resetForm = () => {
        setPin('');
        setPinCodePosition(1);
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        setInput5('');
        setInput6('');   
    }

    const getPinStyle = function(position: number) {
        if(position < pinCodePosition) {
            return styles.noBorder;
        } 
        return styles.input
    }

    const allowAutoFocus = (position: number) => {
        switch(position) {
            case 1:
                input1Ref.current && input1Ref.current.focus();
                break;
            case 2:
                input2Ref.current && input2Ref.current.focus();
                break;
            case 3:
                input3Ref.current && input3Ref.current.focus();
                break;
            case 4:
                input4Ref.current && input4Ref.current.focus();
                break;
            case 5:
                input5Ref.current && input5Ref.current.focus();
                break;
            case 6:
                input6Ref.current && input6Ref.current.focus();
                break
        }
    }

    const handleBackspace = (key: string, position: number) => {
        if(key === 'Backspace') {
            const newPin = pin.slice(0, position-2);
            setPin(newPin);
            switch(position-1) {
                case 1:
                    setInput1('');
                    // Hack to refresh multiple states
                    setTimeout(()=> {
                        allowAutoFocus(1);
                        setPinCodePosition(1);
                    }, 10);
                    break;
                case 2:
                    setInput2('');
                    // Hack to refresh multiple states
                    setTimeout(()=> {
                        allowAutoFocus(2);
                        setPinCodePosition(2);
                    },10);
                    break;
                case 3:
                    setInput3('');
                    // Hack to refresh multiple states
                    setTimeout(()=> {
                        allowAutoFocus(3);
                        setPinCodePosition(3);
                    }, 10)
                    break;
                case 4:
                    setInput4('');
                    // Hack to refresh multiple states
                    setTimeout(()=> {
                        allowAutoFocus(4);
                        setPinCodePosition(4);
                    }, 10);
                    break;
                case 5:
                    setInput5('');
                    // Hack to refresh multiple states
                    setTimeout(()=> {
                        allowAutoFocus(5);
                        setPinCodePosition(5);
                    }, 10)
                    break;
                case 6:
                    setInput6('');
                    // Hack to refresh multiple states
                    setTimeout(()=> {
                        allowAutoFocus(6);
                        setPinCodePosition(6);
                    }, 10);
                    break
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.text} </Text>
            <View style={styles.containerFlex}>
                {
                    input1 === '' ?
                    <TextInput secureTextEntry={true}
                        ref={input1Ref}
                        caretHidden={true}
                        keyboardType="numeric"
                        maxLength={1}
                        autoFocus={true}
                        style={getPinStyle(1)}
                        value={input1}
                        onChangeText={text => {
                            setInput1(text.toString());
                            onChangePin(text, 1)
                        }}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key , 1)}
                        
                    />
                    :
                    <Text style={styles.circle}></Text>
                }
                
                {
                    input2 === '' ?
                    <TextInput secureTextEntry={true}
                        ref={input2Ref}
                        caretHidden={true}
                        keyboardType="numeric"
                        maxLength={1}
                        style={getPinStyle(2)}
                        value={input2}
                        onChangeText={text => {
                            setInput2(text.toString());
                            onChangePin(text, 2)
                        }}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key , 2)}
                    />
                    :
                    <Text style={styles.circle}></Text>
                }
                
                {
                    input3 === '' ?
                    <TextInput secureTextEntry={true}
                        ref={input3Ref}
                        keyboardType="numeric"
                        maxLength={1}
                        caretHidden={true}
                        style={getPinStyle(3)}
                        value={input3}
                        onChangeText={text => {
                            setInput3(text.toString());
                            onChangePin(text, 3)
                        }}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key , 3)}
                    />
                    :
                    <Text style={styles.circle}></Text>
                }
                
                {
                    input4 === '' ?
                    <TextInput secureTextEntry={true}
                        ref={input4Ref}
                        keyboardType="numeric"
                        caretHidden={true}
                        style={getPinStyle(4)}
                        value={input4}
                        onChangeText={text => {
                            setInput4(text.toString());
                            onChangePin(text, 4)
                        }}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key , 4)}
                    />
                    :
                    <Text style={styles.circle}></Text>
                }
                
                {
                    input5 === '' ?
                    <TextInput secureTextEntry={true}
                        ref={input5Ref}
                        keyboardType="numeric"
                        maxLength={1}
                        caretHidden={true}
                        style={getPinStyle(5)}
                        value={input5}
                        onChangeText={text => {
                            setInput5(text.toString());
                            onChangePin(text, 5)
                        }}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key , 5)}
                    />
                    :
                    <Text style={styles.circle}></Text>
                }
                
                {
                    input6 === '' ?
                    <TextInput 
                        ref={input6Ref}
                        secureTextEntry={true}
                        keyboardType="numeric"
                        maxLength={1}
                        caretHidden={true}
                        style={getPinStyle(6)}
                        value={input6}
                        onChangeText={text => {
                            setInput6(text.toString());
                            onChangePin(text, 6)
                        }}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key , 6)}
                    />
                    :
                    <Text style={styles.circle}></Text>
                }
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 20,
        zIndex: 10
    },
    containerFlex: {
      alignItems: 'center',
      flexDirection:'row'
    },
    title: {
      fontSize: 18,
      marginBottom:40,
    },
    input: {
      fontSize:36,
      borderWidth: 2,
      borderTopColor:'#fff',
      borderLeftColor:'#fff',
      borderRightColor:'#fff',
      width:20,
      margin:15,
      height: 25,
    },
    noBorder: {
        fontSize:36,
        borderWidth: 0,
        borderTopColor:'transparent',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        width:20,
        margin:15,
        height: 25
    },
    circle: {
        width:20,
        height: 20,
        margin:15,
        backgroundColor: '#000',
        borderRadius: 50
    }
  });

export default PinCode;