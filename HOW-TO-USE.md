# How to use `multi-step-form` Application

## Home page [User lands on this page when he/she starts the application]

A clickable card with an image and some dummy text appears. Click on that card to view the signup form.

## Signup page

The user journey of filling the form is fulfilled in this page with the help of multiple components. Fill all the text fields, upload/capture the user's picture and add his/her signature to submit the form successfully.

### Signup header

The header contains the name of the form, whichever is active (can be one of: `Personal Info`, `Office Details` and `Confirmation Page`), on the left. On the right, name of the user and a help icon is displayed.\
By default, text `User` is displayed until the user has submitted the personal info form.\
Clicking on the help icon redirects the user to this HOW-TO-USE guide.

### Signup tabs

The component contains three tabs (aka steps) and two dividers to separate those tabs.\
A divider is in dark red colour if the preceding step is complete; otherwise it is in light red colour.\
A tab is in grey colour if the data of the corresponding step has not been submitted to the server. Otherwise, it is in dark red colour. It has an outer red border if the step is active, i.e., the form in that step is visible to the user. The colur of the tab changes on hover.
A tab is clickable in the following cases:

1. The corresponding step is in complete state, i.e., the data of the corresponding step has been submitted to the server.
2. The preceding step is in complete state, i.e., the data of the preceding step has been submitted to the server.

If the user re-edits a completed step and tries to move around by clicking on the tabs and without submitting the edit, an alert will notify him/her to submit the data before moving to any other step.

### Personal Info form

The form requires personal data of the user.\
Except `Address Line 2` and `Address Line 3`, all the fields are required to submit the form.\
`Email` and `Mobile Number` are validated before submission. Rest required fields are checked only to ensure that the fields are not empty.\
Error messages are visible corresponding to each field which resulted into an error.\
Click on `Next` to see the errors or save the data (call API) in case there are no errors.\
An error message is displayed at the top of the form if the API fails.

### Office Details form

The form requires workplace data of the user.\
Except `Address Line 2`, all the fields are required to submit the form.\
`Landline Number` and `PO Box Number` are validated before submission. Rest required fields are checked only to ensure that the fields are not empty.\
Error messages are visible corresponding to each field which resulted into an error.\
Click on `Next` to see the errors or save the data (call API) in case there are no errors.\
An error message is displayed at the top of the form if the API fails.

### Confirmation Page

This page displays all the fields filled by the user in the last 2 steps. Any non-mandatory field is shown empty.\
To edit any of those text fields, click on the relevant tab to re-edit and save the data.\
On the right, two sections appear to accept image and signature of the user.\
`Camera icon` appears only if the webcam is available on the user's device. `Folder icon` to choose an image from the device is always available. User may have a choice to either click a picture using webcam or to choose a picture from local machine.\
`Gesture/Signature icon` is a button to help user enter his/her signature.\
On clicking `Submit`, each section will show an error if the corresponding data is not available, i.e., if the image and the signature sections do not have an image and a signature respectively, they will show errors.
If the page is free of errors, `Submit` button will save the data (call API) and redirect the user to the success page.
If the API fails, an error message is displayed at the top.

#### Webcam modal

On clicking, `camera icon`, webcam modal opens up for the user to capture the image. User is free to retake as many times the user likes.\
On clicking `Use screenshot`, user can use that image for the form. Modal is automatically closed.\
User can choose to click a picture again using the same process.

#### Signature modal

On clicking, `signature icon`, signature modal containing a canvas opens up for the user to draw his/her signature. User is free to try signing as many times the user likes. `Clear` button helps in clearing the canvas.\
On clicking `Use signature`, user can use that signature for the form. Modal is automatically closed.\
User can choose to click a picture again using the same process.

## Success page

The page displays the application ID for a successful submission. Click `OK` to fill another form.\
If a user tries to access this success page without filling up the form, the page automatically redirects the user to the `home page`.

## Page Not Found

This is a page for the user to know if he/she landed on an unknown route.\
Click on `HOME` or `SIGNUP` to go to `home page` or `signup page` respectively.
