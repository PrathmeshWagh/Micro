import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "react-native";
import Appbar from "../../components/Appbar";
import Colors from "../../style/Colors/colors";
import { getMethod } from "../../utils/helper";

const NotificationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null); // Reset the error state before fetching
    try {
      const api = await getMethod(`get_notifications`);
      if (api.status === 200) {
        const formattedEvents = api.data.events.map(event => ({
          ...event,
          event_date: formatDate(event.event_date)
        }));
        setEvents(formattedEvents);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch (e) {
      setError("An error occurred while fetching notifications");
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.brand_primary} />;
  }

  if (error) {
    return (
      <View>
        <Appbar title={'Notification'} hideBell={true} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const getStatusBackgroundColor = (status) => {
      const lowercaseStatus = status.toLowerCase(); // Convert status to lowercase
      const backgroundColor = lowercaseStatus === 'unread' ? 'orange' : 'green'; // Compare with lowercase 'unread'
      return backgroundColor;
    };

    return (
      <View style={styles.notification}>
        <View style={styles.align}>
          <Text style={styles.name}>{item.first_name || 'Unknown'}</Text>
          <Text style={styles.date}>{item.event_date}</Text>
        </View>
        <View>
          <Text style={styles.title}>{item.event_title || 'No Title'}</Text>
          <Text style={styles.content}>{item.event_content || 'No Content'}</Text>
        </View>
        {/* <View style={styles.statusContainer}>
          <View style={[styles.status, { backgroundColor: getStatusBackgroundColor(item.event_status) }]}>
            <Text style={styles.statusText}>{item.event_status || 'No Status'}</Text>
          </View>
        </View> */}
      </View>
    );
  };

  return (
    <View>
      <Appbar title={'Notification'} hideBell={true} />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  status: {
    borderWidth: 0.2,
    width: 75,
    alignItems: 'center',
    padding: 3,
    borderRadius: 5
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.white
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notification: {
    borderColor: Colors.card_bg,
    backgroundColor: Colors.card_bg,
    elevation: 8,
    padding: 12,
    fontFamily: 'Roboto-Regular',
    marginTop: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10,
    color:Colors.text_primary

  },
  date: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    color:Colors.text_secondary

  },
  title: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    color:Colors.text_primary

  },
  content: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    color:Colors.text_primary
  },
});
