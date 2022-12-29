import { supabase } from "@src/lib/supabase";
import { takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QUERY_KEY as USERS_WITH_POINTS } from './users-with-points';

export const QUERY_KEY = 'USER_PROFILE';

export interface Profile {
	fullName: string;
	profilePicture: string;
}

export async function getUserProfile(id: string): Promise<Profile> {
	const { data, error } = await supabase
		.from('profiles')
		.select(`
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

export function useUserProfileQuery(id?: string) {
	const hook = useQuery([QUERY_KEY, id], {
		queryFn: () => getUserProfile(id as string),
		enabled: !!id,
	});

	return hook;
}

export async function updateUserProfile(id: string, { fullName, profilePicture }: Partial<Profile>): Promise<Profile> {
	const { data, error } = await supabase
		.from('profiles')
		.update({
			full_name: fullName,
			avatar_url: profilePicture,
			updated_at: new Date(),
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
			onSuccess: (data, { id }) => {
				queryClient.invalidateQueries([QUERY_KEY, id])
				queryClient.invalidateQueries(USERS_WITH_POINTS)
			},
		}
	)
}
