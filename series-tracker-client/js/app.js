import * as api from './api.js';
import * as ui from './ui.js';

let currentPage = 1;
let currentSearch = '';
let currentSort = 'created_at';
let currentOrder = 'desc';

async function loadSeries() {
    ui.setLoading(true);
    try {
        const series = await api.fetchSeries({
            page: currentPage,
            limit: 12,
            q: currentSearch,
            sort: currentSort,
            order: currentOrder
        });
        ui.renderCards(series);
    } catch (e) {
        ui.showToast(e.message, 'error');
    } finally {
        ui.setLoading(false);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('form-id').value;
    const data = {
        title: document.getElementById('form-title').value,
        genre: document.getElementById('form-genre').value,
        status: document.getElementById('form-status').value,
        episodes: parseInt(document.getElementById('form-episodes').value) || 0,
        rating: parseFloat(document.getElementById('form-rating').value) || 0,
    };

    try {
        let savedId = id;
        if (id) {
            await api.updateSeries(id, data);
            ui.showToast('Serie actualizada ✅');
        } else {
            const created = await api.createSeries(data);
            savedId = created.id;
            ui.showToast('Serie creada ✅');
        }

        // Subir imagen si se seleccionó una
        const imageFile = document.getElementById('form-image').files[0];
        if (imageFile && savedId) {
            await api.uploadImage(savedId, imageFile);
        }

        ui.closeModal();
        loadSeries();
    } catch (e) {
        ui.showToast(e.message, 'error');
    }
}

async function handleDelete(id) {
    if (!confirm('¿Eliminar esta serie?')) return;
    try {
        await api.deleteSeries(id);
        ui.showToast('Serie eliminada 🗑️');
        loadSeries();
    } catch (e) {
        ui.showToast(e.message, 'error');
    }
}

async function handleEdit(id) {
    try {
        const series = await api.fetchSeriesById(id);
        ui.fillForm(series);
    } catch (e) {
        ui.showToast(e.message, 'error');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSeries();

    document.getElementById('btn-new').addEventListener('click', () => {
        ui.clearForm();
        ui.openModal();
    });

    document.getElementById('btn-close-modal').addEventListener('click', ui.closeModal);
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') ui.closeModal();
    });

    document.getElementById('series-form').addEventListener('submit', handleFormSubmit);

    document.getElementById('series-grid').addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit');
        const deleteBtn = e.target.closest('.btn-delete');
        if (editBtn) handleEdit(editBtn.dataset.id);
        if (deleteBtn) handleDelete(deleteBtn.dataset.id);
    });

    document.getElementById('search-input').addEventListener('input', (e) => {
        currentSearch = e.target.value;
        currentPage = 1;
        loadSeries();
    });

    document.getElementById('sort-select').addEventListener('change', (e) => {
        const [sort, order] = e.target.value.split('-');
        currentSort = sort;
        currentOrder = order;
        loadSeries();
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; loadSeries(); }
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        currentPage++;
        loadSeries();
    });

    document.getElementById('btn-export-csv').addEventListener('click', async () => {
        try {
            const series = await api.fetchSeries({ limit: 1000 });
            api.exportToCSV(series);
            ui.showToast('CSV descargado ✅');
        } catch (e) {
            ui.showToast(e.message, 'error');
        }
    });
});