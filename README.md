# Uploadr

This project takes a file and uploads it to a predefined Google bucket. 
The node.js server has one endpoint `/upload` which is consumed by a front end React SPA.
A node server may seem overcooked just to upload a document to the cloud but this is currently the simplest (and most secure) way to do this.
While there is a client-side library to upload to a Google bucket (https://github.com/google/google-api-javascript-client) it is still in beta, lacks documentation and would be more challenging to secure secret credentials.

## Running Uploadr

1. Install yarn if you haven't already (https://classic.yarnpkg.com/en/docs/install/#windows-stable)
2. Clone repo and navigate to the project root. Run `yarn` to initialize the project and node modules.
3. Add the `tmp-until-20201030-sa.json` file under `Uploadr\src\server\config\keys\`
4. Run `yarn start`. This will build the SPA (with webpack) and start the server on `http://localhost:3000/`

**tests**: `yarn test`

## Code choices

I picked most of these libraries because I am familiar with them and use them frequently. For this project I used React-Bootstrap because it's light, simple and clean. I have used Material-UI extensively but it has a little more boilerplate which isn't necessary for a project of this size.

## TODO

- Test injection attacks etc.
- Specify bucket name & key file at run time