// Data
const text = `function getMotivation_(){\nstartCoding_()_;\ngetAwesome_()_;\n}\nif_(_feelings  ==  "lowMood"_)\ngetMotivation_()_;`
const colorList= ['#117dd4', '#ffffff', '#ffff00', '#ffffff', ' #8812c7' ,'#ffffff','#ffffff',  '#8812c7' , '#ffffff', '#ffff00' ,'#117dd4', '#ffff00', '#ffffff', '#ffffff',' #ffa500',  '#ffff00',  '#ffffff', '#ffff00', '#ffffff'];

  // output:
  // function getMotivation(){
  //    startCoding();
  //    getAwesome();
  //   }
  //   if(feelings == "lowMood")
  //    getMotivation();

// Function to display text letter by letter  
function typeTextWithColors(element, text, speed) {
  var lines = text.split('\n');
  let lineIndex = 0,
      segmentIndex = 0,
      wordIndex = 0,
      segmentLetterIndex = 0,
      wordLetterIndex = 0,
      colorIndex = 0;

  function type() {
    // Get the current line
    let currentLine = lines[lineIndex];

    // Get the current text content
    let currentText = element.innerHTML;

    // Split the line into segments
    let segments = currentLine.split(/\s+/);

    // Get the current segment
    let currentSegment = segments[segmentIndex];

    let words = currentSegment.split(/\_+/); 

    let curWord = words[wordIndex];

    let sColor = colorList[colorIndex];

    // Move to the next letter
    segmentLetterIndex++;
    
    if(wordLetterIndex < curWord.length){
       var coloredLetter = '<span style="color: ' + sColor + ';">' + curWord[wordLetterIndex] + '</span>';
      // Add the colored letter to the text content
      element.innerHTML = currentText + coloredLetter;
      wordLetterIndex++;
    }
    else{
      wordIndex++;
      colorIndex++;
      wordLetterIndex = 0;
    }      
  
    // Check if there are more letters in the current word
    if (segmentLetterIndex < currentSegment.length) {
      // Call the function recursively after a delay
      setTimeout(type, speed);
    } else {
      // Move to the next word
      segmentIndex++;
      colorIndex++;
      segmentLetterIndex = 0;
      wordLetterIndex = 0;
      wordIndex = 0;
      
      // Check if there are more segments in the current line
      if (segmentIndex < segments.length) {
        // Add a space between segments
        element.innerHTML += ' ';
        // Call the function recursively after a delay
        setTimeout(type, speed);
      } else {
        // Move to the next line
        lineIndex++;
        segmentIndex = 0;

        // Check if there are more lines to type
        if (lineIndex < lines.length) {
          // Add a line break
          element.innerHTML += '<br>';
          // Call the function recursively after a delay
          setTimeout(type, speed);
        }
      }
    }
  }

  // Start typing
  type();
}

// Get the target element
const motivationEl = document.getElementById('output');

// Call the function to display text letter by letter
typeTextWithColors(motivationEl, text, 50);


///////////////////////////  Dark/Light mode ///////////////////////////////////
// Get the mode selector element
const themeSelector = document.getElementById("theme-selector");
// Add eventlistener to handle the change in options
themeSelector.addEventListener('change', () => {
 if(!isMatchMediaSupp){
    alert('matchMedia is not supported in this browser');
 }
 else{
    if(themeSelector.value === 'system'){
        getSystemTheme();
      }
      else{ // option = 'dark' or option = 'light'
        setTheme(themeSelector.value)    
      }
 }
});

// Get the html element
const htmlEl = document.querySelector('html');

// Function setTheme accepts a string and  toggles the dark class 
// for the html element according to the parameter
function setTheme(theme){
    htmlEl.classList.toggle('dark', theme === 'dark')
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

// Default to system
themeSelector.value = "system";
getSystemTheme();
