// filepath: /c:/Users/HeitorFelix/repos/portfolio-projetos/assets/js/theme-toggle.js
document.getElementById('theme-toggle').addEventListener('click', function() {
    var themeLink = document.getElementById('theme-link');
    if (themeLink.getAttribute('href') === 'assets/css/main.css') {
      themeLink.setAttribute('href', 'assets/css/dark.css');
    } else {
      themeLink.setAttribute('href', 'assets/css/main.css');
    }
  });