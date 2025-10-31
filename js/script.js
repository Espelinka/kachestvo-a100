/* ================================
   JavaScript for A-100 Development Quality Department
   Version 1.02 - Comprehensive Modernization
   ================================ */

// Set your password here
const SITE_PASSWORD = "a100quality";

// Utility functions
const DOMReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

// Password protection
function initPasswordProtection() {
  const passwordScreen = document.getElementById('password-screen');
  const passwordInput = document.getElementById('password-input');
  const submitButton = document.getElementById('submit-password');
  const errorMessage = document.getElementById('password-error');
  
  // Check if user already entered password
  if (localStorage.getItem('siteAccessGranted') === 'true') {
    passwordScreen.classList.add('hidden');
    return;
  }
  
  // Handle password submission
  submitButton.addEventListener('click', () => {
    checkPassword(passwordInput.value, errorMessage, passwordScreen);
  });
  
  // Handle Enter key press
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPassword(passwordInput.value, errorMessage, passwordScreen);
    }
  });
}

function checkPassword(inputPassword, errorMessageElement, passwordScreenElement) {
  if (inputPassword === SITE_PASSWORD) {
    // Grant access
    localStorage.setItem('siteAccessGranted', 'true');
    passwordScreenElement.classList.add('hidden');
    errorMessageElement.classList.add('hidden');
  } else {
    // Show error
    errorMessageElement.classList.remove('hidden');
    // Clear input
    document.getElementById('password-input').value = '';
  }
}

// Loading overlay control
function showLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
  }
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

// PDF Viewer Modal
function initPdfViewer() {
  const modal = document.getElementById('pdf-modal');
  const closeBtn = document.querySelector('.close');
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfDownloadLink = document.getElementById('pdf-download-link');
  
  // Close modal when clicking on X
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    pdfViewer.data = '';
  });
  
  // Close modal when clicking outside content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
      pdfViewer.data = '';
    }
  });
  
  // Handle Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      pdfViewer.data = '';
    }
  });
}

// Check if browser supports PDF embedding
function isPdfEmbeddingSupported() {
  // Most modern browsers support PDF embedding
  // This is a simple check - more sophisticated checks could be implemented
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Known problematic browsers for PDF embedding
  const isOldIOS = /iPad|iPhone|iPod/.test(userAgent) && parseFloat(userAgent.split('OS ')[1]?.split(' ')[0]?.replace('_', '.')) < 12;
  const isOldAndroid = /Android/.test(userAgent) && parseFloat(userAgent.split('Android ')[1]?.split(';')[0]) < 5;
  
  // For most modern browsers, we'll assume support
  return !(isOldIOS || isOldAndroid);
}

// Enhanced PDF opening function with better mobile support
function openPdf(url) {
  try {
    if (!url) {
      throw new Error('PDF URL is required');
    }
    
    // Show loading indicator
    showLoading();
    
    // Get filename for title
    const fileName = url.split('/').pop().replace('.pdf', '').replace(/-/g, ' ');
    
    // For mobile devices or browsers that don't support embedding, open in new tab
    if (!isPdfEmbeddingSupported() || isMobileDevice()) {
      hideLoading();
      // Open PDF in new tab/window - this works better on mobile
      const newWindow = window.open(url, '_blank');
      
      if (!newWindow) {
        // Popup blocked, offer direct download
        alert('Пожалуйста, разрешите всплывающие окна или нажмите "Скачать PDF"');
        window.location.href = url;
      }
      return;
    }
    
    // Set PDF in viewer for desktop browsers
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfTitle = document.getElementById('pdf-title');
    const pdfDownloadLink = document.getElementById('pdf-download-link');
    const modal = document.getElementById('pdf-modal');
    
    pdfViewer.data = url;
    pdfTitle.textContent = `Просмотр документа: ${fileName}`;
    pdfDownloadLink.href = url;
    
    // Hide loading after a short delay to allow PDF to load
    setTimeout(() => {
      hideLoading();
      modal.classList.remove('hidden');
    }, 800);
    
  } catch (error) {
    hideLoading();
    console.error('Error opening PDF:', error);
    alert('Ошибка при открытии PDF: ' + error.message);
  }
}

// Detect mobile devices
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Section navigation
function showSection(id, pushState = true) {
  try {
    const mainScreen = document.getElementById('main-screen');
    const section = document.getElementById(id);
    
    if (!section) {
      console.error(`Section with id "${id}" not found`);
      return;
    }
    
    // Hide main screen and all sections
    if (mainScreen) mainScreen.classList.add('hidden');
    document.querySelectorAll('.section').forEach(s => {
      s.classList.add('hidden');
      s.setAttribute('aria-hidden', 'true');
    });
    
    // Show selected section
    section.classList.remove('hidden');
    section.setAttribute('aria-hidden', 'false');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser history
    if (pushState && history.pushState) {
      history.pushState({ page: id }, '', '#' + id);
    }
    
    // Set focus to section heading for accessibility
    const heading = section.querySelector('h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }
  } catch (error) {
    console.error('Error showing section:', error);
  }
}

function showMain(pushState = true) {
  try {
    const mainScreen = document.getElementById('main-screen');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => {
      s.classList.add('hidden');
      s.setAttribute('aria-hidden', 'true');
    });
    
    // Show main screen
    if (mainScreen) {
      mainScreen.classList.remove('hidden');
      mainScreen.setAttribute('aria-hidden', 'false');
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser history
    if (pushState && history.pushState) {
      history.pushState({ page: 'main' }, '', '#main');
    }
  } catch (error) {
    console.error('Error showing main screen:', error);
  }
}

// Browser history navigation
window.addEventListener('popstate', (e) => {
  const state = e.state;
  if (state && state.page) {
    if (state.page === 'main') {
      showMain(false);
    } else {
      showSection(state.page, false);
    }
  } else {
    showMain(false);
  }
});

// Initialize on page load
DOMReady(() => {
  try {
    // Initialize password protection
    initPasswordProtection();
    
    // Initialize PDF viewer
    initPdfViewer();
    
    // Set initial history state
    if (history.replaceState) {
      history.replaceState({ page: 'main' }, '', '#main');
    }
    
    // Check URL hash and navigate if present
    const hash = location.hash.replace('#', '');
    if (hash && hash !== 'main' && document.getElementById(hash)) {
      showSection(hash, false);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // ESC key returns to main screen (only if not in PDF modal)
      if (e.key === 'Escape') {
        const mainScreen = document.getElementById('main-screen');
        const modal = document.getElementById('pdf-modal');
        if (mainScreen && mainScreen.classList.contains('hidden') && 
            modal && modal.classList.contains('hidden')) {
          showMain();
        }
      }
    });
    
    console.log('Сайт успешно загружен ✅');
  } catch (error) {
    console.error('Initialization error:', error);
  }
});