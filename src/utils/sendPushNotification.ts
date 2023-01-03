import * as Notifications from 'expo-notifications';

export const schedulePushNotification = async (expoPushToken: any) => {
	const weeklyNotification = {
		to: expoPushToken,
		sound: 'default',
		content: {
			title: '🚿 Watering time 🚿',
			body: 'Remember to water your plants for the weekend!',
			data: {},
		},
		trigger: {
			dayOfWeek: [5],
			hour: 12,
			minute: 0,
			repeats: true,
		},
	};

	const dailyNotification = {
		to: expoPushToken,
		sound: 'default',
		content: {
			title: '🚿 Watering time 🚿',
			body: 'Remember to water your plants before you go home!',
			data: {},
		},
		trigger: {
			dayOfWeek: [1, 2, 3, 4, 5],
			hour: 15,
			minute: 30,
			repeats: true,
		},
	};

	await Notifications.scheduleNotificationAsync(weeklyNotification);
	await Notifications.scheduleNotificationAsync(dailyNotification);
};
