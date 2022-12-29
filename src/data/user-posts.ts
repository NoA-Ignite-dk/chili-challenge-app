import { supabase } from '@src/lib/supabase';
import { normalizeRows, takeFirstRow } from '@src/utils/normalizeData';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const QUERY_KEY = 'USER_POSTS';

export interface Post {
	id: number;
	description: string;
	image_url: string;
}

export async function getUserPosts(user_id: string): Promise<Post[]> {
	const { data, error } = await supabase
		.from('post')
		.select(
			`
			id,
			description,
			image_url
		`,
		)
		.eq('user_id', user_id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find posts for user id: ${user_id}`);
	}

	return normalizeRows(data).filter((e) => !!e?.id);
}

export function useUserPostsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getUserPosts(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}

export async function updateUserPosts(id: string, payload: Partial<Post>): Promise<void> {
	const { error } = await supabase
		.from('posts')
		.update(payload)
		.match({
			id,
		});

	if (error) {
		throw error;
	}
}

export function useUpdateUserPostsMutation() {
	const queryClient = useQueryClient();

	return useMutation(({ id, payload }: { id: string; payload: Partial<Post> }) => updateUserPosts(id, payload), {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEY);
		},
	});
}


export interface CreatePostDTO {
	user_id: string;
	description?: string;
	image_url?: string;
}

export async function createUserPost(payload: CreatePostDTO): Promise<Post> {
	const { data, error } = await supabase.from('post').insert(payload).select().single();

	if (error) {
		throw error;
	}

	return takeFirstRow(data);
}

export function useCreateUserPostsMutation() {
	const queryClient = useQueryClient();

	return useMutation(({ payload }: { id: string; payload: CreatePostDTO }) => createUserPost(payload), {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEY);
		},
	});
}
