import { supabase } from '@src/lib/supabase';
import { takeFirstRow } from '@src/utils/normalizeData';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPostsByUserID } from './posts';

export const QUERY_KEY = 'USER_POSTS';

export interface Post {
	id: number;
	description: string;
	image_url: string;
}

export function useUserPostsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getPostsByUserID(user_id as string),
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
