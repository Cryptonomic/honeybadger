import React, {FC} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

const SafeContainer: FC = ({children}) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default SafeContainer;
