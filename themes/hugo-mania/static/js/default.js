function toggleAside(bool) {
    const e = document.getElementById('aside');
    if (e.classList.contains('hidden') && bool)
        e.classList.remove('hidden');
    else
        e.classList.add('hidden');
}
//read json file
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
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
function makeClockWork() {
    const deg = 6;
    const hr = document.querySelector('.clock #hr');
    const mn = document.querySelector('.clock #mn');
    const sc = document.querySelector('.clock #sc');
    setInterval(()=> {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;
        if(hr) hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
        if(mn) mn.style.transform = `rotateZ(${mm}deg)`;
        if(sc) sc.style.transform = `rotateZ(${ss}deg)`;
    },1000)
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
    //clock script
    // makeClockWork();   
    
    
}
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        document.querySelector("#loader").classList.remove('hidden');
    } else { 
        document.querySelector("#loader").classList.add('hidden'); 
    } 
}; 