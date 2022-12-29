import { supabase } from "@src/lib/supabase";
import { takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QUERY_KEY as USERS_WITH_POINTS } from './users-with-points';

export const QUERY_KEY = 'USER_PROFILE';

export interface Profile {
	fullName: string;
	profilePicture: string;
}

export async function getUserProfile(user_id: string): Promise<Profile> {
	const { data, error } = await supabase
		.from('profiles')
		.select(`
			fullName: full_name,
			profilePicture: avatar_url
		`)
		.eq('id', user_id)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find a profile by given id: ${user_id}`);
	}

	return data;
}

export function useUserProfileQuery(user_id?: string) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getUserProfile(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}

export async function updateUserProfile(id: string, { fullName, profilePicture }: Partial<Profile>): Promise<Profile> {
	const { data, error } = await supabase
		.from('profiles')
		.update({
			full_name: fullName,
			avatar_url: profilePicture,
		})
		.match({
			id,
		})
		.select()
		.single();

	if (error) {
		throw error;
	}

	return takeFirstRow(data);
}

export function useUserProfileMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<Profile>
		}) => updateUserProfile(id, payload),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries(USERS_WITH_POINTS)
			},
		}
	)
}
