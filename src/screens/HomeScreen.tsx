import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Config
import Colors from '@src/config/colors';
import { PublicPost, usePostsQuery } from '@src/data/posts';

// Types
import PostCard from '@src/components/PostCard';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.OFF_WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function HomeScreen() {
	const { data: postsData, isLoading } = usePostsQuery();
	const renderPostItem = ({ item }: { item: PublicPost }) => <PostCard item={item} />;

	return (
		<View style={styles.container}>
			{isLoading && (
				<View>
					<Text>Loading...</Text>
				</View>
			)}
			<FlatList data={postsData} renderItem={renderPostItem} keyExtractor={(item) => `postCard-${item.id}`} />
		</View>
	);
}
