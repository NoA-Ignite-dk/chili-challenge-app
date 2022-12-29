import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const QUERY_KEY = 'USER_PLANTS';

export interface Plant {
	id: number;
	name: string;
	image_url: string;
	primary: boolean;
}

export async function getUserPlants(user_id: string): Promise<Plant[]> {
	const { data, error } = await supabase
		.from('plant')
		.select(`
			id,
			name,
			image_url,
			primary
		`)
		.eq('user_id', user_id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find plants for user id: ${user_id}`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
}

export function useUserPlantsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getUserPlants(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}

export async function updateUserPlant(id: number, payload: Partial<Plant>): Promise<void> {
	const { error } = await supabase
		.from('plant')
		.update(payload)
		.match({
			id,
		});

	if (error) {
		throw error;
	}
}

export function useUpdateUserPlantMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: number,
			payload: Partial<Plant>,
		}) => updateUserPlant(id, payload),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_KEY)
			},
		}
	)
}

export interface CreatePlantDTO {
	user_id: string;
	name?: string;
	image_url?: string;
	primary?: boolean;
}

export async function createUserPlant(payload: CreatePlantDTO): Promise<Plant> {
	const { data, error } = await supabase
		.from('plant')
		.insert(payload)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return takeFirstRow(data);
}

export function useCreateUserPlantMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ payload }: {
			payload: CreatePlantDTO
		}) => createUserPlant(payload),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_KEY)
			},
		}
	)
}
