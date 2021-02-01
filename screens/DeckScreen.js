/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { likeJob } from '../actions';
import Swipe from '../components/Swipe';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class DeckScreen extends Component {
  renderNoMoreCards = () => (
      <ImageBackground
        source={require('../images/no-records.jpg')}
        style={styles.backgroundImageStyle}
      >
        <Button
          dark
          style={styles.buttonStyle}
          icon={'map'}
          mode="contained"
          onPress={() => this.props.navigation.navigate('TabNav', { screen: 'Map' })}
        >
          Search for Jobs
            </Button>
      </ImageBackground>
    )
  render() {
      return (
            <View style={{ marginTop: 10 }}>
              <Swipe
                data={this.props.jobs}
                renderNoMoreCards={this.renderNoMoreCards}
                onSwipeRight={job => this.props.likeJob(job)}
              />
          </View>
          );
    }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 50,
    marginHorizontal: 20,
    marginBottom: 30,
    width: SCREEN_WIDTH - 80,
    height: 50,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 7,
    top: SCREEN_HEIGHT - 180,
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
});

const mapStateToProps = ({ job }) => ({
    jobs: job.results,
});

export default connect(mapStateToProps, { likeJob })(DeckScreen);
