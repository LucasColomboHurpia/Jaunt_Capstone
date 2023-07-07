import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = (props) => {

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        borderRadius: 5,
        backgroundColor: 'red',
        width: 194,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 18,
        fontWeight:800,
        color: "white"
    }
}

export default Button;