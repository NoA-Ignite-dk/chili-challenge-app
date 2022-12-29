import React, { useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

// Config
import Colors from '@src/config/colors';
import { PublicPost, usePostsQuery } from '@src/data/posts';

// Types
import PostCard from '@src/components/PostCard';
import { sendPushNotification } from '@src/utils/sendPushNotification';
import { registerForPushNotificationsAsync } from '@src/utils/registerForPushNotifications';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.OFF_WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function HomeScreen() {
	const { data: postsData, isLoading } = usePostsQuery();
	const renderPostItem = ({ item }: { item: PublicPost }) => <PostCard item={item} />;
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	console.log(expoPushToken, 'push token');

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return (
		<View style={styles.container}>
			{isLoading && (
				<View>
					<Text>Loading...</Text>
				</View>
			)}
			<FlatList data={postsData} renderItem={renderPostItem} keyExtractor={(item) => `postCard-${item.id}`} />
		</View>
	);
}
