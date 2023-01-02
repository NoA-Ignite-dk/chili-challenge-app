import { supabase } from "@src/lib/supabase";
import { Session, Subscription } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export function useSession() {
	const [session, setSession] = useState<Session | null>(null);
	const [sub, setSub] = useState<Subscription | null>(null);

	useEffect(() => {
		async function loadSession() {
			const { data: { session } } = await supabase.auth.getSession()

			setSession(session);
		}

		loadSession();

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		setSub(subscription);

		return () => {
			if (sub) {
				sub.unsubscribe();
			}
		}
	}, [])

	const value = useMemo(
		() => ({
			session,
		}),
		[session],
	);

	return value;
}
