ServiceNow Trello Integration
=============================

Allows any record that extends the `task` table to be exported to Trello in the form of a card. The `short_description` becomes the card's name, and the `description` becomes the card's description.

Changes in the Update Set
----------------------------

 - New dictionary field on the `sys_user` table, with a label, to hold the user's Trello OAuth token
 - New script include, accessed via GlideAJAX to get the Trello OAuth token
 - New UI Page, to act as a dialog window
 - New UI Action, to open the dialog window

How it works
------------

The UI Action opens up a dialog window that is a UI Page. When that page is opened it uses GlideAJAX to get the user's Trello OAuth token off their `sys_user` record. Then a RESTful request is sent to Trello to get a list of that user's available boards.

When the user chooses a board another RESTful request is sent to Trello to get the lists that are on that board.

When the user chooses a list and clicks "Insert Card" a RESTful request is made to Trello with the information for the new card. The dialog window then closes and a link to the returned card is provided.

Setup
-----

1. Import the update set into ServiceNow
2. Make any adjustments you desire to restrict who has access to the Trello integration. You can do this with the Condition on the UI Action
2. Get a Trello Developer Key [here](https://trello.com/1/appKey/generate)
3. Copy and paste that key into the variable at the top of the UI Page called `Trello`
4. In the `OAuthTokenSetup` directory edit `index.html` and replace `**DEVELOPER_KEY**` with your Developer Key
5. Make any adjustments you want so you can edit the OAuth Token on the `sys_user` table
6. Get your OAuth Token for ServiceNow and add it to your user record. Any use who wants to use the Trello integration should do this. Instructions for it are in another section
7. Enjoy

Getting the OAuth Token
-----------------------

The `OAuthTokenSetup` directory has everything you need to get an OAuth token to use with ServiceNow. You must load index.html through a webserver. Just opening the file in a browser will not work. That is what the `package.json` and `server.js` files are provided. They can be used, in conjunction with [Nodejs](http://nodejs.org), to run a small webserver for the purpose of getting your token.

If you do not already have it installed, download and install Nodejs from their [website](http://nodejs.org/). If you are using an existing webserver you can skip the next few steps.
Once you have Nodejs downloaded and installed open up the Nodejs command prompt (if on windows), or a normal command prompt (if not on windows). Navigate to the `OAuthTokenSetup` directory and type `npm install`. This will install the required dependency as specified in the `package.json` file. Once that is done run `node server.js`. You can now go to [http://localhost:8080](http://localhost:8080) in your browser and use the page.

Once you have opened the `index.html` file in your browser via a webserver you will see a link on the page that says "Connect To Trello". Click it and a window will open asking you to authorize access to your trello account. Once you authorize the request and return to the page you will see a token displayed at the top. That is what you need to copy into ServiceNow.

Frequently Asked Questions
--------------------------

**How do I import the update set?**

Here are ServiceNow's [instructions](http://wiki.servicenow.com/index.php?title=Saving_Customizations_in_a_Single_XML_File#Loading_Customizations_from_a_Single_XML).

**Where can I find Trello's API documentation?**

Here is a [link](https://trello.com/docs/) to their documentation.