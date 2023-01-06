import { supabase } from "@src/lib/supabase";
import { takeFirstRow } from "@src/utils/normalizeData";
import { useMutation, useQuery, useQueryClient } from "react-query";
// eslint-disable-next-line import/no-cycle
import { QUERY_KEY as USERS_WITH_POINTS } from './users-with-points';

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
			onSuccess: ({ id }) => {
				queryClient.invalidateQueries(USERS_WITH_POINTS)
				queryClient.invalidateQueries([QUERY_KEY, id])
			},
		}
	)
}
