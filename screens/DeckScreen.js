import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {

  componentDidMount() {
    this.props.navigation.setOptions({
      tabBarBadge: this.props.jobs.length
    });
  }
    renderNoMoreCards = () => (
          <Card title="No More Jobs">
            <Button
              title="Back To Map"
              large
              icon={{ name: 'my-location' }}
              backgroundColor="#03A9F4"
              onPress={() => this.props.navigation.navigate('map')}
            />
          </Card>
        )
  render() {
      return (
            <View style={{ marginTop: 10 }}>
              <Swipe
                data={this.props.jobs}
                renderCard={this.renderCard}
                renderNoMoreCards={this.renderNoMoreCards}
                onSwipeRight={ () => {}}//job => this.props.likeJob(job) }
                keyProp="jobkey"
              />
          </View>
          );
    }
}

const mapStateToProps = ({ job }) => ({
    jobs: job.results,
});

export default connect(mapStateToProps)(DeckScreen);
