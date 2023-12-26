// Data
const text = `function getMotivation(){\nstartCoding();\ngetAwesome();\n}\nif(feelings == "lowMood")\ngetMotivation();`

// Text colors
const colorList = {
  dark:  ['#117dd4', '#ffffff', '#ffff00', '#ffffff', ' #8812c7' ,'#ffffff','#ffffff',  '#8812c7' , '#ffffff', '#ffff00' ,'#117dd4', '#ffff00', '#ffffff', '#ffffff',' #ffa500',  '#ffff00',  '#ffffff', '#ffff00', '#ffffff'],
  light: ['#117dd4', '#983105', '#117dd4', '#983105', ' #008514' ,'#983105','#983105',  '#008514' , '#983105', '#117dd4' ,'#117dd4', '#117dd4', '#983105', '#983105',' #ffa500',  '#117dd4',  '#983105', '#117dd4', '#983105'],
  wordLength: [8, 13, 3, 11, 2, 1, 10, 2, 1, 1, 2, 1, 8, 2, 9, 1, 13, 2, 1]
}

            // output:
            // function getMotivation(){
            //    startCoding();
            //    getAwesome();
            //   }
            //   if(feelings == "lowMood")
            //    getMotivation();

// Set text color
function setTxtClr(){
  let i = 0;
  let c = colorList.wordLength[0];
  document.querySelectorAll('#output span').forEach((el,indx) => {
  if(indx === c){
    i++;
    c += colorList.wordLength[i];
  }
  el.style.color = isDark? colorList.dark[i] : colorList.light[i];
});
}

// Function to display text letter by letter  
function typeText(element, text, speed) {
  var lines = text.split('\n');
  let lineIndex = 0,
      wordIndex = 0,
      letterIndex = 0; 

  async function type() {
    // Get the current line
    let currentLine = lines[lineIndex];

    // Get the current text content
    let currentText = element.innerHTML;

    // Split the line into words
    let words = currentLine.split(/\s+/);

    // Get the current segment
    let curWord = words[wordIndex];

    var letterEl = '<span>' + curWord[letterIndex] + '</span>';
    // Add the letter to the text content
    element.innerHTML = currentText + letterEl;

    setTxtClr();

    // Move to the next letter
    letterIndex++;
    
    // Check if there are more letters in the current word
    if (letterIndex < curWord.length) {
      // Call the function recursively after a delay
      setTimeout(type, speed);
    } else {
      // Move to the next word
      letterIndex = 0;
      wordIndex ++;
      
      // Check if there are more words in the current line
      if (wordIndex < words.length) {
        // Add a space between segments
        element.innerHTML += ' ';
        // Call the function recursively after a delay
        setTimeout(type, speed);
      } else {
        // Move to the next line
        lineIndex++;
        wordIndex = 0;

        // Check if there are more lines to type
        if (lineIndex < lines.length) {
          // Add a line break
          element.innerHTML += '<br>';
          // Call the function recursively after a delay
          setTimeout(type, speed);
        }
        else{ // Type the text recursively after a 2s-delay 
          setTimeout(function(){
            motivationEl.innerHTML = '';
            typeText(motivationEl, text, 50);
          },2000);
        }
      }
    }
  }

  // Start typing
  type();
}

// Get the target element
const motivationEl = document.getElementById('output');

///////////////////////////  Dark/Light mode ///////////////////////////////////
let isDark = false;
// Get the mode selector element
const themeSelector = document.getElementById("theme-selector");
// Add eventlistener to handle the change in options
themeSelector.addEventListener('change', () => {
 if(!isMatchMediaSupp){
    alert('matchMedia is not supported in this browser');
 }
 else if(themeSelector.value === 'system'){
  getSystemTheme();
 }
 else{   // option = 'dark' or option = 'light'
  setTheme(themeSelector.value);    
 }
});

// Get all the elements
const allElements = document.querySelectorAll('*');

// Function setTheme accepts a string and  toggles the dark class 
// for all the elements according to the parameter
function setTheme(theme){
  allElements.forEach(el => el.classList.toggle('dark', theme === 'dark'));
    isDark = theme === 'dark'
}

// Check if the browser supports matchMedia
const isMatchMediaSupp = window.matchMedia;

function getSystemTheme(){
  if (isMatchMediaSupp) {
    // Create a media query object
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Define a callback function to be executed when the media query matches
    const themeHandler = (event) => {
        if (themeSelector.value === "system"){
            const newTheme = event.matches? 'dark' : 'light';
            setTheme(newTheme);
        }
    };
    // Add the listener to the media query object
    darkMediaQuery.addEventListener('change', themeHandler);

    // Initial check for the current state
    themeHandler(darkMediaQuery);
    } else {
    // Alert for browsers that do not support matchMedia
    alert('matchMedia is not supported in this browser');
    }
}

// Default dark/light mode to system
themeSelector.value = "system";
getSystemTheme();

// Call the function to display text letter by letter
typeText(motivationEl, text, 50);
