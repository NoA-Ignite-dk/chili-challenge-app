import { supabase } from "@src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "react-query";

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

export async function updateUserProfile(id: string, { fullName, profilePicture }: Profile): Promise<void> {
	const { error } = await supabase
		.from('profiles')
		.update({
			full_name: fullName,
			avatar_url: profilePicture,
			updated_at: new Date(),
		})
		.match({
			id,
		});

	if (error) {
		throw error;
	}
}

export function useUserProfileMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Profile
		}) => updateUserProfile(id, payload),
		{
			onSuccess: (data, { id }) => {
				queryClient.invalidateQueries([QUERY_KEY, id])
			},
		}
	)
}
