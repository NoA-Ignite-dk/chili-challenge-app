import { supabase } from '@src/lib/supabase';
import { normalizeRows, takeFirstRow } from '@src/utils/normalizeData';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const QUERY_KEY = 'POSTS';

export interface PublicPost {
	id: number;
	description: string;
	image_url: string;
	user_id: string;
	created_at: Date;
}

export async function getAllPosts(): Promise<PublicPost[]> {
	const { data, error } = await supabase
		.from('post')
		.select(`
			id,
			description,
			image_url,
			user_id,
			created_at
		`)
		.order('id', { ascending: false });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find posts`);
	}

	return normalizeRows(data).filter((e) => !!e?.id);
}

export function usePostsQuery() {
	return useQuery(QUERY_KEY, () => getAllPosts());
}

export async function getPostsByUserID(userId: string): Promise<PublicPost[]> {
	const { data, error } = await supabase
		.from('post')
		.select(`
			id,
			description,
			image_url,
			user_id,
			created_at
		`)
		.order('id', { ascending: false })
		.match({
			user_id: userId,
		});

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find posts`);
	}

	return normalizeRows(data).filter((e) => !!e?.id);
}

export function usePostsByUserIDQuery(userId: string) {
	return useQuery(
		[QUERY_KEY, userId],
		() => getPostsByUserID(userId),
	);
}

export async function updatePosts(id: string, payload: Partial<PublicPost>): Promise<PublicPost> {
	const { data, error } = await supabase
		.from('post')
		.update(payload)
		.match({
			id,
		})
		.select(`
			id,
			description,
			image_url,
			user_id,
			created_at
		`)
		.single();

	if (error) {
		throw error;
	}

	return data;
}

export function useUpdatePostsMutation() {
	const queryClient = useQueryClient();

	return useMutation(({ id, payload }: { id: string; payload: Partial<PublicPost> }) => updatePosts(id, payload), {
		onSuccess: (id, { payload }) => {
			queryClient.invalidateQueries([QUERY_KEY, payload.user_id],);
		},
	});
}

export interface CreatePostDTO {
	user_id: string;
	description?: string;
	image_url?: string;
}

export async function createPost(payload: CreatePostDTO): Promise<PublicPost> {
	const { data, error } = await supabase
		.from('post')
		.insert(payload)
		.select(`
			id,
			description,
			image_url,
			user_id,
			created_at
		`)
		.single();

	if (error) {
		throw error;
	}

	return takeFirstRow(data);
}

export function useCreatePostsMutation() {
	const queryClient = useQueryClient();

	return useMutation(
		({ payload }: { id: string; payload: CreatePostDTO }) => createPost(payload),
		{ onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEY);
		},
	});
}
