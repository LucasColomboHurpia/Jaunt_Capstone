import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import { ActivityIndicator } from "react-native-paper";
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import Text from './Text';

const defaultStyles = (backgroundColor) => `
    justify-content: center;
    align-items: center;
    height: ${RFValue(56)}px;
    border-radius: ${RFValue(8)}px;
    background-color: ${backgroundColor};
`

const bg = () => `
    width: 100%;
`;

const sm = () => `
    width: ${RFValue(194)}px;
`;

const variants = {
    bg,
    sm
}

const ButtonStyle = styled(TouchableOpacity)`
    ${({ backgroundColor }) => defaultStyles(backgroundColor)}
    ${(props) => variants[props.variant](props.backgroundColor)}
`;

const Button = (props) => {
    const theme = useTheme();
    const { type, isLoading, clearLoading, variant } = props;

    let backgroundColor = theme.colors.primary.default;
    let textColor = theme.colors.white;
    let textVariant = "labelBg";
    
    switch (type) {
        case "primary":
            backgroundColor = theme.colors.primary.default;
            break;
        case "secondary":
            backgroundColor = theme.colors.secondary.default;
            break;
        case "tertiary":
            backgroundColor = theme.colors.grey.g1;
            textColor = theme.colors.textColor
            break;
    
        default:
            break;
    }

    // useEffect(() => {
    //     clearLoading();
    // }, [])

    const onPress = () => {
        // props.onPress();
    }

    const displayChildren = () => {
        
        if(!isLoading){
            return (
                <Text variant={textVariant} options={{ color: textColor }}>{props.text}</Text>
            );
        }

        return (
            // <ActivityIndicator size="small" animating={true} color={`#A7A9BC`} />
            <Text variant={textVariant}>Loading...</Text>
        )
    }

    return (
        <ButtonStyle onPress={onPress} disabled={props.disabled} backgroundColor={backgroundColor} {...props}>
            <Text variant={textVariant} options={{
                color: textColor
            }}>
                {displayChildren()}
            </Text>
        </ButtonStyle>
    )
}

Button.defaultProps = {
    type: 'primary'
}

export default Button