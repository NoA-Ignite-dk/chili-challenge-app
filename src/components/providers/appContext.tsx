import { supabase } from '@src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { ReactNode, useState, useMemo, useEffect } from 'react';

type AppContextType = {
	session: Session | null;
	email: string;
	setEmail: Function;
};

const AppContext = React.createContext<AppContextType>({
	session: null,
	email: '',
	setEmail: () => {},
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
	const [session, setSession] = useState<Session | null>(null);

	const allUserData = {
		email,
	};

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

	const value = useMemo(
		() => ({
			session,
			email,
			setEmail,
			allUserData,
		}),
		[session, email, allUserData],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
