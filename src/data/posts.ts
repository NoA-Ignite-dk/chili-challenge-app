import { supabase } from '@src/lib/supabase';
import { normalizeRows } from '@src/utils/normalizeData';
import { useQuery } from 'react-query';

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
		.select(
			`
			id,
			description,
			image_url,
			user_id,
			created_at
		`,
		)
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
