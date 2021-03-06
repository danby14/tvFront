# Predict TV

Where users face-off against friends and foes in a competition to see who can best predict which new TV shows will last the longest.

*This repo is for the frontend code. Backend code can be found at https://github.com/danby14/tvBack.*

## Features
- Create League (Choose league name)
  - League Settings Page
    - Change start date
    - Add / remove shows league makes predictions for
    - Change / update league password
    - Invite Users (Max 10 players per league)
    - Remove user from league
    - Delete league from existence
- Join League (Get league id and password from a league commissioner)
- Watch Trailers
- Make Predictions (League commissioner sets date for league to start, predictions get locked at this point)
- View Standings

## Tech
- Bulma and custom styles
- React-router for navigation
- React-hook-form for forms
- React Player to watch show trailers
- Axios to communicate with the backend
- React share to recruit new users to a league

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
