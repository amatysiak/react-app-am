# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## List of changes and improvements
Adding tests\
Displaying an error for the user - the case when the API connection doesn't work\
Adding the possibility of using the autocompleter with the keyboard (e.g. selecting an item on the list with arrows)\
Improvement of the mobile version\
No results - adding styles\
Checking if the screen area is sufficient to display the list with suggested emails - e.g. on some screens it may be necessary to display the list above the field\
Adding translations\
Adding Redux to an existing project

## UI/UX Suggestions / To discuss

The currently selected item is not displayed on the list of suggested items - maybe a better solution would be to gray out this item on the list?\
Currently, there is no limit to the added e-mails - maybe it is worth limiting their number?\
Not using the "tab" button to select the entered item (it should be used only to switch between elements on the page)\
Maybe it is worth highlighting fragments of items on the list that have the same text as the text entered in the input?\
Should the list of suggested emails be hidden after clicking outside of its area?