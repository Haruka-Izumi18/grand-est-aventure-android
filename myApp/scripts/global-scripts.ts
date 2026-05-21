function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${min}min` : `${min}min`;
}

function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(2)} km`;
}

export { formatDuration, formatDistance };