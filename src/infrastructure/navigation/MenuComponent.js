import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'styled-components';

import homeIcon from '../../assets/icons/homeIcon';
import usersIcon from '../../assets/icons/usersIcon';
import bellIcon from '../../assets/icons/bellIcon';
import tabActive from '../../assets/icons/tabActive';

const MenuComponent = (props) => {
    const { state, descriptors, navigation } = props;
    const theme = useTheme();
    console.log(state)

    const tabIcons = {
        home: homeIcon,
        activities: usersIcon,
        notifications: bellIcon
    }

    const styles = {
        container: {
            display: state?.hidden ? 'none' : 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: theme.colors.primary.light,
          height: 76,
        },
        iconContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        icon: {
          width: 24,
          height: 24,
        },
    };

    return (
        <View style={styles.container}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    const routeName = route.name.toLowerCase();
                    const iconName = tabIcons[routeName];

                    const activeColor = isFocused ? theme.colors.primary.default : theme.colors.secondary.default;
                    const activeDashColor = isFocused ? theme.colors.primary.default : 'transparent';

                    const onPress = () => {
                        const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                        });
            
                        if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                        });
                    };

                    return(
                        <View key={route.name}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                style={styles.iconContainer}
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                            >
                                <SvgXml xml={iconName(activeColor)} />

                            </TouchableOpacity>

                            {/* <SvgXml xml={tabActive(activeDashColor)} /> */}
                        </View>
                    )
                }
            )}
        </View>
    );
    
};

export default MenuComponent;
