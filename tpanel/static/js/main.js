const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");
toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})
searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

const body1 = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');

//to save the dark mode use the object "local storage".

//function that stores the value true if the dark mode is activated or false if it's not.
function store(value){
  localStorage.setItem('darkmode', value);
}

//function that indicates if the "darkmode" property exists. It loads the page as we had left it.
function load(){
  const darkmode = localStorage.getItem('darkmode');
modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
});
  //if the dark mode was never activated
  if(!darkmode){
    store(false);
  } else if( darkmode == 'true'){ //if the dark mode is activated
    body1.classList.toggle('dark');
  } else if(darkmode == 'false'){ 
    body1.classList.toggle('dark');//if the dark mode exists but is disabled
  }
}


load();
