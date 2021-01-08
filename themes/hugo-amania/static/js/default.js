function toggleAside(bool) {
    const e = document.getElementById('aside');
    if (e.classList.contains('hidden') && bool)
        e.classList.remove('hidden');
    else
        e.classList.add('hidden');
}
function toggleSearch(bool) {
    const e = document.getElementById('search');
    let i = document.getElementsByClassName('fa-search')[0];
    if(!i)
        i = document.getElementsByClassName('fa-times')[0];
    if(e.classList.contains('active') && bool){
        e.classList.remove('active');
        i.classList.add('fa-search');
        i.classList.remove('fa-times');
    }
    else{
        e.classList.add('active');
        i.classList.remove('fa-search');
        i.classList.add('fa-times');
    }
}
function scrollToTop() {
    let position = document.body.scrollTop || document.documentElement.scrollTop;
    let scrollAnimation = null;
    
    if(position) {
        window.scrollTo(0,0);
    }
    /*
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        let scrollAnimation = setTimeout("scrollToTop()", 10);
    } else clearTimeout(scrollAnimation);
    */
}
function scrollToBottom() {
    let position = document.body.scrollTop || document.documentElement.scrollTop;
    let scrollAnimation = null;
    
    if(position) {
        window.scrollTo(0,document.body.scrollHeight);
    }
}
function goToUrl(url) {
    window.location.href = url;
}
window.onload = function () {
    document.addEventListener('click', (event) => {
        toggleAside(false);
    });
    document.getElementById('aside').addEventListener('click', (event) => {
        event.stopPropagation();
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
        
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // when scroll changed, progressbar in header active
    document.addEventListener('scroll',(event)=>{
        const scroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressbar = document.querySelector('#topbar.card .progress-bar .progress');
        if(progressbar){
            progressbar.style.width = (scroll/height)*100+'%';
        }
    });
}