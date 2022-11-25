import React from 'react';
import { View } from 'react-native';

// import Colors from '@src/config/colors';
import ProfileCard from '@src/components/ProfileCard';
import { containerStyles } from '@src/styles/generalStyles'

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: Colors.WHITE,
// 	},
// });

export default function ProfileScreen() {
	return (
		<View style={[containerStyles.container, containerStyles.padding]}>
			<ProfileCard name="Laura Toft" points={3} posts={3} imageSource={require('../../assets/images/chiliplant.jpg')}/>
		</View>
	);
}
