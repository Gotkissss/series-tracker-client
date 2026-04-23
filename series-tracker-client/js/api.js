const API_URL = 'https://series-tracker-backend-rymf.onrender.com';

export async function fetchSeries(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/series${query ? '?' + query : ''}`);
    if (!res.ok) throw new Error('Error obteniendo series');
    return res.json();
}

export async function fetchSeriesById(id) {
    const res = await fetch(`${API_URL}/series/${id}`);
    if (!res.ok) throw new Error('Serie no encontrada');
    return res.json();
}

export async function createSeries(data) {
    const res = await fetch(`${API_URL}/series`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error creando serie');
    return json;
}

export async function updateSeries(id, data) {
    const res = await fetch(`${API_URL}/series/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error actualizando serie');
    return json;
}

export async function deleteSeries(id) {
    const res = await fetch(`${API_URL}/series/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error eliminando serie');
}

export async function uploadImage(id, file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_URL}/series/${id}/image`, {
        method: 'POST',
        body: formData
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error subiendo imagen');
    return json;
}

export function exportToCSV(series) {
    const headers = ['ID', 'Título', 'Género', 'Estado', 'Episodios', 'Rating'];
    const rows = series.map(s => [
        s.id, s.title, s.genre, s.status, s.episodes, s.rating
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'series.csv';
    a.click();
    URL.revokeObjectURL(url);
}