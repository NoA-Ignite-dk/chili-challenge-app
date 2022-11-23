import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_API_KEY } from '@env';
import 'react-native-url-polyfill/auto';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_API_KEY;

// eslint-disable-next-line import/prefer-default-export
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		storage: AsyncStorage as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
