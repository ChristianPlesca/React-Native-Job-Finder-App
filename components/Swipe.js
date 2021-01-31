import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  LogBox,
} from 'react-native';
import { Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id'
  }

  constructor(props) {
    super(props);
    LogBox.ignoreLogs(['componentWillReceiveProps']);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }


  onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }


  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
    }

    resetPosition = () => {
        Animated.spring(this.state.position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    
    forceSwipe = (direction) => {
        const x = direction === 'right' ? SCREEN_WIDTH + 200 : -SCREEN_WIDTH - 200;
        Animated.timing(this.state.position, {
          toValue: { x, y: 0 },
          duration: SWIPE_OUT_DURATION,
          useNativeDriver: false
        }).start(() => this.onSwipeComplete(direction));
  }
  
  renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    const LeftContent = props => <Avatar.Text {...props} label={job.company.display_name[0]} />;
    return (
            <View style={styles.cardContainer}>
            <Card style={styles.cardBody}>
            <Card.Title
                titleStyle={{ color: '#000' }}
                subtitleStyle={{ color: '#000' }}
                title={job.company.display_name}
                subtitle={`Category - ${job.category.label}`} left={LeftContent}
                style={styles.textColor}               
            />
              <View style={styles.mapContainer}>
                      <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android'}
                        initialRegion={initialRegion}
                      >
                      <Marker
                          coordinate={{ latitude: job.latitude, longitude: job.longitude }}
                          title={job.company.display_name}
                          description={`Salary Min - ${job.salary_min} 
                                        Salary Max - ${job.salary_max}`}
                      />
                    </MapView>
                </View>
                <Card.Content>
                <Title
                  numberOfLines={1}
                  style={styles.textColor}
                >
                  {job.title.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}
                </Title>
                <Paragraph 
                  numberOfLines={1}
                  style={styles.textColor}
                >
                  {job.location.display_name}
                </Paragraph>
                </Card.Content>
              <Paragraph
                style={styles.descriptionParagraph}
                numberOfLines={4}
              >
                {job.description.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}
              </Paragraph>
                <Card.Actions>
                <View style={styles.swipeButtonsContainer}>
                <IconButton
                    style={styles.iconButton}
                    icon="close-circle"
                    color={'#C5C6C7'}
                    size={60}
                    onPress={() => this.forceSwipe('right')}
                />
                <IconButton
                    style={styles.iconButton}
                    icon="check-circle"
                    color={'#2B7A78'}
                    size={60}
                    onPress={() => this.forceSwipe('left')}
                />
                </View>
                </Card.Actions>
            </Card>
        </View>
          );
};

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, i) => {
      const border = 10 * (i - this.state.index);
      if (i < this.state.index) { return null; }

      if (i === this.state.index) {
        return (
          <Animated.View
            key={i}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={i}
          style={[styles.cardStyle, { top: border, zIndex: -i }, { left: border, zIndex: -i }]}
        >
          {this.renderCard(item)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? deck : deck.reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  cardContainer: {
    flex: 1,
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    width: SCREEN_WIDTH - 50,
    
  },
  mapContainer: {
    height: 250,
  },
  descriptionParagraph: {
    padding: 15,
    textAlign: 'justify',
    color: '#000'
  },
  iconButton: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {
      width: 1,
      height: 13
    },
  },
  textColor: {
    color: '#000'
  },
  swipeButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default Swipe;
