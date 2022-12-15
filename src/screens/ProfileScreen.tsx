import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		justifyContent: "center",
		alignItems: "center"
	},
	postItemContainer: {
		flex: 1,
		minWidth: "100%",
		marginTop: 30
	},
	postItem: {
		flex: 1,
		maxWidth: "33.3333%",
		minHeight: 100,
		maxHeight: 100,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: Colors.DARK_BLUE,
		alignContent: "center",
		justifyContent: "center"
	},
	image: {
		width: '100%',
		resizeMode: 'cover',
		flex: 1,
	}

});

interface Post {
	id: string;
	title: string;
	image_url?: string;
}

export default function ProfileScreen() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation<AllRoutesNavigationProp>();
	const { session, fullName } = useAppContext();
	const [totalPointState, setTotalPointState] = useState<number>(0);
	const [postCountState, setPostCountState] = useState<number>(0);
	const [postState, setPostState] = useState<Post[]>([]);
	// const [avatarUrl, setAvatarUrl] = useState('')


	useEffect(() => {
		if (session) {
			getProfile();
			getPosts();
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
				console.log("posts", posts);
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

				// setPostState(posts)
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

	const renderPostItem = ({ item }: { item: Post }) => (
		<View style={styles.postItem}>
			{/* <Text>{item.image_url}</Text> */}
			<Image source={{ uri: item.image_url}} style={styles.image} />
		</View>
	)

	return (
		<View style={styles.container}>
			<ProfileCard name={fullName} points={totalPointState} posts={postCountState} imageSource={require('../../assets/images/chiliplant.jpg')}></ProfileCard>
			<View style={styles.postItemContainer}>
				<FlatList data={postState} renderItem={renderPostItem} numColumns={3}></FlatList>
			</View>
			<Button onPress={logout}>{loading ? <Icon type={IconType.LOADING} /> : 'Logout'}</Button>
		</View>
	);
}
