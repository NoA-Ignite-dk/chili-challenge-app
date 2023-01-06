import Colors from '@src/config/colors';
import { usePostsByUserIDQuery, PublicPost } from '@src/data/posts';
import { typography } from '@src/styles/generalStyles';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';

const styles = StyleSheet.create({
	postItemContainer: {
		flex: 1,
		minWidth: '100%',
		backgroundColor: Colors.WHITE,
		marginTop: 2,
	},
	postItem: {
		flex: 1,
		maxWidth: '33.3333%',
		minHeight: 135,
		maxHeight: 135,
		alignContent: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		resizeMode: 'cover',
		flex: 1,
	},
});

export function AllPostsTab({ userId }: { userId: string }) {
	const { data: postState } = usePostsByUserIDQuery(userId);

	const renderPostItem = ({ item }: { item: PublicPost }) => (
		<View style={styles.postItem}>
			<Image source={{ uri: item.image_url }} style={styles.image} />
		</View>
	);

	return (
		<>
			{!postState?.length && <Text style={typography.placeholderText}>No posts yet!</Text>}
			<View style={styles.postItemContainer}>
				<FlatList data={postState} renderItem={renderPostItem} numColumns={3}></FlatList>
			</View>
		</>
	);
}
