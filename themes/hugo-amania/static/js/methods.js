function toggleAside2(bool) {
    var e = document.getElementById('aside');
    if (e.className === 'hidden')
      e.className = '';
    else
      e.className = 'hidden';
}