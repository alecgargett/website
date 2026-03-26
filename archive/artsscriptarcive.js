function applySavedTheme() {
  const theme = localStorage.getItem('theme');
  const body = document.body
  const background_div = document.getElementById('background-div');
  const background_color_div = document.getElementById('background-color-div');
  const background_image_div = document.getElementById('background-image-div');

  if (theme === 'blueblackmode')
  { body.className = 'blueblackgradient darktheme';
    background_div.className = 'blueblackgradient';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'bluemode')
  { body.className = 'bluebackground darktheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'yellowmode')
  { body.className = 'bluebackground'
    body.className = 'yellowbackground lighttheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'lightmode')
  { body.className = 'yellowgradient lighttheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'lightyellowmode')
  { body.className = 'lightyellowbackground lighttheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'adelaideoval')
  { body.className = 'adelaideoval lighttheme';
    body.className = 'adelaideoval whitetheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'whitemode')
  { body.className = 'yellowbackground';
    body.className = 'whitebackground whitetheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else if (theme === 'alienmode')
  { body.className = 'alientheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = ''; }
  else
  { body.className = 'halfdarkstart darktheme';
    background_div.className = '';
    background_color_div.className = '';
    background_image_div.className = '';
    setTimeout(() => { body.className = 'halfdark darktheme'; }, 0); }
}

function applyTransitionToSavedTheme() {
  let theme = localStorage.getItem('theme');

  if (!theme) {
    theme = 'halfdark'; // Update the local variable
    localStorage.setItem('theme', theme);
  }

  if (theme === 'lightmode' || theme === 'whitemode')
  { document.getElementById('background-color-div').className = 'bluebackground'
    document.body.className = 'yellowbackground lighttheme';
    document.getElementById('background-color-div').className = ''
    setTimeout(() => { applySavedTheme(); }, 2000); }
  else if (theme === 'adelaideoval')
  { document.getElementById('background-color-div').className = 'bluebackground'
    document.body.className = 'yellowbackground lighttheme';
    document.getElementById('background-color-div').className = ''
    setTimeout(() => { document.body.className = 'yellowgradient lighttheme'; }, 2000);
    setTimeout(() => { applySavedTheme(); }, 3000); }
  else { applySavedTheme() }
}

function increaseBrightnessOnClick() {
const currentTheme = localStorage.getItem('theme');
let nextTheme = 'halfdark';

if (currentTheme === 'halfdark')
{ nextTheme = 'blueblackmode'; }
else if (currentTheme === 'blueblackmode')
{ nextTheme = 'bluemode'; }
else if (currentTheme === 'bluemode')
{ nextTheme = 'yellowmode'; }
else if (currentTheme === 'yellowmode')
{ nextTheme = 'lightmode'; }
else if (currentTheme === 'lightmode')
{ nextTheme = 'whitemode'; }
else if (currentTheme === 'lightyellowmode')
{ nextTheme = 'whitemode'; }
else if (currentTheme === 'whitemode')
{ nextTheme = 'alienmode'; }
else
{ nextTheme = 'halfdark'; }

localStorage.setItem('theme', nextTheme);
applySavedTheme();
}