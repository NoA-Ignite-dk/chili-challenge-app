import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const QUERY_KEY = 'PLANTS';

export interface Plant {
	id: number;
	name: string;
	image_url: string;
	user_id: string;
	primary: boolean;
}

export async function getPlantsByUserId(user_id: string): Promise<Plant[]> {
	const { data, error } = await supabase
		.from('plant')
		.select(`
			id,
			name,
			image_url,
			user_id,
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

export function usePlantsByUserIdQuery(user_id: string) {
	const hook = useQuery([QUERY_KEY, user_id], {
		queryFn: () => getPlantsByUserId(user_id as string),
	});

	return hook;
}

export interface CreatePlantDTO {
	user_id: string;
	name?: string;
	image_url?: string;
	primary?: boolean;
}

export async function createPlant(payload: CreatePlantDTO): Promise<Plant> {
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

export function useCreatePlantMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ payload }: {
			payload: CreatePlantDTO
		}) => createPlant(payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries([QUERY_KEY, user_id])
			},
		}
	)
}

export async function updatePlant(id: number, payload: Partial<Plant>): Promise<Plant> {
	const { data, error } = await supabase
		.from('plant')
		.update(payload)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return data;
}

export function useUpdatePlantMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: number,
			payload: Partial<Plant>,
		}) => updatePlant(id, payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries([QUERY_KEY, user_id])
			},
		}
	)
}
