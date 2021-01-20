/* eslint-disable global-require */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
import { ProgressBar } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderSlides = () => {
        const { data } = this.props;
        return this.props.data.map((slide, index) => {
            const progress = 100 / data.length * slide.progress;
            const progressInterpuleted = parseFloat(`0.${progress.toFixed(2).replace('.', '')}`);
            const completed = `Tutorial Progress:  ${progress.toFixed(1)
                                .replace('.', '')}% Completed`;
            return (
                <ImageBackground
                    key={index}
                    source={require('../images/welcome-backgroud.png')}
                    style={styles.image}
                >
                <View key={slide.id} style={[styles.slideStyle]}>
                    <Text style={styles.slideText}>{slide.text}</Text>
                    <Image source={slide.image} style={styles.imageStyle} />
                    <Text style={styles.precentText}>{ completed }</Text>
                    <ProgressBar
                        progress={index !== data.length - 1 ? progressInterpuleted : 1}
                        color="#66FCF1" style={styles.progressBarStyle}
                    />
                        
                    </View>
                    </ImageBackground>
            );
        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    slideText: {
        fontSize: 30,
        color: '#66FCF1',
        fontWeight: 'bold',
        marginHorizontal: 50,
        textAlign: 'center'
    },
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    imageStyle: {
        alignSelf: 'center',
        width: 350,
        height: 320,
        marginBottom: 20,
        marginTop: 60,
    },
    progressBarStyle: {
        width: SCREEN_WIDTH - 200,
        marginTop: 10,
        height: 7,
        borderRadius: 30,
    },
    precentText: {
        marginTop: 100,
        color: '#66FCF1',
    }
});

export default Slides;
