import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import Txt from '@src/components/Txt';

// Config
import Colors from '@src/config/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Txt style={{ fontWeight: '200' }}>Home/Feed</Txt>
		</View>
	);
}
