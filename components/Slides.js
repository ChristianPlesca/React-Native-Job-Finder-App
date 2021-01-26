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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProgressBar, Button } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    
    renderLastSlide = (index) => {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    icon={'account-arrow-right'}
                    color='#2B7A78'
                    style={{ marginTop: 30, borderRadius: 30, width: 200, marginBottom: -70 }}
                    onPress={this.props.onCompletedTutorial}
                    mode='contained'
                >
                    Let's Begin 
                </Button>
            );
        }
    }

    renderSlides = () => {
        const { data } = this.props;
        return this.props.data.map((slide, index) => {
            const progress = 100 / data.length * slide.progress;
            const progressInterpuleted = parseFloat(`0.${progress.toFixed(2).replace('.', '')}`);
            const completed = `${progress.toFixed(1)
                                .replace('.', '')}% Completed`;
            return (
                <ImageBackground
                    key={index}
                    source={require('../images/welcome-backgroud.png')}
                    style={styles.image}
                >
                    <View key={slide.id} style={[styles.slideStyle]}>
                        <MaterialCommunityIcons
                            color={'white'}
                            name={slide.icon}
                            size={140}
                        />
                    <View style={styles.divider} />
                    <Text style={styles.slideText}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                    <View style={styles.progressContainer}>
                    <Text style={styles.precentText}>{ completed }</Text>
                    <ProgressBar
                        progress={index !== data.length - 1 ? progressInterpuleted : 1}
                        color="#2B7A78" style={styles.progressBarStyle}
                    />
                     </View>   
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
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 50,
        textAlign: 'center',
        lineHeight: 30
    },
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
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
        marginTop: 60,
        color: 'white',
        textAlign: 'center'
    },
    divider: {
        borderWidth: 2,
        width: SCREEN_WIDTH - 390,
        borderColor: 'white',
        marginTop: 70,
        marginBottom: 35,
        alignItems: 'center'
    },
    progressContainer: {
        top: 180,
    }
});

export default Slides;
