import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { PointToClaim } from "./point-to-claim";
import { QUERY_KEY as USERS_WITH_POINTS } from './users-with-points';

export const QUERY_KEY = 'USER_POINTS';

export interface Point {
	id: number;
	claimed_at: string;
	point_to_claim: PointToClaim | null;
}

export async function getUserPoints(user_id: string): Promise<Point[]> {
	const { data, error } = await supabase
		.from('point')
		.select(`
			id,
			claimed_at,
			point_to_claim (
				id,
				title,
				type,
				amount
			)
		`)
		.eq('user_id', user_id)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find points for user id: ${user_id}`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id)
		.map((e) => {
			e.point_to_claim = takeFirstRow(e.point_to_claim);

			return e;
		}) as Point[];
}

export function useUserPointsQuery(user_id: string | undefined) {
	const hook = useQuery(QUERY_KEY, {
		queryFn: () => getUserPoints(user_id as string),
		enabled: !!user_id,
	});

	return hook;
}

export async function updateUserPoints(id: string, payload: Partial<Point>): Promise<void> {
	const { error } = await supabase
		.from('points')
		.update(payload)
		.match({
			id,
		});

	if (error) {
		throw error;
	}
}

export function useUpdateUserPointsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<Point>
		}) => updateUserPoints(id, payload),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries(USERS_WITH_POINTS)
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
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_KEY)
				queryClient.invalidateQueries(USERS_WITH_POINTS)
			},
		}
	)
}
