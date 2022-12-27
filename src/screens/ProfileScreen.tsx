import React, { useState } from 'react';
import { Alert, StyleSheet, View, FlatList, Image, useWindowDimensions, Text } from 'react-native';
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
import { useAppContext } from '@src/components/providers/appContext';
import ProfileCard from '@src/components/ProfileCard';
import { ProfileImage } from '@src/components/ProfileImage';
import { useUserProfileQuery } from '@src/data/user-profile';
import { useUserPlantsQuery, useUpdateUserPlantMutation, Plant } from '@src/data/user-plants';
import { Post, useUserPostsQuery } from '@src/data/user-posts';
import { useUserPointsQuery } from '@src/data/user-points';

const styles = StyleSheet.create({
	postItemContainer: {
		flex: 1,
		minWidth: "100%",
		marginTop: 10,
		backgroundColor: Colors.WHITE
	},
	container: {
		minHeight: 170,
		backgroundColor: Colors.WHITE,
		paddingHorizontal: 15
	},
	postItem: {
		flex: 1,
		maxWidth: "33.3333%",
		minHeight: 135,
		maxHeight: 135,
		alignContent: "center",
		justifyContent: "center"
	},
	greenBackground: {
		backgroundColor: Colors.GREEN_PRIMARY,
		borderRadius: 15,
		padding: 12,
	},
	buttonText: {
		color: Colors.WHITE,
		textTransform: "uppercase"
	},

	image: {
		width: '100%',
		resizeMode: 'cover',
		flex: 1,
	},
	grid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		borderBottomWidth: 1,
		borderBottomColor: Colors.LIGHT_GREY,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 15,
		paddingVertical: 15,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		flexBasis: 100,
		flexGrow: 1
	},
	item3: {
		justifyContent: "flex-end"
	},
});

const renderPostItem = ({ item }: { item: Post }) => (
	<View style={styles.postItem}>
		<Image source={{ uri: item.image_url }} style={styles.image} />
	</View>
)

export default function ProfileScreen() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { session } = useAppContext();
	const { data: profileData } = useUserProfileQuery(session?.user.id);
	const { data: pointsData } = useUserPointsQuery(session?.user.id);
	const { data: plantState } = useUserPlantsQuery(session?.user.id);
	const plantsMutation = useUpdateUserPlantMutation();
	const { data: postState } = useUserPostsQuery(session?.user.id);
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);

	const hasPrimaryPlant = (plantState || [])
		.some((plant) => plant.primary);

	const postCount = (postState || []).length;

	const totalPointState = (pointsData || [])
		.reduce(
			(col, e) => col + (e.point_to_claim?.amount || 0),
			0,
		);

	const [routes] = React.useState([
		{ key: 'allPosts', title: 'Posts' },
		{ key: 'allPlants', title: 'Plants' },
		{ key: 'claimedPointsList', title: 'Claimed points list' },
	]);

	const setPrimary = async (item: Plant) => {
		plantsMutation.mutate({ id: item.id, payload: { primary: true } });
	};

	const renderPlant = ({ item }: { item: Plant }) => (
		<View style={[containerStyles.container, styles.grid]}>
			<View style={styles.item}>
				<ProfileImage imageSource={{ uri: item.image_url }} size={"large"}></ProfileImage>
				<Text> {item.name} </Text>
			</View>
			<View style={[styles.item, styles.item3]}>
				{!hasPrimaryPlant && (
					<View>
						<Button onPress={() => setPrimary(item)}>Set as primary</Button>
					</View>
				)}
				{hasPrimaryPlant && (
					<View>
						{item.primary && (
							<View style={styles.greenBackground}>
								<Text style={styles.buttonText}>Primary</Text>
							</View>
						)}
					</View>
				)}
			</View>
		</View >
	)

	async function logout() {
		setLoading(true);
		const { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		} else {
			navigation.navigate(ROUTES.AUTH_LANDING_PAGE);
		}

		setLoading(false);
	}

	const allPostsRoute = () => (
		<View style={styles.postItemContainer}>
			<FlatList data={postState} renderItem={renderPostItem} numColumns={3}></FlatList>
		</View>
	);

	const allPlantsRoute = () => (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<FlatList data={plantState} renderItem={renderPlant}></FlatList>
		</View>
	);

	const claimedPointsListRoute = () => (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<Text>Claimed points list</Text>
		</View>
	);

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
		allPosts: allPostsRoute,
		allPlants: allPlantsRoute,
		claimedPointsList: claimedPointsListRoute
	});

	return (
		<>
			<View style={styles.container}>
				<ProfileCard name={profileData?.fullName || ''} points={totalPointState} posts={postCount} imageSource={require('../../assets/images/chiliplant.jpg')} />
				<Button onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
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
		</>
	);
}
