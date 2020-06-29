interface NavigationProps {
    navigation: {
        goBack: () => void;
        navigate: (target: string) => void;
        replace: (target: string) => void;
    };
}

export type ReceiveProps = NavigationProps;
export type SendAddressProps = NavigationProps;
export type WelcomeProps = NavigationProps;
export type LoadingProps = NavigationProps;
export type AccountProps = NavigationProps;
