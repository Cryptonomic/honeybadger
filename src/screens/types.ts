interface NavigationProps {
    navigation: {
        goBack: () => void;
        navigate: (target: string) => void;
    };
}

export type ReceiveProps = NavigationProps;
export type SendAddressProps = NavigationProps;
