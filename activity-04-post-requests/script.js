// ============================================================================
// POST Requests Discovery Challenge - Organized by TODO 1-5
// ============================================================================

const API_BASE = 'https://jsonplaceholder.typicode.com';

// State to track existing data for duplicate checks
const usedUsernames = new Set(['bret', 'antonette', 'samantha', 'karianne', 'kamren']);
const usedWebsites = new Set(['hildegard.org', 'anastasia.net', 'ramiro.info', 'kale.biz', 'ola.org']);

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeForms();
    logMessage('Application initialized - Ready for CRUD operations!', 'info');
});

function initializeTabs() {
    console.log("📂 Initializing tabs...");
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            console.log(`🎯 Switching to tab: ${targetTab}`);

            const targetContent = document.getElementById(targetTab);
            if (!targetContent) {
                console.error(`❌ Error: Tab content with ID "${targetTab}" not found.`);
                return;
            }

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            targetContent.classList.add('active');

            // Specialized logic for wizard tab
            if (targetTab === 'wizard') {
                formWizard.updateUI();
            }
        });
    });
}

function initializeForms() {
    console.log("🛠 Initializing forms...");
    const forms = {
        'postForm': handleCreatePost,
        'userForm': handleCreateUser,
        'commentForm': handleCreateComment,
        'updateForm': handleUpdatePost
    };

    for (const [id, handler] of Object.entries(forms)) {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', handler);
        } else {
            console.warn(`⚠️ Warning: Form with ID "${id}" not found.`);
        }
    }
}

// ----------------------------------------------------------------------------
// TODO 1, 2, & 3: POST CREATION WORKFLOW
// This function contains the logic for creating data, validating it, and handling errors.
// ----------------------------------------------------------------------------

async function handleCreatePost(event) {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);

    const postData = {
        title: document.getElementById('postTitle').value,
        body: document.getElementById('postBody').value,
        userId: parseInt(document.getElementById('postUserId').value)
    };

    // --- TODO 2: Form Data Validation ---
    // Validate inputs before sending to the server
    if (!postData.title.trim() || postData.title.trim().length < 3) {
        logMessage('❌ TODO 2 Error: Title must be at least 3 characters', 'error');
        setLoadingState(button, false);
        return;
    }
    if (!postData.body.trim() || postData.body.trim().length < 10) {
        logMessage('❌ TODO 2 Error: Body must be at least 10 characters', 'error');
        setLoadingState(button, false);
        return;
    }
    if (isNaN(postData.userId) || postData.userId < 1) {
        logMessage('❌ TODO 2 Error: User ID must be a valid positive number', 'error');
        setLoadingState(button, false);
        return;
    }

    // (Integration step for TODO 4)
    const fileInput = document.getElementById('postAttachment');
    if (fileInput?.files[0]) {
        try {
            postData.attachment = await handleFileUpload(fileInput.files[0]);
        } catch (error) {
            logMessage(`❌ File upload error: ${error.message}`, 'error');
            setLoadingState(button, false);
            return;
        }
    }

    try {
        logMessage(`🚀 Starting TODO 1: Creating post "${postData.title}"`, 'request');

        // --- TODO 1: Implement Basic POST Request ---
        // Sending data TO the API using fetch()
        const response = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

        const result = await response.json();
        logMessage(`✅ TODO 1 Success: Post created (ID: ${result.id})`, 'response');
        displayResult('POST', '/posts', result, 'Post created successfully!');
        event.target.reset();

    } catch (error) {
        // --- TODO 3: Enhanced Error Response Handling ---
        // Provide user-friendly feedback based on HTTP status codes
        let userMessage = error.message;
        if (error.message.includes('HTTP')) {
            const statusCode = parseInt(error.message.match(/\d+/)?.[0]);
            const statusMessages = {
                400: 'Invalid data format. Check your input.',
                401: 'Authentication required.',
                403: 'You don\'t have permission to create posts.',
                404: 'API endpoint not found.',
                500: 'Server error. Try again later.'
            };
            userMessage = statusMessages[statusCode] || error.message;
        }
        logMessage(`❌ TODO 3 Error: ${userMessage}`, 'error');
        displayResult('POST', '/posts', { error: userMessage }, 'Failed to create post');
    } finally {
        setLoadingState(button, false);
    }
}

// ----------------------------------------------------------------------------
// TODO 4: FILE UPLOAD SIMULATION
// Logic for processing files as Base64 strings for the API
// ----------------------------------------------------------------------------

async function handleFileUpload(file) {
    // Validation for TODO 4
    if (file.size > 1024 * 1024) throw new Error('File too large (Max 1MB)');

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) throw new Error('Invalid file type (JPG, PNG, GIF, WEBP only)');

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            logMessage(`📄 TODO 4: File "${file.name}" processed`, 'info');
            resolve(reader.result);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

// ----------------------------------------------------------------------------
// TODO 5: MULTI-STEP FORM WORKFLOW (WIZARD)
// A state-managed 3-step process for creating posts
// ----------------------------------------------------------------------------

const formWizard = {
    currentStep: 1,
    totalSteps: 3,
    formData: { title: '', userId: 1, body: '' },

    nextStep() {
        if (this.validateStep(this.currentStep)) {
            this.saveStepData(this.currentStep);
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();
            }
        }
    },

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    },

    saveStepData(step) {
        if (step === 1) {
            this.formData.title = document.getElementById('wizardTitle').value;
            this.formData.userId = parseInt(document.getElementById('wizardUserId').value);
        } else if (step === 2) {
            this.formData.body = document.getElementById('wizardBody').value;
        }
    },

    validateStep(step) {
        if (step === 1) {
            const title = document.getElementById('wizardTitle').value.trim();
            if (title.length < 3) {
                logMessage('⚠️ TODO 5 (Step 1): Title too short', 'error');
                return false;
            }
            return true;
        }
        if (step === 2) {
            const body = document.getElementById('wizardBody').value.trim();
            if (body.length < 10) {
                logMessage('⚠️ TODO 5 (Step 2): Body too short', 'error');
                return false;
            }
            return true;
        }
        return true;
    },

    updateUI() {
        document.querySelectorAll('.form-step').forEach(s => s.classList.add('hidden'));
        document.getElementById(`step${this.currentStep}`).classList.remove('hidden');

        document.getElementById('wizardProgress').style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
        const labels = ['Basic Info', 'Content', 'Review & Submit'];
        document.getElementById('stepIndicator').textContent = `Step ${this.currentStep} of 3: ${labels[this.currentStep - 1]}`;

        if (this.currentStep === 3) {
            document.getElementById('previewTitle').textContent = this.formData.title;
            document.getElementById('previewBody').textContent = this.formData.body;
            document.getElementById('previewUser').textContent = `Author: User ${this.formData.userId}`;
        }

        document.getElementById('prevBtn').style.display = this.currentStep === 1 ? 'none' : 'inline-block';
        document.getElementById('nextBtn').style.display = this.currentStep === this.totalSteps ? 'none' : 'inline-block';
        document.getElementById('submitBtn').style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
    },

    async submit() {
        const button = document.getElementById('submitBtn');
        setLoadingState(button, true);
        try {
            logMessage(`🚀 TODO 5: Wizard submitting post`, 'request');
            const res = await fetch(`${API_BASE}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formData)
            });
            const result = await res.json();
            logMessage(`✅ TODO 5 Success: Wizard Post Created (ID: ${result.id})`, 'response');
            displayResult('POST', '/posts (Wizard)', result, 'Wizard post created!');

            alert('Wizard Post Created!');
            this.currentStep = 1;
            this.formData = { title: '', userId: 1, body: '' };
            document.getElementById('wizardTitle').value = '';
            document.getElementById('wizardBody').value = '';
            this.updateUI();
        } catch (e) {
            logMessage(`❌ Wizard Error: ${e.message}`, 'error');
        } finally {
            setLoadingState(button, false);
        }
    }
};

window.formWizard = formWizard;

// ----------------------------------------------------------------------------
// OTHER CRUD OPERATIONS (Manage Data)
// ----------------------------------------------------------------------------

async function handleUpdatePost(event) {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    const postId = document.getElementById('updateId').value;
    setLoadingState(button, true);

    const updateData = {
        id: parseInt(postId),
        title: document.getElementById('updateTitle').value,
        body: document.getElementById('updateBody').value,
        userId: 1
    };

    try {
        logMessage(`✏️ Updating post ${postId}`, 'request');
        const res = await fetch(`${API_BASE}/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        const result = await res.json();
        logMessage(`✅ Post ${postId} updated`, 'response');
        displayResult('PUT', `/posts/${postId}`, result, 'Post updated!');
    } catch (e) {
        logMessage(`❌ Update failed: ${e.message}`, 'error');
    } finally {
        setLoadingState(button, false);
    }
}

async function deletePost() {
    const postId = document.getElementById('deleteId').value;
    if (!confirm(`Are you sure you want to delete post ${postId}?`)) return;

    const button = document.querySelector('#manage .btn-danger');
    setLoadingState(button, true);

    try {
        logMessage(`�️ Deleting post ${postId}`, 'request');
        const res = await fetch(`${API_BASE}/posts/${postId}`, { method: 'DELETE' });
        logMessage(`✅ Post ${postId} deleted successfully`, 'response');
        displayResult('DELETE', `/posts/${postId}`, { deleted: true, id: postId }, 'Post deleted!');
    } catch (e) {
        logMessage(`❌ Delete failed: ${e.message}`, 'error');
    } finally {
        setLoadingState(button, false);
    }
}

async function loadPostForUpdate() {
    const postId = document.getElementById('updateId').value;
    try {
        logMessage(`📖 Loading post ${postId}`, 'request');
        const res = await fetch(`${API_BASE}/posts/${postId}`);
        if (!res.ok) throw new Error('Post not found');
        const post = await res.json();
        document.getElementById('updateTitle').value = post.title;
        document.getElementById('updateBody').value = post.body;
        logMessage(`✅ Post ${postId} loaded`, 'response');
    } catch (e) {
        alert(e.message);
    }
}

// Additional Helpers (Users/Comments)
async function handleCreateUser(event) {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);

    const userData = {
        name: document.getElementById('userName').value,
        username: document.getElementById('userUsername').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value || '',
        website: document.getElementById('userWebsite').value || ''
    };

    // --- Duplicate Checks ---
    if (usedUsernames.has(userData.username.toLowerCase())) {
        logMessage(`❌ Error: username "${userData.username}" has been used`, 'error');
        setLoadingState(button, false);
        return;
    }

    if (userData.website && usedWebsites.has(userData.website.toLowerCase())) {
        logMessage(`❌ Error: website "${userData.website}" has been used`, 'error');
        setLoadingState(button, false);
        return;
    }

    try {
        logMessage(`👤 Creating user: "${userData.username}"`, 'request');
        const res = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const result = await res.json();

        // --- Sync dropdowns with the new user ---
        updateUserDropdowns(result);

        logMessage(`✅ User created successfully (ID: ${result.id})`, 'response');
        displayResult('POST', '/users', result, 'User created successfully!');
        event.target.reset();
    } catch (e) {
        logMessage(`❌ Error creating user: ${e.message}`, 'error');
    } finally {
        setLoadingState(button, false);
    }
}

// Helper to add newly created users to the various dropdowns across the app
function updateUserDropdowns(user) {
    const dropdownIds = ['postUserId', 'wizardUserId'];

    // Update tracking sets
    if (user.username) usedUsernames.add(user.username.toLowerCase());
    if (user.website) usedWebsites.add(user.website.toLowerCase());

    dropdownIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const option = document.createElement('option');
            option.value = user.id;
            // Use username as the primary identification label
            option.textContent = user.username || user.name || `User${user.id}`;
            select.appendChild(option);

            // Auto-select the newly created user for convenience
            select.value = user.id;
        }
    });

    logMessage(`♻️ Sync: Added "${user.username || 'New User'}" to selection lists`, 'info');
}

async function handleCreateComment(event) {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    setLoadingState(button, true);
    try {
        const res = await fetch(`${API_BASE}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: 1, body: document.getElementById('commentBody').value })
        });
        const result = await res.json();
        displayResult('POST', '/comments', result, 'Comment added!');
        event.target.reset();
    } catch (e) { logMessage(e.message, 'error'); }
    finally { setLoadingState(button, false); }
}

// ----------------------------------------------------------------------------
// UNIVERSAL UI HELPERS
// ----------------------------------------------------------------------------

function setLoadingState(button, loading) {
    if (!button) return;
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    if (loading) {
        if (text) text.style.display = 'none';
        if (loader) loader.style.display = 'inline';
        button.disabled = true;
    } else {
        if (text) text.style.display = 'inline';
        if (loader) loader.style.display = 'none';
        button.disabled = false;
    }
}

function logMessage(msg, type) {
    const log = document.getElementById('networkLog');
    if (!log) {
        console.log(`[LOG] ${msg}`);
        return;
    }
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;

    const placeholder = log.querySelector('.placeholder');
    if (placeholder) log.innerHTML = '';

    log.insertBefore(entry, log.firstChild);
}

function displayResult(method, endpoint, data, msg) {
    const resDiv = document.getElementById('results');
    if (!resDiv) {
        console.log(`[RESULT] ${method} ${msg}`, data);
        return;
    }
    const item = document.createElement('div');
    item.className = `result-item ${data.error ? 'error' : ''}`;
    item.innerHTML = `<strong>${method} ${msg}</strong><div class="result-data">${JSON.stringify(data, null, 2)}</div>`;

    const placeholder = resDiv.querySelector('.placeholder');
    if (placeholder) resDiv.innerHTML = '';

    resDiv.insertBefore(item, resDiv.firstChild);
}

function clearResults() {
    document.getElementById('results').innerHTML = '<p class="placeholder">Results cleared.</p>';
    document.getElementById('networkLog').innerHTML = '<p class="placeholder">Log cleared.</p>';
}

function fillExample(type) {
    const title = document.getElementById('postTitle');
    const body = document.getElementById('postBody');
    if (type === 'pokemon') { title.value = 'Picachu Battle'; body.value = 'An epic battle of speed and lightning!'; }
    else if (type === 'recipe') { title.value = 'Chocolate Cookies'; body.value = 'Perfectly crispy and soft cookies recipe.'; }
    else { title.value = 'Tokyo Trip'; body.value = 'Sunrise at the Skytree was magical.'; }
}