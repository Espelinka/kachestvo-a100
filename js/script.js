function showSection(id) {
  // Скрываем главное меню
  document.getElementById('main-screen').classList.add('hidden');

  // Скрываем все разделы
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
  document.getElementById('main-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showImage(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImage");

  img.src = src;             // Устанавливаем нужное изображение
  modal.style.display = "block"; // Показываем модальное окно
  setTimeout(() => modal.classList.add("show"), 10); // Плавно появляется
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show"); // Плавно исчезает
  setTimeout(() => { modal.style.display = "none"; }, 300); // Прячем окно
}

function openPdf(url) {
  window.open(url, '_blank'); // Открываем PDF в новой вкладке
}
