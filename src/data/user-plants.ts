import { supabase } from "@src/lib/supabase";
import { normalizeRows } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const QUERY_KEY = 'USER_PLANTS';

export interface Plant {
	id: string;
	name: string;
	image_url: string;
	primary: boolean;
}

export async function getUserPlants(id: string): Promise<Plant[]> {
	const { data, error } = await supabase
		.from('plant')
		.select(`
			id,
			name,
			image_url,
			primary
		`)
		.eq('user_id', id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find plants for user id: ${id}`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
}

export function useUserPlantsQuery(id: string | undefined) {
	const hook = useQuery([QUERY_KEY, id], {
		queryFn: () => getUserPlants(id as string),
		enabled: !!id,
	});

	return hook;
}

export async function updateUserPlants(id: string, payload: Partial<Plant>): Promise<void> {
	const { error } = await supabase
		.from('plants')
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

export function useUserPlantsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<Plant>
		}) => updateUserPlants(id, payload),
		{
			onSuccess: (data, { id }) => {
				queryClient.invalidateQueries([QUERY_KEY, id])
			},
		}
	)
}
