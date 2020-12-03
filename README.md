# Lovely Stay coding challenge

The app developed in the scope of this challenge enables a user to find a GitHub user by username and have some of its info presented in a card.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
After cloning the project from https://github.com/jsampayoramos/ls-challenge you should run `npm install` on the root folder to install all dependecies.
**To run the project in development mode run the `npm start` script.**

## Available Scripts

In the project directory, you can find the following scripts:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test a`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance, making the code ready to be deployed.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## Code Structure

The `src` folder has 4 subfolders:
* `pages`: contains the pages displayed in the view.
* `components`: contains components that are used in the pages and that can be reused.
* `context`: contains a context file to manage state.
* `utils`: contains a file which has setup information and functions that are used in several parts of the project.

### Pages folder

The pages folder has the two pages that can be viewed by the users:
* Homepage (`src/pages/Homepage/Homepage.js`): this is the landing page for the app. It has a container with an input field to insert the GitHub username, and a submit button; 
* UserInfo (`src/pages/UserInfo/UserInfo.js`): this is the page with the card that contains the info from the GitHub user (profile picture, name, total repos and the list of the public repos);

These pages are managed by `react-router-dom` at `App.js` level.

### Components folder

The components folder contains reusable components (some of them are not reused given the small size of the project, but could be used if the project was to grow/develop further) such as input field, button, spinner, ...

### Context folder

The project includes a context file to manage the state of the app, which includes the user information, user repos, loading status and error messages. 

### Utils folder

This folder includes the test mode setup and two http request functions that are here outsourced for code organization and readability purposes.

## Descriptions and decisions made

### App.js

The `App.js` file was kept with a relative small amount of code, having mostly the `jsx` returned, which is the two pages of the app. This enables other developers to easily understand how the code is organized and easily navigate through the folder and file structure.
For this, it was decided to have a context file which reduces the need for prop drilling. The context provider is located in the `index.js` file because the `App.js` uses a piece of the state to render a loading spinner.

### Homepage.js

The `Homepage.js` file is the landing page. It has an input field which has a value managed by a local state. This is because the input value is only used at this component. This component also has the code regarding the request to the GitHub API to get the user information. This user information is then dispatched to the context becoming available to `UserInfo.js`.

### UserInfo.js

The `UserInfo.js` file contains the `jsx` for the user info card. It also contains the code to request the user repos, which is requested on mount and dispatched to the context file. Given that each GitHub response provides a maximum of 30 repos, a pagination was implemented to request different pages to the GitHub API.

## Tests

Two automatic tests were implemented for the `Homepage.js` (see file `Homepage.test.js`):
* Test that the search box is always renderer;
* Test that when the input field changes the update function of `useState` is called;

To run the test run the script `npm run test`.

### Aditional information

When errors are thrown by the GitHub API, the error message provided by the API response is presented to the user. In a project which involved a backend component as well, the messages would provide more specific information (the GitHub API does not provide very specific messages).
CSS Modules were used to allow CSS scoping. This is not very relevant for small sized projects such as this one, but would become more and more relevant if the project was to grow/develop further.