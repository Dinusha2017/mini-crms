# Mini CRMS with User and Sales Opportunity functionality

This repository contains code for the following functionalities of a typical CRMS application. Both the backend and frontend code is available in this repository.
- Filtering, Sorting, and listing users.
- Viewing users.
- Adding and updating sales opportunities of a particular user.

Technologies used:
- MEAN Stack (Mongo DB, Express JS, Angular, Node JS)

Prerequisites:
- Mongo DB should be installed and running in the machine.
- Node should be installed in the machine. (Node version used: 16.16.0)
- Please ensure that the ports required by backend (default: port 3000) and frontend (default: port 4200) are free for use.
- Angular CLI is installed.

After cloning project, steps to start Node JS backend:
1. You can run the "npm install" command inside the folder which contains the package.json file that holds the node module dependencies.
2. If you want to change the port at which Mongo DB is running or backend is running in the backend code, the respective value can be changed at config/appsettings.js file.
3. Use "node index.js" command to start the backend.

After cloning project, steps to start Angular frontend:
1. You can run the "npm install --legacy-peer-deps" command inside the folder which contains the package.json file that holds the node module dependencies.
2. You can run "ng serve --open" to run the application. If you want to change the port at which the application runs, give command: "ng serve --port 4401 --open", putting the port number at the place 4401 is written.

Other notes:
- User list table can be sorted only by one column at a time. Table can be sorted by a particular column by clicking on the table header of that respective column.
- User data can be filtered using id, name, email, contact number, address, and status fields.
