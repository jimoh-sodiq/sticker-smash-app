import { View, Pressable, StyleSheet, Text, FlatList, Platform } from "react-native"
import { Image, type ImageSource} from "expo-image"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = {
    imageSize: number;
    stickerSource: ImageSource
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {

    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTab = Gesture.Tap()
            .numberOfTaps(2)
            .onStart(() => {
                if (scaleImage.value !== imageSize * 2) {
                    scaleImage.value = scaleImage.value * 2
                } else {
                    scaleImage.value = Math.round(scaleImage.value / 2)
                }
            });

    const imageStyle = useAnimatedStyle(()=> {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    });

    const drag = Gesture.Pan().onChange(event => {
        translateX.value += event.changeX;
        translateY.value += event.changeY
    })

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        }
    })

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, {top: -350 }]}>
                <GestureDetector gesture={doubleTab}>
                        <Animated.Image source={stickerSource} style={[imageStyle, {width: imageSize, height: imageSize}]} resizeMode="contain" />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    )
}