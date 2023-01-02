import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { containerStyles } from '@src/styles/generalStyles'

// Components
import Button from '@src/components/buttons/PrimaryButton';

// Config
import Colors from '@src/config/colors';

import Icon, { IconType } from '@src/components/Icon';
import ProfileCard from '@src/components/ProfileCard';
import EditProfileModal from '@src/components/EditProfileModal';
import { allPostsTab } from './tabs/allPostsTab';
import { allPlantsTab } from './tabs/allPlantsTab';
import { claimedPointsListTab } from './tabs/claimedPointsListTab';

const styles = StyleSheet.create({
	container: {
		minHeight: 170,
		backgroundColor: Colors.WHITE,
		paddingHorizontal: 15
	},
});

export default function ProfileScreen() {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);

	const [routes] = React.useState([
		{ key: 'allPosts', title: 'Posts' },
		{ key: 'allPlants', title: 'Plants' },
		{ key: 'claimedPointsList', title: 'Claimed points list' },
	]);




	const getTabBarIcon = ({ route, color }: { route: Route, color: string }) => {
		switch (route.key) {
			case 'allPosts':
				return <Icon type={IconType.PROFILE_POSTS} stroke={color} />
			case 'allPlants':
				return <Icon type={IconType.PROFILE_PLANTS} stroke={color} />
			case 'claimedPointsList':
				return <Icon type={IconType.PROFILE_CLAIMED_POINTS} stroke={color} />
			default:
				return null;
		}
	}

	const renderTabBar = (props: SceneRendererProps & {
		navigationState: NavigationState<{
			key: string;
			title: string;
		}>;
	}) => (
		<TabBar
			{...props}
			activeColor={Colors.GREEN_PRIMARY}
			inactiveColor={Colors.GREY}
			style={{ backgroundColor: Colors.WHITE, borderBottomWidth: 0.5, borderBottomColor: Colors.LIGHT_GREY }}
			tabStyle={{ width: layout.width / 3, marginTop: 10, marginBottom: 10 }}
			labelStyle={{ display: 'none', height: 0 }}
			scrollEnabled={false}
			// renderIndicator={() => null}
			indicatorStyle={{backgroundColor: Colors.GREEN_PRIMARY}}
			renderIcon={getTabBarIcon}
		/>
	);

	const renderScene = SceneMap({
		allPosts: allPostsTab,
		allPlants: allPlantsTab,
		claimedPointsList: claimedPointsListTab
	});

	return (
		<>
			<View style={styles.container}>
				<ProfileCard />
				<Button onPress={() => setEditProfileModalVisible(true)} icon={'edit'}>
					Edit profile
				</Button>
			</View>
			<TabView
				navigationState={{ index, routes }}
				renderTabBar={renderTabBar}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				style={containerStyles.container}
			/>
			<EditProfileModal open={editProfileModalVisible} setOpen={setEditProfileModalVisible} />
		</>
	);
}
