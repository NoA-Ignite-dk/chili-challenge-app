import { supabase } from '@src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { ReactNode, useState, useMemo, useEffect } from 'react';

type AppContextType = {
	session: Session | null;
};

const AppContext = React.createContext<AppContextType>({
	session: null,
});

export function useAppContext() {
	return React.useContext(AppContext);
}

type AppProviderProps = {
	children: ReactNode;
};

export function AppProvider(props: AppProviderProps) {
	const { children } = props;
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
	}, [])

	const value = useMemo(
		() => ({
			session,
		}),
		[session],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
