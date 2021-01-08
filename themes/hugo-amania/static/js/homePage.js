document.getElementById('topbar').classList.remove('card')
  window.addEventListener('scroll', (event) => {
    let e = document.getElementById('topbar');
    if (this.scrollY > 450) {
      if (!e.classList.contains('card')) {
        e.classList.add('card');
      }
    }
    else {
      if (e.classList.contains('card')) {
        e.classList.remove('card');
      }
    }
});