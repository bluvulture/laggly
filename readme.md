# Loggly - NodeJS/Puppeteer Jira logger

If you are using Jira to track time on projects, and you are lazy as I am, you probably log time at the last possible moment.
So, I've made a small autolog tool for JIRA with NodeJS and Puppeteer.
I hope it will help you to stay at the top of your productive game :)

### Prerequisites

What things you need to install, and how to install them

NodeJS
npm

```
npm install

```

After that you need to change constants.js file and populate it with your data.


### Using

This logger uses a csv file to log your work.
You will need a new csv file in the same directory as this to have it running.
It needs to be in following format with headers

```
key;date;duration;log
BUG-999;01.01.2020;1;This time next year we'll be millionaires
```

### Running 

npm run start
