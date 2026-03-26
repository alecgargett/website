function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark-theme' || savedTheme === 'white-theme' || savedTheme === 'yellow-theme')
{       document.body.className = savedTheme; }
    else
{       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.className = prefersDark ? 'dark-theme' : 'white-theme'; }
}

function toggleTheme() {
    let newTheme;
    if (document.body.className === 'yellow-theme')
{       newTheme = 'white-theme'; }
    else if (document.body.className === 'white-theme')
{       newTheme = 'dark-theme'; } 
    else
{       newTheme = 'yellow-theme'; }
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
}

function setIntroSmile(smileOn) {
  const introBox = document.querySelector('.intro-content-box');
  if (!introBox) return;
  if (smileOn)
{   introBox.classList.add('smile'); } 
    else
{   introBox.classList.remove('smile'); }
}