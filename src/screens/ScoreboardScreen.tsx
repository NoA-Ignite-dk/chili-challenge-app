import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { containerStyles } from '@src/styles/generalStyles'

// Components

// Config
import Colors from '@src/config/colors';
import ScoreboardCard from '@src/components/ScoreboardCard';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.GREEN_PRIMARY,
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
		marginTop: 160
	},
	bottomContainer: {
		width: '100%',
		backgroundColor: Colors.WHITE,
		borderRadius: 12,
		height: 500
	},
	firstPlacePole: {
		height: 160,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'
	},
	secondPlacePole: {
		height: 120,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'
	},
	thirdPlacePole: {
		height: 105,
		width: 85,
		backgroundColor: Colors.DARK_GREEN,
		alignItems: 'center'

	},
	scoreboardNumbers: {
		fontSize: 50,
		fontWeight: '800',
		color: Colors.WHITE,
		marginTop: 10
	}
});

export default function ScoreboardScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
					<View style={styles.secondPlacePole}>
						<Text style={styles.scoreboardNumbers}>2</Text>
					</View>
					<View style={styles.firstPlacePole}>
						<Text style={styles.scoreboardNumbers}>1</Text>
					</View>
					<View style={styles.thirdPlacePole}>
						<Text style={styles.scoreboardNumbers}>3</Text>
					</View>
			</View>
			<View style={[styles.bottomContainer, containerStyles.padding]}>
				<ScoreboardCard name="Laura Toft" points={20} imageSource={require('../../assets/images/chiliplant.jpg')}/>
			</View>
		</View>
	);
}
