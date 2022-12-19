import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, FlatList, Image, useWindowDimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';
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
import { normalizeRows, takeFirstRow } from '@src/utils/normalizeData';
import ProfileCard from '@src/components/ProfileCard';
import { ProfileImage } from '@src/components/ProfileImage';

const styles = StyleSheet.create({
	postItemContainer: {
		flex: 1,
		minWidth: "100%",
		marginTop: 10,
		backgroundColor: Colors.WHITE

	},
	postItem: {
		flex: 1,
		maxWidth: "33.3333%",
		minHeight: 135,
		maxHeight: 135,
		alignContent: "center",
		justifyContent: "center"
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

interface Post {
	id: string;
	title: string;
	image_url?: string;
}
interface Plant {
	id: string;
	name: string;
	image_url?: string;
	primary: boolean;
}

const renderPostItem = ({ item }: { item: Post }) => (
	<View style={styles.postItem}>
		<Image source={{ uri: item.image_url }} style={styles.image} />
	</View>
)


export default function ProfileScreen() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { session, fullName } = useAppContext();
	const [totalPointState, setTotalPointState] = useState<number>(0);
	const [postCountState, setPostCountState] = useState<number>(0);
	const [postState, setPostState] = useState<Post[]>([]);
	const [plantState, setPlantState] = useState<Plant[]>([]);
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	// const [isPrimarySet, setIsPrimarySet] = useState(false);
	const hasPrimaryPlant = plantState.some((plant) => plant.primary);

	const [routes] = React.useState([
		{ key: 'allPosts', title: 'Posts' },
		{ key: 'allPlants', title: 'Plants' },
		{ key: 'claimedPointsList', title: 'Claimed points list' },
	]);

	useEffect(() => {
		if (session) {
			getProfile();
			getPosts();
			getPlants();

		}
	}, [session])

	async function getPosts() {
		try {
			setLoading(true)

			const { data, error } = await supabase
				.from('post')
				.select(`
					id,
					title,
					image_url
				`)
				.eq('user_id', session?.user.id)

			if (error) {
				throw error;
			}

			if (data) {

				const posts = normalizeRows(data)
					.filter((e) => !!e?.id)
				setPostState(posts);
				// console.log("posts", posts);
				// setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message)
			} else {
				// eslint-disable-next-line no-console
				console.error('Error', error);
			}
		} finally {
			setLoading(false)
		}
	}

	async function getPlants() {
		try {
			setLoading(true)

			const { data, error } = await supabase
				.from('plant')
				.select(`
					id,
					name,
					image_url,
					primary
				`)
				.eq('user_id', session?.user.id)
				.order('id', { ascending: true })

			if (error) {
				throw error;
			}

			if (data) {

				const plants = normalizeRows(data)
					.filter((e) => !!e?.id)
				console.log(plants);

				setPlantState(plants);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message)
			} else {
				// eslint-disable-next-line no-console
				console.error('Error', error);
			}
		} finally {
			setLoading(false)
		}
	}

	const setPrimary = async (item: Plant) => {
		const { error } = await supabase
			.from('plant')
			.update({ primary: true })
			.eq('id', item.id);

		if (error) {
			throw error;
		}

		await getPlants();
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
						{item.primary ? (
							<Text>Primary</Text>
						) : (
							<Text>Not primary</Text>
						)}
					</View>
				)}
			</View>
		</View >
	)

	async function getProfile() {
		try {
			setLoading(true)

			const { data, error } = await supabase
				.from('profiles')
				.select(`
					post (
						id,
						title
					),
					point (
						point_to_claim (
							amount
						)
					)
				`)
				.eq('id', session?.user.id)
				.limit(1)
				.single();

			if (error) {
				throw error;
			}

			if (data) {
				const totalPoints = normalizeRows(data.point).reduce((amount, e) => {
					if (!e) {
						return amount;
					}

					const claim = takeFirstRow(e.point_to_claim);

					if (!claim) {
						return amount;
					}

					return amount + (claim.amount as number);
				}, 0);

				const postCount = normalizeRows(data.post)
					.filter((e) => !!e?.id)
					.length;

				setTotalPointState(totalPoints)
				setPostCountState(postCount)
				// setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message)
			} else {
				// eslint-disable-next-line no-console
				console.error('Error', error);
			}
		} finally {
			setLoading(false)
		}
	}



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

	const getTabBarIcon = (props: any) => {

		const { route } = props

		// eslint-disable-next-line default-case
		switch (route.key) {
			case 'allPosts':
				return <Icon type={IconType.PROFILE_POSTS} />
			case 'allPlants':
				return <Icon type={IconType.PROFILE_POSTS} />
			case 'claimedPointsList':
				return <Icon type={IconType.PROFILE_CLAIMED_POINTS} />
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
			<ProfileCard name={fullName} points={totalPointState} posts={postCountState} imageSource={require('../../assets/images/chiliplant.jpg')}></ProfileCard>
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
