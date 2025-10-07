function showSection(id) {
  // Скрываем главное меню
  const mainScreen = document.getElementById('main-screen');
  mainScreen.classList.add('hidden');

  // Скрываем все другие разделы
  document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));

  // Показываем нужный раздел
  const section = document.getElementById(id);
  section.classList.remove('hidden');

  // Прокручиваем страницу вверх
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMain() {
  // Скрываем все разделы
  document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));

  // Показываем главное меню
  const mainScreen = document.getElementById('main-screen');
  mainScreen.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showImage(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImage");

  img.src = src;
  modal.style.display = "block";
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");
  setTimeout(() => { modal.style.display = "none"; }, 300);
}

function openPdf(url) {
  // Открывает PDF в новой вкладке браузера
  const newWindow = window.open();
  newWindow.document.write(`
    <html>
      <head>
        <title>Документ</title>
        <style>
          body, html { margin: 0; height: 100%; background: #333; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe src="${url}" allow="fullscreen"></iframe>
      </body>
    </html>
  `);
}

