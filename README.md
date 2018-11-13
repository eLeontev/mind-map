## Mind-map

[![Build Status](https://travis-ci.com/eLeontev/mind-map.svg?branch=master)](https://travis-ci.com/eLeontev/mind-map)

A modern approach to structuring and data processing. Provides a way to build tree-graph dependencies with one root block. 

### Actual functionality

1. keyboard navigation 
  - `Enter` to create a new sister block on the same level (does not work on root blocks because there can only be one root)
  - `Tab` to create a new child block 

2. validation
  - the text of an edited block should not be empty + the text of only one block can be edited at a time

3. mouse navigation
  - click on any free space to close an edited block in case the block's text already exists (see validation)
  - click on any block to switch it to edit mode (before edited block will be closed in case the block's text exists already) 

### How to use

Initially display one block (root block in particular) in edit mode. 
Begin typing to start work with mind-map.
Press Enter after finishing the text. This will end the edit mode.

Now press Tab to create a new child block. *Each new block will be displayed in edit mode by default with the focus on the text area.

Creating a new sister block by pressing enter works on each block except the root block (only one root can exist)
Mouse click turns off edit mode if click was performed on an empty space and will open edit mode in the block that was clicked. 

* To turn off edit mode click mouse on empty space outside of any blocks.

Sample workflow:
`typing` -> `Enter` -> `Tab` -> `typing` -> `Enter` -> `Enter` -> `typing` ...

## Development

To connect to server please read [server/readme.md](https://github.com/eLeontev/mind-map/blob/master/server/README.md)

  - [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Supported Browsers

By default, the generated project supports all modern browsers.<br>
Support for Internet Explorer 9, 10, and 11 requires [polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md).
