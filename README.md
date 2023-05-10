# WTWR Part 2/2 (What to Wear?): Back End

## Overview

-   Project Purpose
-   Access the application
-   Tech & Techniques

**Project Purpose**

The back-end project is focused on creating a server for the WTWR application.

The main goal is to create a server with an API and user authorization system that makes user activities like signing or logging-in simple. Hopefully the front-end is easy and informative for users, even if the back-end stays somewhat complicated for the engineers, like myself.

**Access the application**

You can visit the app's page at [HERE!](https://wtwrpc.epicgamer.org)

**Tech & Techniques**

JavaScript was the main programming langauge used for the project. However, there were other moving parts within the software that made the server work.

#### Tech

-   Node.js modules to set up a server
-   Express.js to build the back-end & deploy the server
-   MongoDB, a NoSQL database, to view and edit database entries
-   Mongoose, the MongoDB's mapper, to connect the server & database

#### Techniques

-   Schemas --> dataset with rules
-   Models --> wrapper around a schema to create a document
-   Creating, Reading, Updating and Deleting Documents
-   Error Handling
-   bcrypt for password hashing (thanks node.js)
-   jsonwebtoken package to create tokens for authentification (thanks node.js)
-   Using a file as middleware to authenticate files
-   Storing a secret key...secretly
