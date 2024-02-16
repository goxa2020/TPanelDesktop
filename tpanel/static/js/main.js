const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch");

toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})
modeSwitch.addEventListener("click" , () =>{
    store(body.classList.toggle("dark").toString());
});

function store(value){
    localStorage.setItem('darkmode', value);
}

function load(){
      const darkmode = localStorage.getItem('darkmode');

      if(darkmode === null) {
            store('false');
      } else if(darkmode === 'true' && !body.classList.contains('dark')) {
            body.classList.add("dark");
      } else if(darkmode === 'false' && body.classList.contains('dark')) {
            body.classList.remove("dark");
      }
}


load();
