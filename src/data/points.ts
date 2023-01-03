import { supabase } from "@src/lib/supabase";
import { normalizeRows, takeFirstRow } from "@src/utils/normalizeData";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PointToClaim } from "./point-to-claim";
import { QUERY_KEY as USERS_WITH_POINTS } from './users-with-points';

export const QUERY_KEY = 'POINTS';
export const CLAIMED_POINTS_QUERY_KEY = 'CLAIMED_POINTS';
export interface Point {
	id: number;
	claimed_at: string;
	user_id: string;
	post_id: number;
	point_to_claim: PointToClaim | null;
}

export interface ClaimedPoint {
	id: number;
	claimed_point_id: number;
}

export async function getPointsByUserId(user_id: string): Promise<Point[]> {
	const { data, error } = await supabase
		.from('point')
		.select(`
			id,
			claimed_at,
			user_id,
			post_id,
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

export async function getClaimedPoints(): Promise<ClaimedPoint[]> {
	const { data, error } = await supabase
		.from('point')
		.select(`
			id,
			claimed_point_id
		`)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find points`);
	}

	return normalizeRows(data).filter((e) => !!e?.id) as ClaimedPoint[];
}

export function useClaimedPointsQuery() {
	const hook = useQuery([CLAIMED_POINTS_QUERY_KEY], {
		queryFn: () => getClaimedPoints(),
	});

	return hook;
}


export function usePointsByUserIdQuery(user_id: string) {
	const hook = useQuery([QUERY_KEY, user_id], {
		queryFn: () => getPointsByUserId(user_id),
	});

	return hook;
}


export async function updatePoints(id: string, payload: Partial<Point>): Promise<Point> {
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

export function useUpdatePointsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<Point>
		}) => updatePoints(id, payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries(USERS_WITH_POINTS)
				queryClient.invalidateQueries([QUERY_KEY, user_id])
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

export async function createPoint(payload: CreatePointDTO): Promise<Point> {
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

export function useCreatePointsMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ payload }: {
			payload: CreatePointDTO
		}) => createPoint(payload),
		{
			onSuccess: ({ user_id }) => {
				queryClient.invalidateQueries(USERS_WITH_POINTS)
				queryClient.invalidateQueries([QUERY_KEY, user_id])
			},
		}
	)
}
