#! /usr/bin/env node

// include the DOM parser
var jsdom = require('jsdom');
// include the syllable counting helper
var syllable = require('syllable');
// include the CLI colorizer
var clc = require('cli-color');
// get the CLI arguments
var args = process.argv.slice(2);
// get the first (URL) argument
var URLorFile = args[0];

jsdom.env(
  URLorFile,
  function (err, window) {

    // declare vars
    var allSentences = [];
    var allWords = [];
    var allSyllables = 0;
    var longWords = [];
    var longSentences = [];

    // get an array of all paragraphs in the resource
    var paragraphs = [].slice
                       .call(window.document.querySelectorAll('p'))

    // iterate over the paragraphs array
    paragraphs.forEach(function(paragraph) {

      // dividing the text content into sentences
      var sentences = paragraph.textContent
                               .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
                               .split('|');

      // iterate over the sentences array
      sentences.forEach(function(sentence) {

        // add each sentence to the master sentences array
        allSentences.push(sentence);

        // divide the sentence into a words array
        var words = sentence.replace(/([,:;.?!—])/g, " ")
                            .split(' ');

        if (words.length > 30) {

          longSentences.push(sentence);

        }

        // interate over the words
        words.forEach(function(word) {

          // add each word to the master words array
          allWords.push(word);

          // count the syllables of the word
          allSyllables += syllable(word);

          // if there's more than three syllables...
          if (syllable(word) > 4) {

            // add the word to the long words array
            longWords.push(word);

          }

        });

      });

    });

    // get the average sentence length
    var ASL = allWords.length / allSentences.length;
    // get the average number of syllables per word
    var ASW = allSyllables / allWords.length;
    // use the Flesch Reading Ease formula to get the score
    var score = 206.835 - (1.015 * ASL) - (84.6 * ASW);

    // Declare notes var
    var notes;

    // choose note from en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests
    switch(score) {
      case score > 90:
        notes = 'Very easy to read. Easily understood by an average 11-year-old student.';
        break;
      case score > 80:
        notes = 'Easy to read. Conversational English for consumers.';
        break;
      case score > 70:
        notes = 'Fairly easy to read.';
        break;
      case score > 60:
        notes = 'Plain English. Easily understood by 13 to 15-year-old students.';
        break;
      case score > 50:
        notes = 'Fairly difficult to read.';
        break;
      case score > 30:
        notes = 'Difficult to read.';
        break;
      default:
        notes = 'Very difficult to read. Best understood by university graduates.';
        break;
    }

    // output results
    console.log(' ');
    console.log(clc.yellowBright('✎✎✎✎✎✎✎✎✎✎ Readability ✎✎✎✎✎✎✎✎✎✎'));

    if (isNaN(score)) {

      console.log(' ');
      console.log(clc.redBright('Error: The content could not be tested. Check the file or URL you supplied.'));
      console.log(' ');

    } else {

      console.log(' ');

      console.log(clc.blueBright('Flesch Reading Ease:'), clc.whiteBright(Math.round(score)+'/100'));

      console.log(' ');

      console.log(clc.blueBright('Notes:'), clc.whiteBright(notes));

      console.log(' ');

      if (longWords.length) {

        console.log(clc.blueBright('Long words:'), clc.whiteBright(longWords.join(', ')));

      }

      console.log(' ');

      // if there are any long sentences
      if (longSentences.length) {

        console.log(clc.blueBright('Long sentences:'));

        longSentences.forEach(function(longSentence) {

          // print each long sentence on a new line
          console.log(clc.whiteBright(longSentence));

          console.log(' ');

        });
      }
    }

    console.log(clc.yellowBright('✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎✎'));

    console.log(' ');

  }
);
