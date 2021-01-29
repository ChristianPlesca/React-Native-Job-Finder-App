import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Swipe from '../components/Swipe';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckScreen extends Component {

    renderCard = (job) => {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        }
        const LeftContent = props => <Avatar.Icon {...props} icon="pin" />
            return (
                <View style={{flex: 1, marginTop: 20, alignItems:'center', justifyContent: 'center', }}>
                <Card style={{width: SCREEN_WIDTH - 50}}>
                    <Card.Title title={job.company.display_name} subtitle={`Category - ${job.category.label}`} left={LeftContent} />
                    <Card.Content>
                    <Title numberOfLines={1}>{job.title.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}</Title>
                    <Paragraph numberOfLines={1}>{job.location.display_name}</Paragraph>
                    </Card.Content>
                    <View style={{ height: 300 }}>
                    <MapView
                      scrollEnabled={false}
                      style={{ flex: 1 }}
                      cacheEnabled={Platform.OS === 'android'}
                      initialRegion={initialRegion}
                    >
                    <Marker
                        coordinate={{ latitude: job.latitude, longitude: job.longitude }}
                        title={job.company.display_name}
                        description={`Salary Min - ${job.salary_min} Salary Max - ${job.salary_max}`}
                    />
                    </MapView>
                    </View>
                    <Paragraph style={{padding: 10, textAlign: 'justify'}} numberOfLines={5}>{job.description}</Paragraph>
                    <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                    </Card.Actions>
                </Card>
                </View>
              );
    };
    
    renderNoMoreCards = () => {
        return (
          <Card title="No More Jobs">
            <Button
              title="Back To Map"
              large
              icon={{ name: 'my-location' }}
              backgroundColor="#03A9F4"
              onPress={() => this.props.navigation.navigate('map')}
            />
          </Card>
        );
      }
    render() {
        return (
            <View style={{ marginTop: 10 }}>
              <Swipe
                data={this.props.jobs}
                renderCard={this.renderCard}
                renderNoMoreCards={this.renderNoMoreCards}
                onSwipeRight={job => this.props.likeJob(job)}
                keyProp="jobkey"
              />
            </View>
          );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = ({ job }) => ({
    jobs: job.results,
});

export default connect(mapStateToProps)(DeckScreen);
