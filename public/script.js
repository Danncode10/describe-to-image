// Load templates on page load
document.addEventListener('DOMContentLoaded', loadTemplates);

async function loadTemplates() {
  try {
    const response = await fetch('/api/templates');
    const templates = await response.json();
    const templatesList = document.getElementById('templatesList');

    if (templates.length === 0) {
      templatesList.innerHTML = '<p style="color: #999;">No templates available yet.<br>Create HTML files in the templates/ folder.</p>';
      return;
    }

    let html = '<h3 style="margin-bottom: 15px;">Available Templates:</h3>';
    templates.forEach(template => {
      html += `
        <button class="template-btn" onclick="loadTemplate('${template.name}')">
          📄 ${template.name}
        </button>
      `;
    });

    templatesList.innerHTML = html;
  } catch (error) {
    console.error('Error loading templates:', error);
  }
}

async function loadTemplate(templateName) {
  try {
    showStatus('Loading template...', 'loading');
    const response = await fetch(`/api/template/${templateName}`);
    const data = await response.json();
    document.getElementById('htmlInput').value = data.content;
    previewHTML();
    showStatus(`Template "${templateName}" loaded successfully`, 'success');
  } catch (error) {
    showStatus('Error loading template: ' + error.message, 'error');
  }
}

async function previewHTML() {
  const htmlContent = document.getElementById('htmlInput').value;

  if (!htmlContent.trim()) {
    showStatus('Please enter HTML content', 'error');
    return;
  }

  try {
    showStatus('Generating preview...', 'loading');
    const preview = document.getElementById('preview');
    preview.innerHTML = htmlContent;
    showStatus('Preview generated successfully', 'success');
  } catch (error) {
    showStatus('Error generating preview: ' + error.message, 'error');
  }
}

async function downloadImage() {
  const htmlContent = document.getElementById('htmlInput').value;

  if (!htmlContent.trim()) {
    showStatus('Please enter HTML content', 'error');
    return;
  }

  try {
    showStatus('Converting to PNG...', 'loading');

    const response = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'text/html' },
      body: htmlContent
    });

    if (!response.ok) {
      throw new Error('Conversion failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

    showStatus('Image downloaded successfully!', 'success');
  } catch (error) {
    showStatus('Error downloading image: ' + error.message, 'error');
  }
}

function showStatus(message, type) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;

  if (type !== 'loading') {
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 4000);
  }
}
