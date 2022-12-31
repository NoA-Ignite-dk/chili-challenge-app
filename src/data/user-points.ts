import { supabase } from "@src/lib/supabase";
import { takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getPointsByUserId, Point, QUERY_KEY as POINTS_QUERY_KEY } from "./points";
import { QUERY_KEY as USERS_WITH_POINTS } from './users-with-points';

export const QUERY_KEY = 'USER_POINTS';

export function useUserPointsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getPointsByUserId(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}

export async function updateUserPoints(id: string, payload: Partial<Point>): Promise<Point> {
	const { data, error } = await supabase
		.from('point')
		.update(payload)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return data;
}

export function useUpdateUserPointsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<Point>
		}) => updateUserPoints(id, payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries(USERS_WITH_POINTS)
				queryClient.invalidateQueries([POINTS_QUERY_KEY, user_id])
			},
		}
	)
}

export interface CreatePointDTO {
	claimed_at?: string;
	claimed_point_id: number;
	user_id: string;
	post_id: number;
}

export async function createUserPoint(payload: CreatePointDTO): Promise<Point> {
	const { data, error } = await supabase
		.from('point')
		.insert(payload)
		.select()
		.single();

	if (error) {
		throw error;
	}

	return takeFirstRow(data);
}

export function useCreateUserPointsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ payload }: {
			payload: CreatePointDTO
		}) => createUserPoint(payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries(USERS_WITH_POINTS)
				queryClient.invalidateQueries([POINTS_QUERY_KEY, user_id])
			},
		}
	)
}
