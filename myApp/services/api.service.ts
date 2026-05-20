import { authClient } from "@/lib/auth-client";

const BASE_URL = 'https://baladindices.fr';

type ApiResult<T = any> = { data: T | null; status: number };

async function api<T = any>(endpoint: string, method = 'GET', body?: any, extraHeaders?: Record<string, string>): Promise<ApiResult<T>> {
    const url = `${BASE_URL}/${endpoint}`.replace(/([^:]\/\/)\/+/, '$1');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(extraHeaders || {}),
    };
    // Try to include an access token if `authClient` exposes a getter.
    try {
        const anyAuth: any = authClient;

        if (typeof anyAuth.getSession === "function") {
            const session = await anyAuth.getSession();
            const token = session?.accessToken ?? session?.token ?? null;
            if (token) headers["Authorization"] = `Bearer ${token}`;
        } else if (typeof anyAuth.getAccessToken === "function") {
            const t = await anyAuth.getAccessToken();
            const token = typeof t === "string" ? t : t?.token ?? t?.accessToken ?? null;
            if (token) headers["Authorization"] = `Bearer ${token}`;
        } else if (typeof anyAuth.getToken === "function") {
            const t = await anyAuth.getToken();
            const token = typeof t === "string" ? t : t?.token ?? t?.accessToken ?? null;
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }
    } catch {
        // ignore if auth client doesn't expose a getter here
    }
    const resp = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    let data: any = null;
    if (resp.status !== 204) {
        try {
            data = await resp.json();
        } catch {
            data = null;
        }
    }
    return { data, status: resp.status };
}
export async function getAdventures(): Promise<ApiResult> {
    return api('api/game/adventures');
}
export { api };

export default { api, getAdventures };
