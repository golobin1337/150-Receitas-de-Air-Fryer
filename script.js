// top bar: always show today's date (dd/mm/yyyy)
(function () {
  var el = document.getElementById('promoDate');
  if (!el) return;
  var d = new Date();
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  el.textContent = dd + '/' + mm + '/' + d.getFullYear();
})();

// simple carousel arrow nav
document.querySelectorAll('.carousel-nav').forEach(function (nav) {
  var car = nav.nextElementSibling;
  var btns = nav.querySelectorAll('button');
  btns[0].addEventListener('click', function () {
    car.scrollBy({ left: -car.clientWidth * 0.6, behavior: 'smooth' });
  });
  btns[1].addEventListener('click', function () {
    car.scrollBy({ left: car.clientWidth * 0.6, behavior: 'smooth' });
  });
});

// ---- Carousels: zoom hint + "arraste para ver mais" + lightbox ----
var lightbox = document.getElementById('lightbox');
var lbStage = document.getElementById('lbStage');
var lbClose = document.getElementById('lbClose');

function openLightbox(el) {
  var clone = el.cloneNode(true);
  // drop the "toque para ampliar" badge inside the enlarged copy
  clone.querySelectorAll('.zoom-hint').forEach(function (h) { h.remove(); });
  clone.classList.remove('zoomable');
  lbStage.innerHTML = '';
  lbStage.appendChild(clone);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  lbStage.innerHTML = '';
  document.body.style.overflow = '';
}

if (lightbox) {
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    // tap anywhere outside the enlarged image closes it
    if (!lbStage.contains(e.target)) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

// make every image inside the two carousels zoomable, add hint + drag cue
document.querySelectorAll('.preview-item .placeholder, .result-item .placeholder').forEach(function (img) {
  img.classList.add('zoomable');
  if (!img.querySelector('.zoom-hint')) {
    var hint = document.createElement('span');
    hint.className = 'zoom-hint';
    hint.textContent = '🔍 Toque para ampliar';
    img.appendChild(hint);
  }
  img.addEventListener('click', function () { openLightbox(img); });
});

// add "ARRASTE PARA VER MAIS" under each carousel that has zoomable items
document.querySelectorAll('.carousel').forEach(function (car) {
  if (!car.querySelector('.zoomable')) return;
  if (car.nextElementSibling && car.nextElementSibling.classList.contains('drag-hint')) return;
  var hint = document.createElement('div');
  hint.className = 'drag-hint';
  hint.innerHTML = 'Arraste para ver mais <span class="arrow">›</span>';
  car.parentNode.insertBefore(hint, car.nextSibling);
});
