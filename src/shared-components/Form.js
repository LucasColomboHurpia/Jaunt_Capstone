import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components';
import { SvgXml } from 'react-native-svg';
// import { checkmarkSvg } from '../../assets/icons'
import { RFValue } from 'react-native-responsive-fontsize';
import close from '../assets/icons/close';
import { Dimensions } from 'react-native';

export const Label = styled(Text)`
    font-size: ${props => props.theme.fontSizes.labelSm}px;
    color: ${({ theme }) => theme.colors.grey.g1}
`;

const InputStyle = styled(TextInput)`
    background-color: transparent;
    width: 100%;
    font-size: ${props => props.theme.fontSizes.body}px;
    padding-horizontal: ${RFValue(16)}px;
    padding-vertical: ${RFValue(11)}px;
    font-size: ${RFValue(16)}px;
    border-radius: ${RFValue(8)}px;
    border-width: ${1}px;
    border-color: ${props => props.error ? props.theme.colors.indicators.error : props.theme.colors.greys.g2};
    color: ${props => props.theme.colors.greys.g2};
`;

const InputContainer = styled(View)`
    position: relative;
`;

export const Input = (props) => {
    const theme = useTheme();
    return (
        <InputContainer>
            <InputStyle
                {...props}
                placeholderTextColor = {theme.colors.grey.g1}
            />
            <SvgXml style={{ 
                position: 'absolute',
                right: 6,
                top: 10
            }} xml={close()} />
        </InputContainer>
    )
}

export const Error = styled(Text)`
    color: ${props => props.theme.colors.indicators.error};
    font-size: ${props => props.theme.fontSizes.label}px;
`;

const CheckBoxStyle = styled.View`
    border-color: ${props => props.isChecked ? "#0094FF" : "#E5E3ED"};
    background-color: ${props => props.isChecked ? "#0094FF" : "transparent"};
    border-width: ${RFValue(2)}px;
    width: ${RFValue(16)}px;
    height: ${RFValue(16)}px;
    border-radius: ${RFValue(3)}px
`;

export const CheckBox = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <CheckBoxStyle {...props}>
                {/* {props.isChecked && <SvgXml height="100%" width="100%" xml={checkmarkSvg()} />} */}
            </CheckBoxStyle>
        </TouchableOpacity>
    )
}