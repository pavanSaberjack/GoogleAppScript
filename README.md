### Step 1:
- Create a Google Spreahsheet : My question set needs to have Aptitude and Technical questions, you can create number of sheets using '+' icon. For my case sheets are enough and name them as shown in the image below

![Adding sheets](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2010.22.16%20AM.png)

- Questions should be added in the format , in aptitude and programming sheets

![question list format](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2010.22.26%20AM.png)

- To enable script editor goto **Tools** -> **Script Editor** which will open editor and all the script files will be of extension .gs

![Enable script editor](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2010.15.42%20AM.png)

- Script editor will look like 
![Script editor view](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2010.16.18%20AM.png)

- Now you can start using project, name the project (Question creator) 
Basic testing of app script 

`function myfunction() {
 Logger.log('My start project');
}`

![Selecting test function](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2010.32.28%20AM.png)

After saving : you can select the function as shown above and run. For checking logs you can go to **View** -> **Logs**

- If any authorization required it prompt the user for permission and will handle itself.

### Step 2:

- Now you need to have two files **Code.gs(default file created which you can rename)** and **Index.HTML** which can be added from **New-> HTML** file in Script editor

- Copy paste the code from the [Github](https://github.com/pavanSaberjack/GoogleAppScript)

- Select function **startQuestionPaperSetup** and run the script, if you goto your spreadsheet tab you will see out as shown below.

![HTML prompt output](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2011.06.11%20AM.png)

- Once you provide a Google Doc url which is created in your Gdrive, you should be able to see the output.

### Explanation:
- App Script will present user with custom dialogue using HTML file (Index.html) 

`var htmlOutput = HtmlService.createHtmlOutputFromFile('Index').setWidth(300).setHeight(250);
 SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Question Paper Generator');`

- Once user hits the **submit** button it will call the method **userDidClickSubmit** using script **google.script.run.userDidClickSubmit** with the params you want to receive from the user.

`function userDidClickSubmit(noOfSets, noOfQuestions, url) {
}`

- You can use prompt to get inputs but only limitation with Prompt is that it allows one input box at a time. Check out more details in the [link](https://medium.com/r/?url=https%3A%2F%2Fdevelopers.google.com%2Fapps-script%2Freference%2Fbase%2Fprompt-response) 

### Step3:

- To make the script available in Spreadsheet tab so that user don't have to go to script editor to everytime 
Go to **Tools -> Macros -> Import**

![Check macro tab](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2011.20.00%20AM.png)

- Select the function which will be the entry point to the script and press Add Function

![Selecting macro to run](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2011.20.26%20AM.png)

- Then it will be available in the macros list

![Accessing the macro](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2011.20.37%20AM.png)

- You can create a keyboard shortcut using Manage macros

![Managing macros](https://github.com/pavanSaberjack/GoogleAppScript/blob/master/Screen%20Shot%202019-03-05%20at%2011.23.24%20AM.png)


# Feedbacks are most welcome
