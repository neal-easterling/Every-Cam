window.onload = ()=>{

  const menuBtn = document.getElementById('main-menu-btn');
  const menu = document.getElementById('main-menu');

  menuBtn.addEventListener('click', ()=>{
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });

}