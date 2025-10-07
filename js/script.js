function showSection(id) {
  document.getElementById('main-screen').classList.add('hidden');
  document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMain() {
  document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
  document.getElementById('main-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showImage(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImage");
  img.src = src;
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");
  setTimeout(() => (modal.style.display = "none"), 300);
  modal.style.display = "block";
}

function openPdf(url) {
  window.open(url, '_blank');
}
