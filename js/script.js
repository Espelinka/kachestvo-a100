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
  // Создаём новую вкладку
  const newTab = window.open("", "_blank");

  // Если браузер заблокировал всплывающее окно
  if (!newTab) {
    alert("Разрешите всплывающие окна, чтобы открыть документ");
    return;
  }

  // Вставляем HTML прямо в новую вкладку
  newTab.document.write(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Просмотр документа</title>
      <style>
        html, body {
          height: 100%;
          margin: 0;
          background: #2e5939;
          color: white;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
        }
        header {
          padding: 10px;
          background: #1b3a26;
          text-align: center;
          font-size: 1.1em;
        }
        iframe {
          flex: 1;
          width: 100%;
          border: none;
          background: #444;
        }
      </style>
    </head>
    <body>
      <header>Просмотр PDF-документа</header>
      <iframe src="${url}" allowfullscreen></iframe>
    </body>
    </html>
  `);
}



