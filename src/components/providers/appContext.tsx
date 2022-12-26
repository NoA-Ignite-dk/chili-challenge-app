import { supabase } from '@src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { ReactNode, useState, useMemo, useEffect } from 'react';

type AppContextType = {
	session: Session | null;
	email: string;
	fullName: string;
	loadProfile: Function;
};

const AppContext = React.createContext<AppContextType>({
	session: null,
	email: '',
	fullName: '',
	loadProfile: () => { },
});

export function useAppContext() {
	return React.useContext(AppContext);
}

type AppProviderProps = {
	children: ReactNode;
};

export function AppProvider(props: AppProviderProps) {
	const { children } = props;
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);

			if (session?.user) {
				if (session.user.email) {
					setEmail(session.user.email)
				}
			}
		});
	}, [])

	useEffect(() => {
		if (session) {
			loadProfile();
		}
	}, [session])

	async function loadProfile() {
		// console.log('profile', session);
		if (!session?.user?.id) {
			return;
		}

		const { data, error } = await supabase
			.from('profiles')
			.select(`
				fullName: full_name
			`)
			.eq('id', session.user.id)
			.limit(1)
			.single();

		if (error) {
			throw error;
		}

		if (data) {
			setFullName(data.fullName);
		}
	}

	const value = useMemo(
		() => ({
			session,
			email,
			fullName,
			loadProfile,
		}),
		[session, fullName, email],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
