# WTWR (What to Wear?) Part 2/2: Back-End

## Overview

-   Project Purpose
-   How to access the Application
-   Part 1/2: The Front-End
-   Tech & Techniques

**Project Purpose**

The back-end project is focused on creating a server for the WTWR application.

The main goal is to create a server with an API and user authorization system that makes user activities like signing or logging-in simple. Hopefully, the front end will be straightforward and informative for users, even if the back end stays somewhat complicated for engineers like me. 🥲😅

**How to access the Application**

You can visit the webpage by [Clicking Here!](https://wtwrpc.epicgamer.org)
Or copy any of these addresses into your search bar:

1. wtwrpc.epicgamer.org
2. www.wtwrpc.epicgamer.org

**Part 1/2: The Front-End**

The user interface allows users to interact with the application thanks to a Front-End.
You can access the Front-End Repo by [Clicking Here](https://github.com/Freddy-PC/se_project_react)!

**Tech & Techniques**

JavaScript is the primary programming language used for the project. However, other moving parts within the software made the server work.

#### Tech

-   Node.js --> modules set up a server
-   Express.js --> build the back-end & deploy the server
-   MongoDB --> a NoSQL database to view and edit database entries
-   Mongoose --> the MongoDB's mapper to connect the server & database

#### Techniques

-   Schemas --> dataset with rules
-   Models --> wrapper around a schema to create a document
-   Creating, Reading, Updating and Deleting Documents
-   Error Handling
-   bcrypt for password hashing (thanks node.js)
-   jsonwebtoken package to create tokens for authentification (thanks node.js)
-   Using a file as middleware to authenticate files
-   Storing a secret key...secretly
