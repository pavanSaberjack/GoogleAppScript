// Global variables

var numberOfSets = 1; // Default set to 1
var maxNumberOfQuestions = 15; // Default set to 15

var startRow = 2; // First row of data to process
var startCol = 1;
var numRows = 15; // Number of rows to process
var numCols = 6; 
var docUrl = null;
var aptitideSpreadSheetName = 'aptitude';
var programmingSpreadSheetName = 'programming';

var fontFamily = 'Calibri';
var fontSize = 10;

var Question = function(question, A, B, C, D, Ans){
  this.question = question;
  this.A = A;
  this.B = B;
  this.C = C;
  this.D = D;
  this.answer = Ans;
};

function startQuestionPaperSetup() {  
  Logger.log('Helloooo');
  // Display a modal dialog box with custom HtmlService content.
  var htmlOutput = HtmlService
    .createHtmlOutputFromFile('Index')
    .setWidth(300)
    .setHeight(250);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Question Paper Generator');
}

function userDidClickSubmit(noOfSets, noOfQuestions, url) {
  Logger.log(noOfSets);
  Logger.log(noOfQuestions);
  Logger.log(url);
  
  if (noOfSets == null) {
    numberOfSets = 1
  } else {
    // Conventing it to int value 
    numberOfSets = +noOfSets;  
  }
  
  if (noOfQuestions == null) {
    maxNumberOfQuestions = 15
  } else {
    // Conventing it to int value 
    maxNumberOfQuestions = +noOfQuestions;  
  }
  
  if (url == null || url == "") {
    var ui = SpreadsheetApp.getUi();
    var button = ui.alert('Invalid Doc URL. Please try again', ui.ButtonSet.OK)
    
    if (button == ui.Button.OK) {
      startQuestionPaperSetup();
    }
    return;
  }  
  docUrl = url;
    
  // This will close the window
  var output = HtmlService
      .createHtmlOutput('<h4> Processing your request...</h4>')
      .setWidth(100)
      .setHeight(50);
  SpreadsheetApp.getUi().showModalDialog(output, 'It will take few secs...');
  
  continueCreationProcess();
}

function continueCreationProcess() {
  // Get random questions array
  var aptitudeQuestions = parseData(aptitideSpreadSheetName);
  var programmingQuestons = parseData(programmingSpreadSheetName)
  
  // Generate sets
  createSets(aptitudeQuestions, programmingQuestons);
}

function parseData(spreadSheetName) {
  // Get the sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(spreadSheetName);
  
  // Fetch the range of cells 
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCols);
  
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  
  var questionsArray = new Array();
  
  // Generate random numbers for Questions
  var randomArray = randomNumberArray(1, numRows);
    
  // Loop till the end of the data fetched from sheet  
  for (var counter = 0; counter < data.length; counter++) {
    
    if (questionsArray.length == maxNumberOfQuestions) {
      Logger.log('Hereeeeee');
      break;
    }

    var num = randomArray[counter];    
    var row = data[num-1];
    
    // Check for valid row
    if (!row) {
      Logger.log('Row Not found ' + counter);
      continue;
    } 
    
    // Question
    var question = row[0];
    
    // Check for valid question
    if (!question) {
      Logger.log('question Not found ' + counter);
      continue;
    }
    
    // Options
    var optionA = row[1];
    var optionB = row[2];
    var optionC = row[3];
    var optionD = row[4];
    var ans = row[5];
    
    var obj = new Question(question, optionA, optionB, optionC, optionD, ans);
    questionsArray.push(obj);
  }

  
  Logger.log('questionsArray length : ' + questionsArray.length);
  return questionsArray;
}

function createSets(aptitudeQuestions, programmingQuestions) {
  // Create a new Google Doc from the URL'
  var doc = DocumentApp.openByUrl(docUrl);
  
  // clears the body
  doc.getBody().clear();
  
  var docBody = doc.getBody();
  for (var counter = 0; counter < numberOfSets; counter++) {
  
     docBody.appendParagraph('Set : ' + getSetName(counter));
     generateSet(aptitudeQuestions, programmingQuestions, docBody);
     
     // Add a page break to start next set
     docBody.appendPageBreak();
  }
  
  // Custom settings for the doc
  var text = docBody.editAsText();
  text.setFontFamily(fontFamily);
  text.setFontSize(fontSize);
  
  var ui = SpreadsheetApp.getUi();
  var message = 'Your paper set is ready at location: ' + docUrl;
  var button = ui.alert(message, ui.ButtonSet.OK)
}

function generateSet(aptitudeQuestions, programmingQuestions, docBody) {
  
  // Header
  docBody.appendParagraph('Aptitude');
  
  // Aptitude questions
  addQuestionsToTheDocBody(aptitudeQuestions, docBody);
  
  // Add a page break to start next set
  docBody.appendPageBreak();
  
  // Header
  docBody.appendParagraph('Technical');
  
  // Programming questions
  addQuestionsToTheDocBody(programmingQuestions, docBody);
  
  // Add a page break to start next set
  docBody.appendPageBreak();
  
  // Add the table
  addAnswerTable(aptitudeQuestions, programmingQuestions, docBody);
}

// Adds questions to the doc body
function addQuestionsToTheDocBody(questionsArray, docBody) {
  var questionNumber = 1;
  
  var randomArray = randomNumberArray(1, questionsArray.length);
   
  for (var counter = 0; counter < questionsArray.length; counter++) {   
    
    var obj = questionsArray[randomArray[counter]-1];

    if (obj) {
      // Access the body of the document, then add a paragraph.
      var questionString = questionNumber + ') ' + obj.question
      docBody.appendParagraph(questionString);
      
      var padding = '                    ';
      var optionsString = 'A) ' + obj.A; 
      optionsString = optionsString + padding + 'B) ' + obj.B; 
      optionsString = optionsString + padding + 'C) ' + obj.C;
      optionsString = optionsString + padding + 'D) ' + obj.D;
      docBody.appendParagraph(optionsString);
      
      docBody.appendParagraph(' ');
      questionNumber = questionNumber + 1;
    }

  }
}

// Adds a table at the end of the document
function addAnswerTable(aptitudeQuestions, programmingQuestions, body) {
  //Add a table in document
  var table = body.appendTable();
  
  //Create 16 rows and 4 columns
  for(var i=0; i<(maxNumberOfQuestions+1); i++){
    var tr = table.appendTableRow();
    
    //add 4 cells in each row
    for(var j=0; j<4; j++) {
    
      var cellText = '';
      if (i == 0) { /// Header row
          if (j%2 == 0) {
            cellText = 'SI No.';
          } else if (j == 1) {
            cellText = 'Aptitude';
          } else {
            cellText = 'Programming';
          }
      } else {
          if (j%2 == 0) {
            cellText = i;
          } else if (j == 1) {
            var aptitudeQuestion = aptitudeQuestions[i-1];
            cellText = aptitudeQuestion.answer;
          } else {
            var programmingQuestion = programmingQuestions[i-1];
            cellText = programmingQuestion.answer;
          }
      }
      
      var td = tr.appendTableCell(cellText);
    }
  }  
}


// Helper functions 
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumberArray(min, max) {
  var randomArray = new Array();
  
  for (var counter = 0; counter < max; counter++) {
      var num = getRandomInt(min, max);
      var index = randomArray.indexOf(num);
      
      // Generate until the index is not found
      while (index !== -1) {
        num = getRandomInt(min, max);
        index = randomArray.indexOf(num);
      }      
      randomArray.push(num);
  }
  
  return randomArray;
}

function getUserInput(title, message) {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(title, message, ui.ButtonSet.OK_CANCEL);
  
  if (response.getSelectedButton() == ui.Button.OK) {
    // TODO: Validate the url
    var userResponse = response.getResponseText();
    Logger.log('%s', userResponse);
    return userResponse;
  } 
    
  Logger.log('The user closed the dialog.');
  ui.alert('OOPS! process cancelled ');
  return null;
}

function getSetName(index) {
  return String.fromCharCode(65+index);
}
