let currentFile = null;
let currentFolder = null;

document.addEventListener('DOMContentLoaded', loadHome);

async function loadHome() {
  try {
    const res = await fetch('/home');
    const data = await res.json();

    renderGrid('templates-grid', data.templates, 'template');
    renderGrid('generated-grid', data.generated, 'generated');

    const total = data.templates.length + data.generated.length;
    document.getElementById('total-count').textContent = `${total} file${total !== 1 ? 's' : ''}`;
  } catch (err) {
    console.error('Failed to load:', err);
  }
}

function renderGrid(gridId, items, type) {
  const grid = document.getElementById(gridId);

  if (!items || items.length === 0) {
    grid.innerHTML = `<div class="empty-state">No ${type === 'generated' ? 'generated files yet' : 'templates found'}</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="folder-card" onclick="openFile('${item.folder}', '${item.file}', '${item.name}')">
      <div class="folder-icon">${type === 'generated' ? '&#9670;' : '&#9723;'}</div>
      <div>
        <div class="folder-name">${item.name}</div>
        <div class="folder-tag">.html</div>
      </div>
    </div>
  `).join('');
}

function openFile(folder, file, name) {
  currentFile = file;
  currentFolder = folder;

  document.getElementById('detail-title').textContent = name;
  document.getElementById('status-bar').textContent = '';
  document.getElementById('status-bar').className = 'status-bar';

  const frame = document.getElementById('preview-frame');
  frame.style.height = '600px';
  frame.onload = function () {
    try {
      const h = frame.contentWindow.document.documentElement.scrollHeight;
      frame.style.height = h + 'px';
    } catch (e) {
      frame.style.height = '1400px';
    }
  };
  frame.src = `/${folder}/${file}`;

  document.getElementById('list-view').style.display = 'none';
  document.getElementById('detail-view').style.display = 'flex';
}

function showList() {
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('list-view').style.display = 'block';
  loadHome();
}

async function downloadPng() {
  const btn = document.getElementById('download-btn');
  const status = document.getElementById('status-bar');

  btn.disabled = true;
  btn.textContent = 'Converting';
  btn.classList.add('loading');
  status.textContent = 'Rendering via Puppeteer...';
  status.className = 'status-bar';

  try {
    const res = await fetch(`/convert/${currentFolder}/${currentFile}`);
    if (!res.ok) throw new Error('Conversion failed');

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.replace('.html', '.png');
    a.click();
    URL.revokeObjectURL(url);

    status.textContent = 'Downloaded successfully.';
    status.className = 'status-bar success';
  } catch (err) {
    status.textContent = 'Export failed: ' + err.message;
    status.className = 'status-bar error';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Download PNG';
    btn.classList.remove('loading');
  }
}
