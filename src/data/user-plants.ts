import { supabase } from "@src/lib/supabase";
import { takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getPlantsByUserId, QUERY_KEY as PLANTS_QUERY_KEY } from "./plants";

export const QUERY_KEY = 'USER_PLANTS';

export interface Plant {
	id: number;
	name: string;
	image_url: string;
	user_id: string;
	primary: boolean;
}

export function useUserPlantsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getPlantsByUserId(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}

export async function updateUserPlant(id: number, payload: Partial<Plant>): Promise<Plant> {
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

export function useUpdateUserPlantMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: number,
			payload: Partial<Plant>,
		}) => updateUserPlant(id, payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries([PLANTS_QUERY_KEY, user_id])
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
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries([PLANTS_QUERY_KEY, user_id])
			},
		}
	)
}
