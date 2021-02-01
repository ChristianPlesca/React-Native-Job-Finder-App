import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Linking } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class ReviewScreen extends Component {

    renderLikedJobs = () => this.props.likedJobs.map((job) => {
            const initialRegion = {
                longitude: job.longitude,
                latitude: job.latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
              };
            return (
                <Card key={job.id} style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <Card.Content>
                        <Title
                            style={{ color: 'gray' }}
                            numberOfLines={1}
                        >
                            {job.title.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}
                        </Title>
                        <Paragraph style={{ color: 'gray' }}>
                            {job.company.display_name}
                        </Paragraph>
                    </Card.Content>
                    <Divider style={{ marginHorizontal: 15, marginTop: 10 }} />
                    <View style={styles.mapContainer}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1, }}
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
                    <Title
                        numberOfLines={1}
                        style={{ marginLeft: 20, color: 'gray' }}
                    >
                        {job.location.display_name}
                    </Title>
                    <Paragraph
                        style={styles.descriptionParagraph}
                        numberOfLines={4}
                    >
                    {job.description.replace(/<strong>/g, '').replace(/<\/strong>/g, '')}
              </Paragraph>
                <Card.Actions >
                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    <Button
                        dark
                        style={styles.buttonStyle}
                        icon={'arrow-right-bold'}
                        mode="outlined"
                                onPress={() => { Linking.openURL(job.redirect_url); }}
                    >
                        Apply for Job
                        </Button>
                        </View>
                    </Card.Actions>
                </Card>
            );
        });

    render() {
        const { appbarHeader, containerStyle } = styles;
        return (
            <ScrollView style={containerStyle}>
                <Appbar.Header style={appbarHeader}>
                    <Appbar.Content
                        title="Review"
                        color={'#DEF2F1'}
                        subtitle={'Review Your Saved Jobs'} 
                    />
                    <Appbar.Action
                        icon="cogs"
                        size={35}
                        onPress={() => this.props.navigation.navigate('SettingsStack')} 
                    />
                    </Appbar.Header>
                    {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        //marginTop: 24,
    },
    appbarHeader: {
        height: 40,
        marginTop: 35,
        marginBottom: 15,
        backgroundColor: '#2B7A78'
    },
    mapContainer: {
        height: 300,
        margin: 15,
    },
    descriptionParagraph: {
        marginHorizontal: 20,
        textAlign: 'justify',
        color: 'gray'
    },
    buttonStyle: {
        marginTop: 15,
        marginHorizontal: 10,
        marginBottom: 5,
        width: 200,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#2B7A78'
    },
});

const mapStateToProps = (state) => ({
    likedJobs: state.likedJobs
});

export default connect(mapStateToProps)(ReviewScreen);
