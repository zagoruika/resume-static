function saveSystemInfo() {
    const info = {
        os: navigator.platform,
        browser: navigator.userAgent
    };
    localStorage.setItem('systemConfig', JSON.stringify(info));

    const footerInfo = document.getElementById('system-info');
    const savedData = JSON.parse(localStorage.getItem('systemConfig'));
    if (footerInfo && savedData) {
        footerInfo.textContent = `OS: ${savedData.os} | Browser: ${savedData.browser}`;
    }
}

async function fetchComments() {
    const variant = 9;
    const container = document.getElementById('comments-container');

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`);
        const comments = await response.json();

        if (container) {
            container.innerHTML = ''; 

            comments.forEach(comment => {
                const div = document.createElement('div');
                div.className = 'experience-item';

                div.innerHTML = `
                    <span class="date">${comment.email}</span>
                    <h3>${comment.name}</h3>
                    <p>${comment.body}</p>
                `;
                container.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Loading error:", error);
    }
}

function setupModal() {
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('close-modal');

    setTimeout(() => {
        modal.style.display = 'flex';
    }, 60000);

    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function setupTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const updateButtonText = () => {
        const isDark = document.body.classList.contains('dark-mode');
        btn.textContent = isDark ? 'Light mode' : 'Dark mode';
    };

    const hours = new Date().getHours();
    const isNightTime = hours < 7 || hours >= 21;

    if (isNightTime) {
        document.body.classList.add('dark-mode');
    }
    
    updateButtonText();

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateButtonText();
    });
}

window.onload = () => {
    saveSystemInfo();
    fetchComments();
    setupModal();
    setupTheme();
};