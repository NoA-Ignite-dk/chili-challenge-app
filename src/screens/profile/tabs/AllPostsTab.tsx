import Colors from "@src/config/colors";
import { usePostsByUserIDQuery } from "@src/data/posts";
import { Post } from "@src/data/user-posts";
import { StyleSheet, View, FlatList, Image } from 'react-native';

const styles = StyleSheet.create({
	postItemContainer: {
		flex: 1,
		minWidth: "100%",
		backgroundColor: Colors.WHITE,
		marginTop: 2
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
	}
});

export function AllPostsTab({ userId }: { userId: string }) {
	const { data: postState } = usePostsByUserIDQuery(userId);

	const renderPostItem = ({ item }: { item: Post }) => (
		<View style={styles.postItem}>
			<Image source={{ uri: item.image_url }} style={styles.image} />
		</View>
	)

	return (
		<View style={styles.postItemContainer}>
			<FlatList data={postState} renderItem={renderPostItem} numColumns={3}></FlatList>
		</View>
	);
}
