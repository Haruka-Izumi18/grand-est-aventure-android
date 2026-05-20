import { authClient } from "@/lib/auth-client";

const BASE_URL = 'https://baladindices.fr';

// Type de retour uniforme pour toutes les requêtes :
// - data : la réponse parsée (ou null si vide / erreur de parsing)
// - status : le code HTTP (200, 401, 404, etc.)
type ApiResult<T = any> = { data: T | null; status: number };

// Récupère le token de l'utilisateur connecté via authClient
// Compatible avec plusieurs libs d'auth (Better Auth, Auth0, Clerk...)
async function getToken(): Promise<string | null> {
    try {
        const auth: any = authClient;
        const result = await (auth.getSession ?? auth.getAccessToken ?? auth.getToken)?.();
        if (!result) return null;
        return typeof result === "string"
            ? result
            : result.accessToken ?? result.token ?? null;
    } catch {
        return null;
    }
}

// Wrapper générique autour de fetch()
// T permet de typer la donnée retournée selon l'endpoint appelé
async function api<T = any>(
    endpoint: string,
    method = 'GET',
    body?: any,
): Promise<ApiResult<T>> {

    // Construction de l'URL — le replace évite les doubles slashes accidentels
    const url = `${BASE_URL}/${endpoint}`.replace(/([^:]\/\/)\/+/, '$1');

    const token = await getToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const resp = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    // 204 = No Content → pas de body à lire
    let data: any = null;
    if (resp.status !== 204) {
        try { data = await resp.json(); } catch { /* body non-JSON, on garde null */ }
    }

    return { data, status: resp.status };
}

// Récupère la liste des aventures
export async function getAdventures(): Promise<ApiResult> {
    return api('api/game/adventures');
}

export { api };
export default { api, getAdventures };