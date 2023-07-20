import styled from 'styled-components/native';

const defaultTextStyles = (theme) => `
  font-family: ${theme.fontFamilies.neuzeitGrotesk};
  color: ${theme.colors.textColor};
    font-size: ${theme.fontSizes.body}px;
    font-weight: ${theme.fontWeights.regular}px;
    flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const defaults = (theme) => {
    body: `
    font-family: ${theme.fontFamilies.raleway};
    color: ${theme.colors.blues.b1};
  `
};

const heading1 = (theme) => `
    font-weight: ${theme.fontWeights.extraBold};
    font-size: ${theme.fontSizes.heading1}px;
`;

const heading2 = (theme) => `
    font-weight: ${theme.fontWeights.extraBold};
    font-size: ${theme.fontSizes.heading2}px;
`;

const bodyBold = (theme) => `
    font-weight: ${theme.fontWeights.extraBold};
`;

const body = (theme) => `
    font-weight: ${theme.fontWeights.extraBold};
`;

const labelBg = (theme) => `
    font-weight: ${theme.fontWeights.extraBold};
    font-size: ${theme.fontSizes.labelBg}px;
`;

const labelMd = (theme) => `
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes.labelMd}px;
`;

const labelSm = (theme) => `
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.labelSm}px;
`;

const variants = {
    heading1,
    heading2,
    body,
    bodyBold,
    labelBg,
    labelMd,
    labelSm
};

export const TextStyle = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
  ${({ options }) => objectString(options)}
`;

export default Text = (props) => {
    return (
        <TextStyle {...props}>{props.children}</TextStyle>
    )
}


Text.defaultProps = {
  variant: "body",
  options: {}
};

const objectString = obj  => {
    if(typeof(obj) !== "object"){
        return;
    }
    let string = ``;
    const objLenght = Object.keys(obj).length;
    let counter = 1;
    for (let key in obj){
        string += `${key}: ${obj[key]}`
        if(counter <= objLenght-1){
            string += `;`
        }
        ++counter;
    }
    return string;
}