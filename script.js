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
