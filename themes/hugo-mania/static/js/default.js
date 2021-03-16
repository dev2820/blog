function toggleAside(bool) {
    const e = document.querySelector('aside#left-aside');
    if (e.classList.contains('show') && bool)
        e.classList.remove('show');
    else
        e.classList.add('show');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
function goToUrl(url) {
    window.location.href = url;
}
window.onload = function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
        
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        document.querySelector("#loader").classList.remove('hidden');
    } else { 
        document.querySelector("#loader").classList.add('hidden'); 
    } 
}; 