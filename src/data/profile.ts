import { supabase } from "@src/lib/supabase";
import { useQuery } from "react-query";

export const QUERY_KEY = 'PROFILE';

export interface Profile {
	id: string;
	fullName: string;
	profilePicture: string;
}

export async function getProfile(id: string): Promise<Profile> {
	const { data, error } = await supabase
		.from('profiles')
		.select(`
			id,
			fullName: full_name,
			profilePicture: avatar_url
		`)
		.eq('id', id)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find a profile by given id: ${id}`);
	}

	return data;
}

export function useProfileQuery(id: string) {
	const hook = useQuery([QUERY_KEY, id], {
		queryFn: () => getProfile(id),
	});

	return hook;
}

