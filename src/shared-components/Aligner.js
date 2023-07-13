import { View } from 'react-native';

export default Aligner = (props) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: props.direction,
            justifyContent: props.justify,
            alignItems: props.align,
            flexWrap: props.wrap,
        }}>
            {props.children}
        </View>
    )
}

Aligner.defaultProps = {
    justify: "center",
    align: "center",
    direction: "row",
    wrap: "nowrap"
}