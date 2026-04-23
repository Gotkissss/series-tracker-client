export function renderCards(series) {
    const grid = document.getElementById('series-grid');
    grid.innerHTML = '';

    if (series.length === 0) {
        grid.innerHTML = `<p class="empty-msg">No hay series todavía. ¡Agrega una!</p>`;
        return;
    }

    series.forEach(s => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = s.id;
        card.innerHTML = `
            <div class="card-img">
                ${s.image_url
                    ? `<img src="${s.image_url}" alt="${s.title}">`
                    : `<div class="card-placeholder"><span>${s.title[0]}</span></div>`
                }
                <div class="card-overlay">
                    <button class="btn-edit" data-id="${s.id}">✏️ Editar</button>
                    <button class="btn-delete" data-id="${s.id}">🗑️ Eliminar</button>
                </div>
            </div>
            <div class="card-info">
                <h3>${s.title}</h3>
                <div class="card-meta">
                    <span class="badge genre">${s.genre || 'Sin género'}</span>
                    <span class="badge status ${s.status === 'Finalizada' ? 'ended' : 'ongoing'}">${s.status || 'Sin estado'}</span>
                </div>
                <div class="card-stats">
                    <span>⭐ ${s.rating || '—'}</span>
                    <span>📺 ${s.episodes || '—'} eps</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

export function fillForm(series) {
    document.getElementById('form-id').value = series.id;
    document.getElementById('form-title').value = series.title;
    document.getElementById('form-genre').value = series.genre;
    document.getElementById('form-status').value = series.status;
    document.getElementById('form-episodes').value = series.episodes;
    document.getElementById('form-rating').value = series.rating;
    document.getElementById('modal-title').textContent = 'Editar Serie';
    openModal();
}

export function clearForm() {
    document.getElementById('series-form').reset();
    document.getElementById('form-id').value = '';
    document.getElementById('modal-title').textContent = 'Nueva Serie';
}

export function openModal() {
    document.getElementById('modal').classList.add('active');
}

export function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

export function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

export function setLoading(loading) {
    document.getElementById('series-grid').style.opacity = loading ? '0.4' : '1';
}