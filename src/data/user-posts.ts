import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const QUERY_KEY = 'USER_POSTS';

export interface Post {
	id: number;
	title: string;
	description: string;
	image_url: string;
}

export async function getUserPosts(id: string): Promise<Post[]> {
	const { data, error } = await supabase
		.from('post')
		.select(`
			id,
			title,
			description,
			image_url
		`)
		.eq('user_id', id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find posts for user id: ${id}`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
}

export function useUserPostsQuery(id: string | undefined) {
	const hook = useQuery([QUERY_KEY, id], {
		queryFn: () => getUserPosts(id as string),
		enabled: !!id,
	});

	return hook;
}

export async function updateUserPosts(id: string, payload: Partial<Post>): Promise<void> {
	const { error } = await supabase
		.from('posts')
		.update({
			...payload,
			updated_at: new Date(),
		})
		.match({
			id,
		});

	if (error) {
		throw error;
	}
}

export function useUpdateUserPostsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<Post>
		}) => updateUserPosts(id, payload),
		{
			onSuccess: (data, { id }) => {
				queryClient.invalidateQueries([QUERY_KEY, id])
			},
		}
	)
}

export async function createUserPost(payload: Omit<Post, 'id'> & { user_id: string } ): Promise<Post> {
	const { data, error } = await supabase
		.from('post')
		.insert(payload)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return takeFirstRow(data);
}

export function useCreateUserPostsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ payload }: {
			id: string,
			payload: Omit<Post, 'id'> & { user_id: string }
		}) => createUserPost(payload),
		{
			onSuccess: (data, { id }) => {
				queryClient.invalidateQueries([QUERY_KEY, id])
			},
		}
	)
}
