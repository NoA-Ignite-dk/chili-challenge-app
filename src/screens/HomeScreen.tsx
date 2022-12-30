import React from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

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
	const { data: postsData, isLoading, refetch, isRefetching } = usePostsQuery();
	const renderPostItem = ({ item }: { item: PublicPost }) => <PostCard item={item} />;

	const onRefresh = React.useCallback(() => {
		refetch();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading && (
				<View>
					<Text>Loading...</Text>
				</View>
			)}

			<FlatList
				refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />}
				data={postsData}
				renderItem={renderPostItem}
				keyExtractor={(item) => `postCard-${item.id}`}
			/>
		</View>
	);
}
