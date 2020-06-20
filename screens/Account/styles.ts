import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd104',
    },
    top: {
        height: '45%',
    },
    bottom: {
        backgroundColor: '#ffffff',
        height: '100%',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        alignItems: 'center',
    },
    menu: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        position: 'absolute',
        right: 15,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#595252',
        margin: 2,
    },
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    amount: {
        marginTop: 20,
    },
    actions: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 86,
        height: 86,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 86,
        margin: 20,
        padding: 25,
    },
    actionLabel: {
        marginTop: 30,
    },
    tabs: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {
        borderBottomWidth: 3,
        borderRadius: 0,
        width: '50%',
        justifyContent: 'center',
    },
    tabContainer: {
        marginTop: 50,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;

