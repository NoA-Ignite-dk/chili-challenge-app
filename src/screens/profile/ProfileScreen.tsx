import React, { useState } from 'react';
import { Alert, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { containerStyles } from '@src/styles/generalStyles'

// Components
import Button from '@src/components/buttons/PrimaryButton';

// Config
import Colors from '@src/config/colors';
import { supabase } from '@src/lib/supabase';
import { AllRoutesNavigationProp } from '@src/types/navigation';
import { ROUTES } from '@src/config/routes';
import Icon, { IconType } from '@src/components/Icon';
import ProfileCard from '@src/components/ProfileCard';
import { queryClient } from '@src/lib/reactQuery';
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
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);

	const [routes] = React.useState([
		{ key: 'allPosts', title: 'Posts' },
		{ key: 'allPlants', title: 'Plants' },
		{ key: 'claimedPointsList', title: 'Claimed points list' },
	]);

	async function logout() {
		setLoading(true);
		const { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		} else {
			queryClient.clear()
			navigation.navigate(ROUTES.AUTH_LANDING_PAGE);
		}

		setLoading(false);
	}


	const getTabBarIcon = ({ route }: { route: Route }) => {
		switch (route.key) {
			case 'allPosts':
				return <Icon type={IconType.PROFILE_POSTS} />
			case 'allPlants':
				return <Icon type={IconType.PROFILE_POSTS} />
			case 'claimedPointsList':
				return <Icon type={IconType.PROFILE_CLAIMED_POINTS} />
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
			style={{ backgroundColor: Colors.WHITE, borderBottomWidth: 0.5, borderBottomColor: Colors.LIGHT_GREY }}
			tabStyle={{ width: layout.width / 3, marginTop: 10, marginBottom: 10 }}
			labelStyle={{ display: 'none', height: 0 }}
			scrollEnabled={false}
			renderIndicator={() => null}
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
				{/* <Button onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
					Edit profile <Icon type={IconType.EDIT} />
				</Button> */}
				<Button onPress={() => setEditProfileModalVisible(true)}>
					Edit profile <Icon type={IconType.EDIT} />
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
			<Button onPress={logout}>{loading ? <Icon type={IconType.LOADING} /> : 'Logout'}</Button>
			<EditProfileModal open={editProfileModalVisible} setOpen={setEditProfileModalVisible} />
		</>
	);
}
