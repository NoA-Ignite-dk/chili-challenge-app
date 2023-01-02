import { Session } from '@supabase/supabase-js';
import React, { ReactNode, useMemo } from 'react';

type AppContextType = {
	session: Session;
};

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export function useAppContext() {
	return React.useContext(AppContext);
}

type AppProviderProps = {
	session: Session;
	children: ReactNode;
};

export function AppProvider({ session, children }: AppProviderProps) {
	const value = useMemo(
		() => ({
			session,
		}),
		[session],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
