/*
1-- comment ping

2--Create Vercel.json file and add the following content to it:
{
  "version":2,
  "builds":[
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}


3-- Create keyconverter.js file and add the following content to it:

const fs = require('fs');
const key = fs.readFileSync('./firebase-admin-service-key.json', 'utf8')
const base64 = Buffer.from(key).toString('base64')
console.log(base64)



----------------------------
terminal a 
node keyconverter.js 

---------------------------
4-- Copy the output from the terminal and set it as the value of FB_SERVICE_KEY in your .env file:

5--Copy 


const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
const serviceAccount = JSON.parse(decoded);


in config/firebase.js and remove the line where you require the JSON file directly.


*/