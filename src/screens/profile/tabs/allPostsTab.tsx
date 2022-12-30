import { useAppContext } from "@src/components/providers/appContext";
import Colors from "@src/config/colors";
import { Post, useUserPostsQuery } from "@src/data/user-posts";
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

export function allPostsTab() {
	const { session } = useAppContext();
	const { data: postState } = useUserPostsQuery(session?.user.id);

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
