import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Components
import PrimaryButton from '@src/components/buttons/PrimaryButton';
import Txt from '@src/components/Txt';

// Config
import Colors from '@src/config/colors';
import { ROUTES } from '@src/config/routes';

// Types
import { MainStackParamList, MainStackNavigationProp } from '@src/types/navigation';

// Utils
import { verticalScale } from '@src/utils/scaling';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BLACK,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: Colors.WHITE,
	},
	btn: {
		marginTop: verticalScale(20),
	},
});

interface Props {
	route: RouteProp<MainStackParamList, ROUTES.DETAIL_PAGE>;
	navigation: MainStackNavigationProp;
}

export default function DetailScreen({ route, navigation }: Props) {
	const { pageId, title } = route.params;

	useEffect(() => {
		navigation.setOptions({
			headerTitle: title,
		});
	}, []);

	const onPress = () => navigation.goBack();

	return (
		<View style={styles.container}>
			<Txt style={{ fontWeight: '200', ...styles.text }}>Welcome to the detail page with id:</Txt>
			<Txt style={{ fontWeight: '600', ...styles.text }}>{pageId}</Txt>
			<PrimaryButton style={styles.btn} onPress={onPress}>
				Go back
			</PrimaryButton>
		</View>
	);
}
