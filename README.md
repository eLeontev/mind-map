## Mind-map 

Common approach which provides to build tree-graph dependencies with one root block.
At whole it is considered as a modern approach to structuring and data processing. 

### Actual functionality

1. keyboard navigation 
  - `Enter` to create a new sister block on the same level (does not work on root blocks, since it should be only one)
  - `Tab` to create a new child block 

2. validation
  - the text of edited block should not be empty + only one text can be edited at time

3. mouse navigation
  - click on any free space closes edited block in case if the block's text exists (see validation)
  - click on any block switches it to edit mode (before edited block will be closed in case if the block's text exists) 

### How to use

The application initially displays a single block in edit mode (this is the root block). To interact with mind-map, begin typing. When you are finished with your text, press `Enter`. This will close edit mode on the current item.

* To create a new child block, press `Tab`. 
  * By default, each new block will be displayed in edit mode with focus on the text area.
  
* To create a sister block, press `Enter`. This works for any block except the root block (only one root can exist).

* To open edit blocks, simply click on the box you would like to edit.

* To turn off edit mode click mouse on emtpy space outside of any blocks.

Sample workflow:
`typing` -> `Enter` -> `Tab` -> `typing` -> `Enter` -> `Enter` -> `typing` ...

## Development

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
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
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
