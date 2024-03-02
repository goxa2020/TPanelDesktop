var modeSwitch = body.querySelector(".toggle-switch");

modeSwitch.addEventListener("click" , () =>{
    store(body.classList.toggle("dark").toString());
});


function store(value){
    localStorage.setItem('darkmode', value);
}


function checkTheme() {

    const darkmode = localStorage.getItem('darkmode');
    if (darkmode === null) {
        store('false');
    } else if (darkmode === 'true' && !body.classList.contains('dark')) {
        body.classList.add("dark");
    } else if (darkmode === 'false' && body.classList.contains('dark')) {
        body.classList.remove("dark");
    }
}

checkTheme()
console.log('ТЕМЫ подгружены');
