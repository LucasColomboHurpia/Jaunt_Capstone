import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';

const Question4 = ({ onAnswer, onGoBack }) => {
    const [sliderValue1, setSliderValue1] = useState(7);
    const [sliderValue2, setSliderValue2] = useState(7);
    const [sliderValue3, setSliderValue3] = useState(7);

    const handleSubmit = () => {
        onAnswer(sliderValue1, 'ChanceOfEnjoyingDrinking');
    };

    const sliders = [
        { label: 'Are you ok with other people drinking?', setSliderValue: setSliderValue1 },
        { label: 'Are you ok with other eating meat?', setSliderValue: setSliderValue2 },
        { label: 'Do you like clubbing?', setSliderValue: setSliderValue3 },
    ];

    return (
        <View style={styles.container}>
            {sliders.map((slider, index) => (
                <View key={slider.label}>
                    <Text style={styles.questionText}>{slider.label}</Text>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.text}>Not at all</Text>
                        <Slider
                            style={{ width: '60%', height: 40 }}
                            minimumValue={1}
                            maximumValue={10}
                            value={7}
                            minimumTrackTintColor="#000000"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="white"
                            trackStyle={{ height: 10, backgroundColor: 'grey' }}
                            thumbStyle={{ height: 20, width: 20, borderColor: 'black', borderWidth: 1 }}
                            onValueChange={(value) => {
                                slider.setSliderValue(value);
                            }}
                        />
                        <Text style={styles.text}>Totally cool</Text>
                    </View>
                </View>
            ))}

            <View style={styles.buttonContainer}>
                <Button
                    color="gray"
                    title="<"
                    onPress={onGoBack}
                />
                <Button
                    color="gray"
                    title="Next Step"
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    questionText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    slider: {
        height: 50,
    },
    text: {
        fontSize: 16,
    },
    sliderWrapper: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 25,
        padding: 2,
        flex: 1,
        marginHorizontal: 20,
    },
    slider: {
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        marginTop: 50,
    },
});

export default Question4;
