import { supabase } from "@src/lib/supabase";
import { normalizeRows } from "@src/utils/normalizeData";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const QUERY_KEY = 'POINTS_TO_CLAIM';

export interface PointToClaim {
	id: number;
	title: string;
	type: 'height' | 'flower',
	amount: number;
}

export async function getPointToClaim(): Promise<PointToClaim[]> {
	const { data, error } = await supabase
		.from('point_to_claim')
		.select(`
			id,
			title,
			type,
			amount
		`)
		.order('id', { ascending: true });

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error(`Unable to find PointToClaim`);
	}

	return normalizeRows(data)
		.filter((e) => !!e?.id);
}

export function usePointToClaimQuery() {
	return useQuery(QUERY_KEY, () => getPointToClaim());
}

export async function updatePointToClaim(id: string, payload: Partial<PointToClaim>): Promise<void> {
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

export function usePointToClaimMutation() {
	const queryClient = useQueryClient()

	return useMutation(
		({ id, payload }: {
			id: string,
			payload: Partial<PointToClaim>
		}) => updatePointToClaim(id, payload),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_KEY)
			},
		}
	)
}
