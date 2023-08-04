import React from "react";
import { FlatList, RefreshControl } from "react-native";

const ScrollList = (props) => {
    const { data, horizontal, scrollEnabled, length } = props;
    console.log(scrollEnabled)
    
    if(!data){
        return(<></>);
    }

    return(
        <FlatList 
            data={data}
            horizontal={horizontal}
            scrollEnabled={scrollEnabled}
            renderItem={({ item }) => {
                return(
                    <>{React.cloneElement(props.children, {item})}</>
                )
            }}
            style={{
                marginBottom: horizontal ? 0 : 40
            }}
        />
    )
}

ScrollList.defaultProps = {
    scrollEnabled: true,
    horizontal: false
}

export default ScrollList;