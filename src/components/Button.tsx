import React from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface ButtonProps {
    loading?: boolean;
    title?: string;
    buttonStyle?: object;
    textStyle?: object;
    loadingColor?: string;
    onClick?: any;
}

const Button = (props: ButtonProps) => {
    const {
        loading,
        title,
        buttonStyle,
        textStyle,
        loadingColor,
        onClick
    } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[buttonStyle ? buttonStyle : styles.button]}
                onPress={onClick}
                disabled={loading}
            >
                {
                    !loading ?
                        <Text style={textStyle ? textStyle : styles.buttonTxt}>{title ? title : "Button"}</Text>
                        :
                        <ActivityIndicator
                            size="small"
                            animating
                            color={loadingColor ? loadingColor : 'white'}
                        />
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    button: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1683e4',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonTxt: {
        fontSize: 16,
        color: 'white'
    },
})

export default Button;