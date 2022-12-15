export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			plant: {
				Row: {
					id: number;
					created_at: string | null;
					name: string | null;
					image_url: string | null;
					primary: boolean | null;
					user_id: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					name?: string | null;
					image_url?: string | null;
					primary?: boolean | null;
					user_id?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					name?: string | null;
					image_url?: string | null;
					primary?: boolean | null;
					user_id?: string | null;
				};
			};
			point: {
				Row: {
					id: number;
					claimed_at: string | null;
					claimed_point_id: number | null;
					user_id: string | null;
					post_id: number | null;
				};
				Insert: {
					id?: number;
					claimed_at?: string | null;
					claimed_point_id?: number | null;
					user_id?: string | null;
					post_id?: number | null;
				};
				Update: {
					id?: number;
					claimed_at?: string | null;
					claimed_point_id?: number | null;
					user_id?: string | null;
					post_id?: number | null;
				};
			};
			point_to_claim: {
				Row: {
					id: number;
					title: string | null;
					type: string | null;
					amount: number | null;
				};
				Insert: {
					id?: number;
					title?: string | null;
					type?: string | null;
					amount?: number | null;
				};
				Update: {
					id?: number;
					title?: string | null;
					type?: string | null;
					amount?: number | null;
				};
			};
			post: {
				Row: {
					id: number;
					created_at: string | null;
					title: string | null;
					description: string | null;
					image_url: string | null;
					user_id: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					title?: string | null;
					description?: string | null;
					image_url?: string | null;
					user_id?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					title?: string | null;
					description?: string | null;
					image_url?: string | null;
					user_id?: string | null;
				};
			};
			profiles: {
				Row: {
					id: string;
					updated_at: string | null;
					username: string | null;
					full_name: string | null;
					avatar_url: string | null;
					email: string | null;
				};
				Insert: {
					id: string;
					updated_at?: string | null;
					username?: string | null;
					full_name?: string | null;
					avatar_url?: string | null;
					email?: string | null;
				};
				Update: {
					id?: string;
					updated_at?: string | null;
					username?: string | null;
					full_name?: string | null;
					avatar_url?: string | null;
					email?: string | null;
				};
			};
			useful_information: {
				Row: {
					id: number;
					updated_at: string | null;
					content_key: string | null;
					title: string | null;
					text: string | null;
					image_url: string | null;
				};
				Insert: {
					id?: number;
					updated_at?: string | null;
					content_key?: string | null;
					title?: string | null;
					text?: string | null;
					image_url?: string | null;
				};
				Update: {
					id?: number;
					updated_at?: string | null;
					content_key?: string | null;
					title?: string | null;
					text?: string | null;
					image_url?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			install_available_extensions_and_test: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
		};
		Enums: {
			[_ in never]: never;
		};
	};
}

export interface PointToClaim {
	id: number;
	title: string | null;
	type: string | null;
	amount: number | null;
}
