/**
 * Shared Content Loader
 * Loads shared HTML components and handles language-specific text
 */

(function() {
  // Detect current language based on page filename or html lang attribute
  function detectLanguage() {
    const path = window.location.pathname;
    if (path.includes('indexEN') || path.includes('index-en')) {
      return 'en';
    }
    // Check html lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang.startsWith('en')) {
      return 'en';
    }
    return 'pt';
  }

  // Apply language-specific text to elements with data-pt and data-en attributes
  function applyLanguage(container, lang) {
    const elements = container.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-pt');
      if (text) {
        el.textContent = text;
      }
    });
  }

  // Load shared content into a placeholder element
  async function loadSharedContent(placeholderId, sharedFile) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
      console.warn(`Placeholder #${placeholderId} not found`);
      return;
    }

    try {
      const response = await fetch(sharedFile);
      if (!response.ok) {
        throw new Error(`Failed to load ${sharedFile}: ${response.status}`);
      }
      const html = await response.text();
      placeholder.innerHTML = html;

      // Apply language-specific text
      const lang = detectLanguage();
      applyLanguage(placeholder, lang);

      // Re-initialize carousel if we just loaded certifications
      if (placeholderId === 'certifications-placeholder' && typeof initCarousel === 'function') {
        initCarousel();
      }

      // Dispatch event for any other scripts that need to know content was loaded
      placeholder.dispatchEvent(new CustomEvent('sharedContentLoaded', {
        bubbles: true,
        detail: { file: sharedFile, lang: lang }
      }));

    } catch (error) {
      console.error(`Error loading shared content: ${error.message}`);
    }
  }

  // Auto-load shared content when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Load skills
    const skillsPlaceholder = document.getElementById('skills-placeholder');
    if (skillsPlaceholder) {
      loadSharedContent('skills-placeholder', 'shared/skills.html');
    }

    // Load certifications
    const certPlaceholder = document.getElementById('certifications-placeholder');
    if (certPlaceholder) {
      loadSharedContent('certifications-placeholder', 'shared/certifications.html');
    }

    // Load contact
    const contactPlaceholder = document.getElementById('contact-placeholder');
    if (contactPlaceholder) {
      loadSharedContent('contact-placeholder', 'shared/contact.html');
    }
  });

  // Expose function globally for manual use if needed
  window.loadSharedContent = loadSharedContent;
})();
