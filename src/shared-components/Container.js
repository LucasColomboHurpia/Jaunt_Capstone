import { ScrollView, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

export const Container = styled(View).attrs({
    contentContainerStyle: {
        height: '100%',
        flexGrow: 1,
    }
})`
    position: relative;
    width: 100%;
    height: 100%;
    padding-horizontal: ${RFValue(24)}px;
    flex: 1;
    backgroundColor: transparent;
    justify-content: center;
`;