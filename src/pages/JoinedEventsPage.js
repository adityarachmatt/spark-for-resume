import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Event from '../shared_components/Event';
import { GetAllEventsLink } from '../shared_components/api_routes';
import { useFocusEffect } from '@react-navigation/native';
import { leaveEvent, joinEvent } from "../shared_components/api_calls";
import { colors, typography, componentWidth } from '../shared_styles/master_styles';

const DEFAULT_NAME = "Aditya"

export default function JoinedEventsPage( { navigation }) {
    const [name, setName] = useState(DEFAULT_NAME)
    const [eventDataList, setEventDataList] = useState([]); // Start with an empty array

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(GetAllEventsLink);
                    const data = await response.json();
                    const filteredData = data.filter(eventData => eventData.membersList.includes(DEFAULT_NAME));
                    setEventDataList(filteredData);
                } catch (error) {
                    console.error('Failed to fetch events:', error);
                }
            };

            fetchData();

            // Optional: Return a cleanup function if needed
            return () => {
                // Cleanup code here if necessary
            };
        }, []))

    const discover_leaveEvent = async (eventID, username) => {
        const data = await leaveEvent(eventID, username)
        edited_event = await data.eventData.Items[0]
        setEventDataList(prevstate => prevstate.map(item => {
            if(item.EventID == edited_event.EventID){
                return edited_event
            }
            else{return item}
        }))
    }

    const discover_joinEvent = async (eventID, username) => {
        const data = await joinEvent(eventID, username)
        edited_event = await data.eventData.Items[0]
        setEventDataList(prevstate => prevstate.map(item => {
            if(item.EventID == edited_event.EventID){
                return edited_event
            }
            else{return item}
        }))
    }

    const ItemSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={eventDataList}
                renderItem={({ item }) => <Event eventData={item} key={item.EventID} leaveEvent={discover_leaveEvent} joinEvent={discover_joinEvent} navigation={navigation}/>}
                keyExtractor={item => item.id} // Adjust according to your data structure, assuming each event has a unique 'id'
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: colors.secondaryColor,
    },
});
