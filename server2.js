

const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const XLSX = require('xlsx');
const cors = require('cors');
const pdf = require('html-pdf');
const app = express();
const PORT = 5500;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Define a data structure to store module reports
const moduleReports = {};

// Function to add logs and count variables to the module reports
function addToReport(moduleName, message, count) {
  if (!moduleReports[moduleName]) {
    moduleReports[moduleName] = [];
  }
  moduleReports[moduleName].push({ message, count });
}

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());










app.post('/MainLogin', async function (req, res) {
  const { email, password } = req.body;
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
  let count_login=0;
  let increment=100/9;
  try {
    
  const page = await browser.newPage();
    // Navigate to the target application
    await page.goto('https://horizon.ucp.edu.pk/web/login');

//enter email on mainpage
await page.type('#login', email);
count_login+=increment;
addToReport('MainLogin', 'email entered on main page  ', count_login.toFixed(2));

await page.type('#password', password);
count_login+=increment;
addToReport('MainLogin', 'pasword entered on main page  ', count_login.toFixed(2));

// click on login with odoo
await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > button > span');
addToReport('MainLogin', 'click on the "login with odoo button"  ', count_login.toFixed(2));

console.log('unable to proceed using this button ');
addToReport('MainLogin', 'unable to proceed using this button  ', count_login.toFixed(2));


        // Click on the button to login with Microsoft account
        await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');
      count_login+=increment
        addToReport('MainLogin', 'clicked on login with microsoft option  ', count_login.toFixed(2));

        // Wait for the login page to load
        await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear

        // Fill in email and click next
        await page.type('#i0116', email);
        await Promise.all([
            page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
            page.click('#idSIButton9'), // Click on the next button
          ]);

          count_login+=increment
          addToReport('MainLogin', 'email typed and next button clicked  ', count_login.toFixed(2));
  

          await page.waitForNavigation();
        // Wait for the password input field to appear
        await page.waitForSelector('#i0118', { timeout: 70000 });

        console.log(password);
        // Fill in the password
        await page.type('#i0118', password);

        // Click on the login button

        await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
//after this step...
try {
    // Click on the login button and wait for navigation
    await Promise.all([
      
        page.click('#idSIButton9'),
    ]);
} catch (error) {
    console.error('Error clicking login button:', error);
}

count_login+=increment
        addToReport('MainLogin', 'typed password and clicked on the Login button  ', count_login.toFixed(2));

await new Promise(resolve => setTimeout(resolve, 5000));
     
// Handle "Stay signed in" prompt by clicking on "Yes" button
await Promise.all([
  page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
  page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
]);

count_login+=increment
        addToReport('MainLogin', 'clicked on "yes" stay signed in option  ', count_login.toFixed(2));

  // Check if the login was successful by waiting for a specific element on the dashboard page
  await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login

  count_login+=increment
        addToReport('MainLogin', 'Login successfull   ', count_login.toFixed(2));

  console.log('Login successful!');
    
   


await browser.close();
   

    // Now you can continue with the code to interact with the attendance page as needed
  } catch (error) {

    console.error('Error: Unsuccessful login or navigation:', error);
    await browser.close();
  } 
});








app.post('/attendance', async function (req, res) {
    const { email, password } = req.body;
    console.log("attendece opened");
let count_attendence=0;
let increment=0;
let total_actions=7;
increment=100/total_actions;
    try {
        const browser = await puppeteer.launch({ headless: false }); // Launch Puppeteer in headful mode
        const page = await browser.newPage();

        // Navigate to UCP login page
        await page.goto('https://horizon.ucp.edu.pk/web/login');
        addToReport('attendance', 'Navigating to UCP login page', count_attendence.toFixed(2));

        // Click on the button to login with Microsoft account
        await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');

        addToReport('attendance', 'Clicking on the button to login with Microsoft account ', count_attendence.toFixed(2));
        // Wait for the login page to load
        await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear

        // Fill in email and click next
        await page.type('#i0116', email);
        await Promise.all([
            page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
            page.click('#idSIButton9'), // Click on the next button
          ]);
          await page.waitForNavigation();
        // Wait for the password input field to appear
        await page.waitForSelector('#i0118', { timeout: 70000 });
        
       
        // Fill in the password
        await page.type('#i0118', password);
        addToReport('attendance', 'password is being filled ', count_attendence.toFixed(2));

        // Click on the login button

        await page.waitForSelector('#idSIButton9' , { timeout: 70000 });

try {
    // Click on the login button and wait for navigation
    await Promise.all([
      
        page.click('#idSIButton9'),
    ]);
} catch (error) {
    console.error('Error clicking login button:', error);
}
await new Promise(resolve => setTimeout(resolve, 5000));
     
// Handle "Stay signed in" prompt by clicking on "Yes" button
await Promise.all([
    page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
    page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
  ]);

  // Check if the login was successful by waiting for a specific element on the dashboard page
  await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login

  console.log('Login successful!');

  addToReport('attendance', 'login successful!', count_attendence);
  // Wait for the three horizontal lines menu button to appear
  await page.waitForSelector('#sidebar_main_toggle', { timeout: 70000 });
  
  // Click on the three horizontal lines menu button
  await page.click('#sidebar_main_toggle');
  console.log('three horizontal lines menu button clicked successfully ');
  count_attendence+=increment;

  addToReport('attendance', 'three horizontal lines menu button clicked successfully', count_attendence.toFixed(2));
  // Introduce a delay of 4 seconds to allow the menu to appear
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 4000));
  });

  // Wait for the attendance button to appear
  await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(3) > a > span.menu_icon > i', { timeout: 30000 });

  // Click on the attendance button using page.evaluate()
  await page.evaluate(() => {
    document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(3) > a > span.menu_icon > i').click();
  });
  console.log('attendance button clicked successfully ');
  count_attendence+=increment;
  addToReport('attendance', 'attendance button clicked successfully', count_attendence);
  // Wait for navigation to complete
  await page.waitForNavigation({ timeout: 30000 });
 
  console.log('Navigated to the attendance page.');

  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(2) > div > a > h6').click();
  });
  console.log('first active class clicked successfully ');
  count_attendence+=increment;
  addToReport('attendance', 'first active class clicked successfully', count_attendence.toFixed(2));
  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 4000));
  });

  console.log('Navigated to the first active class.');

  await page.goBack();

 
  console.log('returning from first active class.');

//enter second class 

  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(3) > div > a > h6 > span:nth-child(2)').click();
  });
  console.log('second active class clicked successfully ');
  count_attendence+=increment;
  addToReport('attendance', 'second active class clicked successfully', count_attendence.toFixed(2));

  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  });

  console.log('Navigated to the second active class.');

  await page.goBack();

 
  console.log('returning from second active class.');

  //enter third class


  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(4) > div > a > h6').click();
  });


  console.log('third active class clicked successfully ');
  count_attendence+=increment;

  addToReport('attendance', 'third active class clicked successfully', count_attendence.toFixed(2));
  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  });

  console.log('Navigated to the third active class.');

  await page.goBack();

 
  console.log('returning from third active class.');

  //enter fourth active class

  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(5) > div > a > h6').click();
  });

  console.log('fourth active class clicked successfully ');
  count_attendence+=increment;
  addToReport('attendance', 'fourth active class clicked successfully', count_attendence.toFixed(2));
  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  });

  console.log('Navigated to the fourth active class.');

  await page.goBack();

 
  console.log('returning from fourth active class.');

  //enter fifth active class
  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(6) > div > a > h6').click();
  });
  console.log('fifth active class clicked successfully ');
  count_attendence+=increment;
  addToReport('attendance', 'fifth active class clicked successfully', count_attendence.toFixed(2));
  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  });

  console.log('Navigated to the fifth active class.');

  await page.goBack();

 
  console.log('returning from fifth active class.');
  console.log('completed all actions in attendance module !!!');

  console.log('the total precentage for attendence  is : ',count_attendence.toFixed(2),'%');
  addToReport('attendance', 'the total precentage for attendence  is :', count_attendence.toFixed(2));
count_attendence=count_attendence.toFixed(2);
 
        await browser.close();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }


   
});

app.post('/profile', async function (req, res) {
  const { email, password } = req.body;
  let count_profile=0;
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
  try {
    
  const page = await browser.newPage();
    // Navigate to the target application
    await page.goto('https://horizon.ucp.edu.pk/web/login');

        // Click on the button to login with Microsoft account
        await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');

        // Wait for the login page to load
        await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear

        // Fill in email and click next
        await page.type('#i0116', email);
        await Promise.all([
            page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
            page.click('#idSIButton9'), // Click on the next button
          ]);
          await page.waitForNavigation();
        // Wait for the password input field to appear
        await page.waitForSelector('#i0118', { timeout: 70000 });
 
        // Fill in the password
        await page.type('#i0118', password);

        // Click on the login button

        await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
//after this step...
try {
    // Click on the login button and wait for navigation
    await Promise.all([
      
        page.click('#idSIButton9'),
    ]);
} catch (error) {
    console.error('Error clicking login button:', error);
}
await new Promise(resolve => setTimeout(resolve, 5000));
     
// Handle "Stay signed in" prompt by clicking on "Yes" button
await Promise.all([
    page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
    page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
  ]);

  // Check if the login was successful by waiting for a specific element on the dashboard page
  await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login

  console.log('Login successful!');
    
    // Wait for the three horizontal lines menu button to appear
await page.waitForSelector('#sidebar_main_toggle', { timeout: 50000 });
console.log('Main Dashboard Opened ');
addToReport('profile', 'dashboard opened', count_profile);
// Click on the three horizontal lines menu button
await page.click('#sidebar_main_toggle');
console.log('three horizonal lines menu clicked successfully');
count_profile+=20;
addToReport('profile', 'three horizontal lines menu click successfully', count_profile);
    // Wait for the Profile button to appear
await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(2) > a > span.menu_icon > i', { timeout: 30000 });

// Click on the Profile button using page.evaluate()
await page.evaluate(() => {
  document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(2) > a > span.menu_icon > i').click();
  console.log('profile button clicked successfully');
 

});
count_profile+=20;
addToReport('profile', 'profile button click successfully', count_profile);
// Wait for navigation to complete
await page.waitForNavigation({ timeout: 30000 });

console.log('Navigated to the Profile page.');

await page.waitForSelector('#user_profile_tabs > li:nth-child(1) > a', { timeout: 50000 });

// Click on the About button
await page.click('#user_profile_tabs > li:nth-child(1) > a');


console.log('About button clicked successfully');
count_profile+=20;
addToReport('profile', 'About button click successfully', count_profile);
await page.waitForSelector('#user_profile_tabs > li:nth-child(2) > a', { timeout: 50000 });

// Click on the BIO data button
await page.click('#user_profile_tabs > li:nth-child(2) > a');

console.log('BIO data button clicked successfully');
count_profile+=20;
addToReport('profile', 'BIO data button click successfully', count_profile);
await page.waitForSelector('#student_profile_update > div > div.user_heading > button.profile_default_fields.md-fab.md-fab-small.md-fab-accent.hidden-print > i', { timeout: 60000 });

// Click on the Edit button
await page.click('#student_profile_update > div > div.user_heading > button.profile_default_fields.md-fab.md-fab-small.md-fab-accent.hidden-print > i');


console.log('edit profile button clicked successfully');
count_profile+=20;
addToReport('profile', 'edit button click successfully', count_profile);
await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 4000));
  });

  console.log('the total precentage for profile  is : ',count_profile,'%');
  addToReport('profile', 'total percentage for profile: ', count_profile);

  } catch (error) {
    console.error('Error: Unsuccessful login or navigation:', error);
   await browser.close();
  }
  finally{
    await browser.close();
  }
});


app.post('/enrollment', async function (req, res) {
  const { email, password } = req.body;
  let count_enrollment=0;
let increment=0;
let total_actions=13;
increment=100/total_actions;

const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
  try {
    const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
  const page = await browser.newPage();
   // Navigate to UCP login page
   await page.goto('https://horizon.ucp.edu.pk/web/login');

   // Click on the button to login with Microsoft account
   await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');

   // Wait for the login page to load
   await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear

   // Fill in email and click next
   await page.type('#i0116', email);
   await Promise.all([
       page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
       page.click('#idSIButton9'), // Click on the next button
     ]);
     await page.waitForNavigation();
   // Wait for the password input field to appear
   await page.waitForSelector('#i0118', { timeout: 70000 });

   
   // Fill in the password
   await page.type('#i0118', password);

   // Click on the login button

   await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
//after this step...
try {
// Click on the login button and wait for navigation
await Promise.all([
 
   page.click('#idSIButton9'),
]);
} catch (error) {
console.error('Error clicking login button:', error);
}
await new Promise(resolve => setTimeout(resolve, 5000));

// Handle "Stay signed in" prompt by clicking on "Yes" button
await Promise.all([
page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
]);

// Check if the login was successful by waiting for a specific element on the dashboard page
await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login

console.log('Login successful!');

addToReport('enrollment', 'login successfully', count_enrollment);
  // Wait for the three horizontal lines menu button to appear
  await page.waitForSelector('#sidebar_main_toggle', { timeout: 60000 });
    
  // Click on the three horizontal lines menu button
  await page.click('#sidebar_main_toggle');
  
console.log('three horizontal menu button is clicked successfully ');
count_enrollment+=increment;

addToReport('enrollment', 'three horizontal lines menu button clicked successfully', count_enrollment.toFixed(2));
  // Introduce a delay of 5 seconds to allow the menu to appear
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  });

  // Wait for the enrollment button to appear
  await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(6) > a > span.menu_icon > i', { timeout: 30000 });

  // Click on the enrollment button using page.evaluate()
  await page.evaluate(() => {
    document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(6) > a > span.menu_icon > i').click();
  });
  console.log('enrollment button is clicked successfully ');
  count_enrollment+=increment;
  addToReport('enrollment', 'enrollment button clicked successfully', count_enrollment.toFixed(2));

  // Wait for navigation to complete

  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  });
 
  await page.evaluate(() => {
    document.querySelector('a[href="/student/enrolled/courses"]:not([aria-hidden="true"])').click();
  });
  console.log('enorlled courses button is clicked and next page is loaded .');
  count_enrollment+=increment;
  addToReport('enrollment', 'enrolled courses button clicked successfully', count_enrollment);
  await Promise.all([
    page.waitForNavigation({ timeout: 50000 }), // Wait for navigation to complete with a timeout of 50 seconds
  ]);


  //first active class 
  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(2) > div > div:nth-child(2) > a > h4').click();
  });
  console.log('first active class button clicked successfully ');
  count_enrollment+=increment;
  addToReport('enrollment', 'first active class button clicked successfully', count_enrollment.toFixed(2));
  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 4000));
  });

  console.log('Navigated to the first active class of enrolled courses.');

  await page.goBack();

 
  console.log('returning from first active class.');

  //second active class
  await page.evaluate(() => {
    document.querySelector('#hierarchical-show > div:nth-child(3) > div > div:nth-child(2) > a > h4 > span:nth-child(3)').click();
  });

  console.log('second active class button is clicked successfully ');
  count_enrollment+=increment;
  addToReport('enrollment', 'second active class button clicked successfully', count_enrollment.toFixed(2));
  await page.waitForNavigation({ timeout: 30000 });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 4000));
  });

  console.log('Navigated to the second active class of enrolled courses.');

  await page.goBack();

 
  console.log('returning from second active class.');
  


//third active class
await page.evaluate(() => {
document.querySelector('#hierarchical-show > div:nth-child(4) > div > div:nth-child(2) > a > h4 > span:nth-child(3)').click();
});
console.log('third active class button is clicked successfully ');
count_enrollment+=increment;
addToReport('enrollment', 'third active class button clicked successfully', count_enrollment.toFixed(2));
await page.waitForNavigation({ timeout: 30000 });
await page.evaluate(() => {
return new Promise(resolve => setTimeout(resolve, 4000));
});

console.log('Navigated to the third active class of enrolled courses.');

await page.goBack();


console.log('returning from third active class.');

//fourth active class

await page.evaluate(() => {
document.querySelector('#hierarchical-show > div:nth-child(5) > div > div:nth-child(2) > a > h4 > span:nth-child(3)').click();
});

console.log('fourth active class button is clicked successfully ');
count_enrollment+=increment;
addToReport('enrollment', 'fourth active class button clicked successfully', count_enrollment);
await page.waitForNavigation({ timeout: 30000 });
await page.evaluate(() => {
return new Promise(resolve => setTimeout(resolve, 4000));
});

console.log('Navigated to the fourth active class of enrolled courses.');

await page.goBack();


console.log('returning from fourth active class.');

// fifth active classs

await page.evaluate(() => {
document.querySelector('#hierarchical-show > div:nth-child(6) > div > div:nth-child(2) > a > h4 > span:nth-child(3)').click();
});

console.log('fifth active class button is clicked successfully ');
count_enrollment+=increment;
addToReport('enrollment', 'fifth active class button clicked successfully', count_enrollment.toFixed(2));
await page.waitForNavigation({ timeout: 30000 });
await page.evaluate(() => {
return new Promise(resolve => setTimeout(resolve, 4000));
});

console.log('Navigated to the fifth active class of enrolled courses.');

await page.goBack();


console.log('returning from fifth active class.');


await page.goBack();


await page.waitForSelector('#sidebar_main_toggle', { timeout: 60000 });
  
// Click on the three horizontal lines menu button
await page.click('#sidebar_main_toggle');

console.log('returned to the main page and clicked on the three horizontal lines menu button ');
count_enrollment+=increment;
addToReport('enrollment', 'returned to the main page and clicked on the three horizontal lines menu button', count_enrollment.toFixed(2));
await page.evaluate(() => {
return new Promise(resolve => setTimeout(resolve, 5000));
});



await page.evaluate(() => {
return new Promise(resolve => setTimeout(resolve, 3000));
});

await page.evaluate(() => {
document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(6) > a > span.menu_icon > i').click();
});
console.log('click on the enrollment option again ');
count_enrollment+=increment;
addToReport('enrollment', 'click on the enrollment option again', count_enrollment.toFixed(2));

/// Wait for the self enrollment link to become visible
await page.waitForSelector('a[href="/student/enrollment/cards"]:not([aria-hidden="true"])');

// Get the element handle
const enrollmentLink = await page.$('a[href="/student/enrollment/cards"]:not([aria-hidden="true"])');


await enrollmentLink.click();

console.log('self enrollment button is clicked successfully and next page is loaded ');
count_enrollment+=increment;
addToReport('enrollment', 'self enrollment button is clicked successfully and next page is loaded', count_enrollment.toFixed(2));
// Wait for navigation to complete
await page.waitForNavigation();




await page.goBack();
// enrollment schedules is clicked 


await page.evaluate(() => {
document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(6) > a > span.menu_icon > i').click();
});

console.log('go back to main page and click on three horizontal lines menu ');
count_enrollment+=increment;
addToReport('enrollment', 'go back to main page and click on three horizontal lines menu ', count_enrollment.toFixed(2));
await page.evaluate(() => {
return new Promise(resolve => setTimeout(resolve, 5000));
});

await page.evaluate(() => {
document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content.scroll-scrolly_visible > div.menu_section > ul > li.submenu_trigger.act_section > ul > li:nth-child(3) > a ').click();
});
console.log('enorllment schedules button is clicked and next page is loaded .');
count_enrollment+=increment;
addToReport('enrollment', 'enorllment schedules button is clicked and next page is loaded . ', count_enrollment);
await Promise.all([
page.waitForNavigation({ timeout: 50000 }), // Wait for navigation to complete with a timeout of 50 seconds
]);

console.log('all the clickable buttons in enrollment section are clickable and working correctly ');
console.log('the total precentage for enrollment module  is : ',count_enrollment.toFixed(2),'%'); 
addToReport('enrollment', 'the total precentage for enrollment module  is :  ', count_enrollment.toFixed(2));
await browser.close();
} catch (error) {
  console.error('Error: Unsuccessful login or navigation:', error);
} 
});



app.post('/invoice', async function (req, res) {
  const { email, password } = req.body;
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
  let count_invoice=0;
  try {
    
  const page = await browser.newPage();
    // Navigate to the target application
    await page.goto('https://horizon.ucp.edu.pk/web/login');

        // Click on the button to login with Microsoft account
        await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');

        // Wait for the login page to load
        await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear

        // Fill in email and click next
        await page.type('#i0116', email);
        await Promise.all([
            page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
            page.click('#idSIButton9'), // Click on the next button
          ]);
          await page.waitForNavigation();
        // Wait for the password input field to appear
        await page.waitForSelector('#i0118', { timeout: 70000 });

        console.log(password);
        // Fill in the password
        await page.type('#i0118', password);

        // Click on the login button

        await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
//after this step...
try {
    // Click on the login button and wait for navigation
    await Promise.all([
      
        page.click('#idSIButton9'),
    ]);
} catch (error) {
    console.error('Error clicking login button:', error);
}
await new Promise(resolve => setTimeout(resolve, 5000));
     
// Handle "Stay signed in" prompt by clicking on "Yes" button
await Promise.all([
  page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
  page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
]);

  // Check if the login was successful by waiting for a specific element on the dashboard page
  await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login

  console.log('Login successful!');
    
    // Wait for the three horizontal lines menu button to appear
await page.waitForSelector('#sidebar_main_toggle', { timeout: 50000 });

// Click on the three horizontal lines menu button
await page.click('#sidebar_main_toggle');
count_invoice+=50;
addToReport('invoice', 'the three horizontal lines menu button is clicked:  ', count_invoice);


    // Wait for the Invoice button to appear
await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(9) > a > span.menu_icon > i', { timeout: 30000 });
count_invoice+=50;
addToReport('invoice', 'The invoice button is clicked  ', count_invoice);

// Click on the Invoice button using page.evaluate()
await page.evaluate(() => {
  document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(9) > a > span.menu_icon > i').click();
});

// Wait for navigation to complete
await page.waitForNavigation({ timeout: 30000 });

console.log('Navigated to the Invoice page.');

addToReport('invoice', 'the invoice page is displayed ', count_invoice);

addToReport('invoice', 'the Total percentage of invoice module:  ', count_invoice);

await browser.close();
   

    // Now you can continue with the code to interact with the attendance page as needed
  } catch (error) {
    console.error('Error: Unsuccessful login or navigation:', error);
    await browser.close();
  } 
});
  

  

  
  app.post('/feedback', async function (req, res) {

    app.use((req, res, next) => {
        console.log(`Received ${req.method} request for ${req.url}`);
        next();
    });
    
  
    let count_feedback=0;
    const { email, password } = req.body;
    const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
    console.log('Received POST request to /feedback');
    try {
        const { email, password } = req.body;
    const page = await browser.newPage();
      // Navigate to the target application
      await page.goto('https://horizon.ucp.edu.pk/web/login');
  
 // Capture console.log messages
 let consoleLogs = [];
 page.on('console', msg => consoleLogs.push(msg.text()));

          // Click on the button to login with Microsoft account
          await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');
  
          // Wait for the login page to load
          await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear
  
          // Fill in email and click next
          await page.type('#i0116', email);
          await Promise.all([
              page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
              page.click('#idSIButton9'), // Click on the next button
            ]);
            await page.waitForNavigation();
          // Wait for the password input field to appear
          await page.waitForSelector('#i0118', { timeout: 70000 });
  
         
          // Fill in the password
          await page.type('#i0118', password);
  
          // Click on the login button
  
          await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
  //after this step...
  try {
      // Click on the login button and wait for navigation
      await Promise.all([
        
          page.click('#idSIButton9'),
      ]);
  } catch (error) {
      console.error('Error clicking login button:', error);
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
       
  // Handle "Stay signed in" prompt by clicking on "Yes" button
  await Promise.all([
      page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
      page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
    ]);
  
    // Check if the login was successful by waiting for a specific element on the dashboard page
    await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login
  
    console.log('Login successful!');
      let count_feedback=0;
      addToReport('feedback', 'login successful ', count_feedback);
     // Wait for the three horizontal lines menu button to appear
     await page.waitForSelector('#sidebar_main_toggle', { timeout: 50000 });
      
     // Click on the three horizontal lines menu button
     await page.click('#sidebar_main_toggle');
     count_feedback+=25;
     addToReport('feedback', 'three horizontal lines menu button clicked successfully ', count_feedback);
     console.log("percentages of passing feedback:", count_feedback);
      // document.getElementById("counterfeedback").innerText = "percentage of passing feedback: " + count_feedback;
  
     // Introduce a delay of 2 seconds to allow the menu to appear
     await page.evaluate(() => {
       return new Promise(resolve => setTimeout(resolve, 2000));
     });
  
     // Wait for the feedback button to appear
     await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(7) > a > span.menu_icon > i', { timeout: 50000 });
  
     // Click on the feedback button using page.evaluate()
     await page.evaluate(() => {
       document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(7) > a > span.menu_icon > i').click();
     });
  
     // Wait for navigation to complete
     //await page.waitForNavigation({ timeout: 50000 });
  count_feedback+=25;
  addToReport('feedback', 'feedback button clicked successfully ', count_feedback);
  console.log("percentages of passing feedback:", count_feedback);
       //document.getElementById("counterfeedback").innerText = "percentage of passing feedback: " + count_feedback;
  
     console.log('feedback button clicked .');
  
     await page.evaluate(() => {
         document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li.submenu_trigger.act_section > ul > li > a').click();
       });
       console.log('QAfeedback button clicked and next page is loaded .');
  
  
  
       await Promise.all([
         page.waitForNavigation({ timeout: 50000 }), // Wait for navigation to complete with a timeout of 50 seconds
       ]);
  
       //console.log('coursefeedback option is clicked .');
      await page.evaluate(() => {
         document.querySelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li.uk-active.uk-hidden > a').click();
       });
       console.log('coursefeedback option is clicked .');
  
     count_feedback+=25;
     addToReport('feedback', 'course feedback button clicked successfully ', count_feedback);
     console.log("percentages of passing feedback:", count_feedback);
    //   document.getElementById("counterfeedback").innerText = "percentage of passing feedback: " + count_feedback;
        await page.evaluate(() => {
         document.querySelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li.uk-active.uk-hidden > a').click();
       });
       console.log('teacher feedback option is clicked ');
       addToReport('feedback', 'teacher feedback button clicked successfully ', count_feedback);
       await page.evaluate(() => {
         document.querySelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li.uk-active.uk-hidden > a').click();
       });
       console.log('general survey option is clicked ');
       
  
       await page.evaluate(() => {
         document.querySelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li.uk-active.uk-hidden > a').click();
       });
       
       count_feedback+=25;
       addToReport('feedback', 'general survey button clicked successfully ', count_feedback);
       console.log("percentages of passing feedback:", count_feedback);
       addToReport('feedback', 'the total percentage of feedback module:  ', count_feedback);
     await browser.close();
     res.status(200).json({ consoleLogs, count_feedback });
   } catch (error) {
     console.error('Error: Unsuccessful login or navigation:', error);
     await browser.close();
   }
  




  });



  
  app.post('/notification', async function (req, res) {
    const { email, password } = req.body;
    const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode
    const page = await browser.newPage();
    try {
      
      // Navigate to the target application
      await page.goto('https://horizon.ucp.edu.pk/web/login');
  
          // Click on the button to login with Microsoft account
          await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');
  
          // Wait for the login page to load
          await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear
  
          // Fill in email and click next
          await page.type('#i0116', email);
          await Promise.all([
              page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
              page.click('#idSIButton9'), // Click on the next button
            ]);
            await page.waitForNavigation();
          // Wait for the password input field to appear
          await page.waitForSelector('#i0118', { timeout: 70000 });
  
          console.log(password);
          // Fill in the password
          await page.type('#i0118', password);
  
          // Click on the login button
  
          await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
  //after this step...
  try {
      // Click on the login button and wait for navigation
      await Promise.all([
        
          page.click('#idSIButton9'),
      ]);
  } catch (error) {
      console.error('Error clicking login button:', error);
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
       
  // Handle "Stay signed in" prompt by clicking on "Yes" button
  await Promise.all([
    page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
    page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
  ]);
  
    // Check if the login was successful by waiting for a specific element on the dashboard page
    await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login
  
    console.log('Login successful!');
      let count_notification=0;
      addToReport('notification', 'login successfull  ', count_notification);
     // Wait for the three horizontal lines menu button to appear
     await page.waitForSelector('#sidebar_main_toggle', { timeout: 50000 });
      
     // Click on the three horizontal lines menu button
     await page.click('#sidebar_main_toggle');
     
     // Introduce a delay of 2 seconds to allow the menu to appear
     await page.evaluate(() => {
       return new Promise(resolve => setTimeout(resolve, 3000));
     });
  count_notification+=50;
  addToReport('notification', 'three horizontal lines button clicked successfully:  ', count_notification);
  console.log("percentages of passing notification:", count_notification);
  //document.getElementById("counterNotification").innerText = "percentage of passing notification: " + count_notification;
     // Wait for the notification button to appear
     await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(5) > a > span.menu_icon > i', { timeout: 40000 });
  
     // Click on the notification button using page.evaluate()
     await page.evaluate(() => {
       document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(5) > a > span.menu_icon > i').click();
     });
  
     count_notification+=50;
     addToReport('notification', 'notification button clicked successfully:  ', count_notification);
     console.log("percentages of passing notification:", count_notification);
    
  
  
     addToReport('notification', 'the total percentage of notification module:  ', count_notification);
     
     page.waitForNavigation({ timeout: 50000 });
     console.log('notification option clicked and next page is loaded.');
     await page.evaluate(() => {
      return new Promise(resolve => setTimeout(resolve, 5000));
    });
     
   } 
   

   catch (error) {
     console.error('Error: Unsuccessful login or navigation:', error);
     await browser.close();
   } 
   finally{
    await browser.close();
   }
  });
  
  
  app.post('/timetable', async function (req, res) {
    const { email, password } = req.body;
    const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode

    try {
    const page = await browser.newPage();
      // Navigate to the target application
      await page.goto('https://horizon.ucp.edu.pk/web/login');
  
          // Click on the button to login with Microsoft account
          await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');
  
          // Wait for the login page to load
          await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear
  
          // Fill in email and click next
          await page.type('#i0116', email);
          await Promise.all([
              page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
              page.click('#idSIButton9'), // Click on the next button
            ]);
            await page.waitForNavigation();
          // Wait for the password input field to appear
          await page.waitForSelector('#i0118', { timeout: 70000 });
  
          console.log(password);
          // Fill in the password
          await page.type('#i0118', password);
  
          // Click on the login button
  
          await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
  //after this step...
  try {
      // Click on the login button and wait for navigation
      await Promise.all([
        
          page.click('#idSIButton9'),
      ]);
  } catch (error) {
      console.error('Error clicking login button:', error);
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
       
  // Handle "Stay signed in" prompt by clicking on "Yes" button
  await Promise.all([
      page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
      page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
    ]);
  
    // Check if the login was successful by waiting for a specific element on the dashboard page
    await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login
  
    console.log('Login successful!');
      let count_timetable=0;
      addToReport('timetable', 'login successfully:  ', count_timetable);
     // Wait for the three horizontal lines menu button to appear
     await page.waitForSelector('#sidebar_main_toggle', { timeout: 80000 });
      
    
     await page.evaluate(() => {
       return new Promise(resolve => setTimeout(resolve, 6000));
     });
  // Click on the three horizontal lines menu button
  await page.click('#sidebar_main_toggle');
      
     // Wait for the timetable button to appear
     await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(8) > a > span.menu_icon', { timeout: 90000 });
console.log("button found");
// Click on the timetable button using page.evaluate()
await page.evaluate(() => {

  
  
  document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(8) > a > span.menu_icon').click();
});

console.log("button clciked");
    // await page.waitForNavigation();
  
     console.log('timetable option clicked.');
  
     count_timetable+=50;
     addToReport('timetable', 'time table button clicked successfully:  ', count_timetable);
     console.log("percentages of passing timetable:", count_timetable);
     page.waitForNavigation({ timeout:100000 });
     console.log("button navigated");
    
      await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 90000 });
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 6000));
      });
      
   
      count_timetable+=50;
     addToReport('timetable', 'the Total percentage of timetable module:  ', count_timetable);
  
     
   } 
   
   
   
   catch (error) {
     console.error('Error: Unsuccessful login or navigation:', error);
     await browser.close();
   }
   finally{
    await browser.close();
   }
  });
  
  
  app.post('/exam', async function (req, res) {
      const { email, password } = req.body;
      const browser = await puppeteer.launch({ headless: false }); // Launch the browser in headful mode

      try {
      const page = await browser.newPage();
        // Navigate to the target application
        await page.goto('https://horizon.ucp.edu.pk/web/login');
    
            // Click on the button to login with Microsoft account
            await page.click('body > div > div > div.col-md-6.short_image > div:nth-child(2) > form > div.container.text-center > a');
    
            // Wait for the login page to load
            await page.waitForSelector('#i0116', { timeout: 70000 }); // Set a timeout of 30 seconds for selector to appear
    
            // Fill in email and click next
            await page.type('#i0116', email);
            await Promise.all([
                page.waitForNavigation({ timeout: 100000 }), // Wait for navigation to complete with a timeout of 30 seconds
                page.click('#idSIButton9'), // Click on the next button
              ]);
              await page.waitForNavigation();
            // Wait for the password input field to appear
            await page.waitForSelector('#i0118', { timeout: 70000 });
    
            console.log(password);
            // Fill in the password
            await page.type('#i0118', password);
    
            // Click on the login button
    
            await page.waitForSelector('#idSIButton9' , { timeout: 70000 });
    //after this step...
    try {
        // Click on the login button and wait for navigation
        await Promise.all([
          
            page.click('#idSIButton9'),
        ]);
    } catch (error) {
        console.error('Error clicking login button:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
         
    // Handle "Stay signed in" prompt by clicking on "Yes" button
    await Promise.all([
        page.waitForNavigation({ timeout: 70000 }), // Wait for navigation to complete with a timeout of 30 seconds
        page.click('#idSIButton9'), // Click on the "Yes" button to stay signed in
      ]);
    
      // Check if the login was successful by waiting for a specific element on the dashboard page
      await page.waitForSelector('#breadcrumbs > li:nth-child(2) > a', { timeout: 70000 }); // Replace 'body.dashboard' with the selector of an element that appears only after successful login
    
      console.log('Login successful!');
        
     
      let count_exam=0;
      addToReport('exam', 'login successfully:  ', count_exam);
       // Wait for the three horizontal lines menu button to appear
      await page.waitForSelector('#sidebar_main_toggle', { timeout: 50000 });
      
      // Click on the three horizontal lines menu button
      await page.click('#sidebar_main_toggle');
      
      count_exam+=5;
      addToReport('exam', 'three horizontal lines menu button clicked successfully:  ', count_exam);
      console.log("percentages of passing exam:", count_exam);
     
  
      // Introduce a delay of 2 seconds to allow the menu to appear
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 4000));
      });
  
      // Wait for the Result button to appear
      await page.waitForSelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(4) > a > span.menu_icon > i', { timeout: 30000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#sidebar_main > div > div.scrollbar-inner.scroll-content > div.menu_section > ul > li:nth-child(4) > a > span.menu_icon > i').click();
      });
  
      // Wait for navigation to complete
      await page.waitForNavigation({ timeout: 30000 });
  
      console.log('Navigated to the Result page.');
  
      count_exam+=5;
  
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'result button clicked successfully:  ', count_exam);
      await page.evaluate(() => {
        document.querySelector('#lms_enable > h6').click();
      });
  
      await page.waitForNavigation({ timeout: 30000 });
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 4000));
      });
  
      console.log('Navigated to the first active class.');
  
      await page.goBack();
  
     
      console.log('returning from first active class.');
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'first active class button clicked successfully:  ', count_exam);
  
      await page.evaluate(() => {
        document.querySelector('#lms_enable > h6 > span:nth-child(3)').click();
      });
  
      await page.waitForNavigation({ timeout: 30000 });
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 5000));
      });
  
      console.log('Navigated to the second active class.');
  
      await page.goBack();
  
     
      console.log('returning from second active class.');
  
      count_exam+=5;
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'second active class button clicked successfully:  ', count_exam);
  
      //enter third class
  
  
      await page.evaluate(() => {
        document.querySelector('#lms_enable > h6 > span.sub-heading.md-color-white').click();
      });
  
      await page.waitForNavigation({ timeout: 30000 });
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 5000));
      });
  
      console.log('Navigated to the third active class.');
  
      await page.goBack();
  
     
      console.log('returning from third active class.');
  
  
      count_exam+=5;
  
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'third active class button clicked successfully:  ', count_exam);
  
      //enter fourth active class
  
      await page.evaluate(() => {
        document.querySelector('#lms_enable > h6').click();
      });
  
      await page.waitForNavigation({ timeout: 30000 });
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 5000));
      });
  
      console.log('Navigated to the fourth active class.');
  
      await page.goBack();
  
     
      console.log('returning from fourth active class.');
  
  
      count_exam+=5;
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'fourth active class button clicked successfully:  ', count_exam);
  
      //enter fifth active class
      await page.evaluate(() => {
        document.querySelector('#lms_enable > h6').click();
      });
  
      await page.waitForNavigation({ timeout: 30000 });
      await page.evaluate(() => {
        return new Promise(resolve => setTimeout(resolve, 5000));
      });
  
      console.log('Navigated to the fifth active class.');
  
      await page.goBack();
  
     
      console.log('returning from fifth active class.');
  
  
      count_exam+=5;
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'fifth active class button clicked successfully:  ', count_exam);
  
  
      await page.click('#page_content_inner > div > div > div > div > div > ul.uk-tab > li:nth-child(2) > a');
  
  console.log('Previous courses button clicked.');
      //console.log('Navigated to the Profile page.');
  count_exam+=5;
  
  console.log("percentages of passing exam:", count_exam); 
  addToReport('exam', 'previous courses button clicked successfully:  ', count_exam);
  
  
  await page.waitForSelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li:nth-child(2) > a', { timeout: 50000 });
  
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').click();
      });
  count_exam+=5;
  
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Fall2020 button clicked.');
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'fall2020 button clicked successfully:  ', count_exam);
  
  // sprig 2021
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(9) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(9) > td:nth-child(1) > a').click();
      });
  
      count_exam+=5;
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Spring2021 button clicked.');
  
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'sprind2021 button clicked successfully:  ', count_exam);
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(18) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(18) > td:nth-child(1) > a').click();
      });
  
  
      count_exam+=5;
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Fall2021 button clicked.');
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'fall2021 button clicked successfully:  ', count_exam);
  
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(27) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(27) > td:nth-child(1) > a').click();
      });
  
      
      
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Spring2022 button clicked.');
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'spring2022 button clicked successfully:  ', count_exam);
  
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(36) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(36) > td:nth-child(1) > a').click();
      });
  
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Fall2022 button clicked.');
  
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'fall2022 button clicked successfully:  ', count_exam);
  
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(44) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(44) > td:nth-child(1) > a').click();
      });
  
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Spring2023 button clicked.');
  
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'spring2023 button clicked successfully:  ', count_exam);
  
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(54) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(54) > td:nth-child(1) > a').click();
      });
  
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Summer2023 button clicked.');
  
  
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'summer2023 button clicked successfully:  ', count_exam);
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(57) > td:nth-child(1) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > table > tbody > tr:nth-child(57) > td:nth-child(1) > a').click();
      });
  
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Fall2023 button clicked.');
  
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'fall2023 button clicked successfully:  ', count_exam);
  
  await page.waitForSelector('#tabs_anim1 > li.uk-active > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > a').click();
      });
  
  
      
      count_exam+=5;
      console.log("percentages of passing exam:", count_exam);
      
  
      // Wait for navigation to complete
     // await page.waitForNavigation({ timeout: 50000 });
  console.log('Download Transcript button clicked.');
  
  
  count_exam+=5;
  console.log("percentages of passing exam:", count_exam);
  addToReport('exam', 'download transcript button clicked successfully:  ', count_exam);
  
  await page.waitForSelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li:nth-child(3) > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#page_content_inner > div > div > div > div > div > ul.uk-tab > li:nth-child(3) > a').click();
      });
  
      // Wait for navigation to complete
    
  console.log('OBE report button clicked.');
  
      count_exam+=5;
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'OBE report button clicked successfully:  ', count_exam);
  await page.waitForSelector('#tabs_anim1 > li.uk-active > div > a', { timeout: 50000 });
  
      // Click on the Result button using page.evaluate()
      await page.evaluate(() => {
        document.querySelector('#tabs_anim1 > li.uk-active > div > a').click();
      });
  
      // Wait for navigation to complete
     
  console.log('OBE report Transcript button clicked.');
     
      count_exam+=5;
      console.log("percentages of passing exam:", count_exam);
      addToReport('exam', 'OBE report Transcript button clicked successfully:  ', count_exam);

      addToReport('exam', 'the total percentage of result and exam module:  ', count_exam);
  
    } catch (error) {
      console.error('Error: Unsuccessful login or navigation:', error);
      await browser.close();
    }
    finally{
      await browser.close();

    }
    });






    app.get('/generate-pdf', async (req, res) => {
      try {
          console.log('Received request to generate PDF');
  
          // Render the report.ejs template to HTML
          const html = await ejs.renderFile(path.join(__dirname, 'views', 'report.ejs'), { moduleReports });
          console.log('Rendered HTML:', html);
  
          // Launch Puppeteer with necessary options
          const browser = await puppeteer.launch({
              headless: true,
              args: ['--no-sandbox', '--disable-setuid-sandbox']
          });
          console.log('Launched Puppeteer');
          
          const page = await browser.newPage();
          await page.setContent(html);
          console.log('Set page content');
  
          const pdfBuffer = await page.pdf({ format: 'A4' });
          console.log('Generated PDF buffer');
  
          await browser.close();
          console.log('Closed Puppeteer');
  
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
          res.send(pdfBuffer);
          console.log('Sent PDF response');
  
      } catch (error) {
          console.error('Error generating PDF:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  });
  
  

  
  // Display report.ejs on the webpage
  app.get('/report', (req, res) => {
      try {
          res.render('report', { moduleReports });
      } catch (error) {
          console.error('Error rendering report.ejs:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  });
  
  // Start the server

  function generateFailedTestCasesReport(workbook, moduleNames) {
    const sheetNames = workbook.SheetNames.filter(name => name !== 'MasterSheet');

    let reportHTML = '';

    // If "all" is specified, use all sheet names including "Attendance"
    const selectedSheets = moduleNames.includes('all') ? sheetNames : moduleNames;

    selectedSheets.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        reportHTML += `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Failed Test Cases Report - ${sheetName}</title>
                <style>
                    .failed-test-case {
                        margin-bottom: 20px;
                    }
                    .objective {
                        font-weight: bold;
                        color: red;
                        font-size:30px;
                    }
                </style>
            </head>
            <body>
            <br><br>
                <h1>Failed Test Cases Report - ${sheetName}</h1>`;

        let noError = true;

        for (let i = 5; i < data.length; i++) {
            const row = data[i];
            const statusColumnIndex = 8; // Default to 8

            if (row[statusColumnIndex] && row[statusColumnIndex].toLowerCase() === 'fail') {
                const objective = row[2];
                noError = false;

                reportHTML += `
                    <div class="failed-test-case">
                        <p class="objective">${objective}</p>
                    </div>`;
            }
        }

        if (noError) {
            reportHTML += `
                    <div class="failed-test-case">
                        <p class="objective">No failed test cases</p>
                    </div>`;
        }

        reportHTML += `
            </body>
            </html>`;
    });

    return reportHTML;
}

app.post('/generate_report', (req, res) => {
    const moduleNames = req.body.moduleNames;

    // Read data from the Excel file
    const workbook = XLSX.readFile('C:/Users/Dell/Desktop/ManualtestCases.xlsx');
    const masterSheet = workbook.Sheets['MasterSheet'];
    const masterData = XLSX.utils.sheet_to_json(masterSheet, { header: 1 });

    // Filter data based on module names
    const filteredData = moduleNames.includes('all')
        ? masterData
        : masterData.filter(row => moduleNames.includes(row[1]));

    // Generate percentage circles report
    const reportHTML = generatePercentageCirclesReport(workbook, filteredData, moduleNames);

    // Generate failed test cases report
    const failedTestCasesHTML = generateFailedTestCasesReport(workbook, moduleNames);

    // Combine both reports
    const combinedHTML = `
        ${reportHTML}
        ${failedTestCasesHTML}
    `;

    // Calculate the total combined percentage
    const totalPercentage = calculateTotalPercentage(workbook, filteredData, moduleNames);
    if (totalPercentage > 100) {
        res.status(400).send('Total working percentage exceeds 100%. Please adjust your test cases.');
        return;
    }

    // Convert the combined HTML to PDF
    const options = { format: 'Letter' };

    pdf.create(combinedHTML, options).toBuffer((err, buffer) => {
        if (err) {
            console.error('Error generating PDF:', err);
            res.status(500).send('Error generating PDF');
            return;
        }

        // Set appropriate headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');

        // Send the PDF buffer as the response
        res.send(buffer);
    });
});

function calculateTotalPercentage(workbook, filteredData, moduleNames) {
    let totalPassedTestCases = 0;
    let totalTestCases = 0;

    const sheetNames = workbook.SheetNames.filter(name => name !== 'MasterSheet');
    const selectedSheets = moduleNames.includes('all') ? sheetNames : moduleNames;

    selectedSheets.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const moduleName = sheetName;
        const totalCases = data.length - 6; // Assuming first 5 rows are headers or metadata

        let passedCases = 0;
        if (moduleName === 'attendence') {
            passedCases = data.slice(5).filter(row => row[7] && row[7].toLowerCase() === 'pass').length;
        } else {
            passedCases = data.slice(5).filter(row => row[8] && row[8].toLowerCase() === 'pass').length;
        }

        totalPassedTestCases += passedCases;
        totalTestCases += totalCases;
    });

    return totalTestCases > 0 ? (totalPassedTestCases / totalTestCases) * 100 : 0;
}



function generatePercentageCirclesReport(workbook, filteredData, moduleNames) {
    let totalPassedTestCases = 0;
    let totalTestCases = 0;

    let reportHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Case Report</title>
            <style>
            .progress-container {
                margin-top: 20px;
                margin: 30px;
            }
            
            .progress-bar {
                width: 100%; /* Adjust the width of the progress bar */
                height: 60px; /* Adjust the height of the progress bar */
                background-color: #f0f0f0;
                border: 2px solid grey; /* Add border for the progress bar */
                border-radius: 10px; /* Add border radius for rounded corners */
                margin-bottom: 45px; /* Add margin bottom to create space between progress bars */
                position: relative;
            }
            
            .inner-bar {
                height: 100%;
                background-color: #4CAF50; /* Set color of the inner progress bar */
                border-radius: 5px; /* Add border radius for rounded corners */
            }
            
            .percentage {
                font-size: 16px;
                font-weight: bold;
                color: black;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: 0;
            }
            
            .module-name {
                font-size: 35px;
                color: black;
                position: absolute;
                left: 10px;
                transform: translateY(-50%);
                margin: 0;
                white-space: nowrap;
            }
            </style>
        </head>
        <body>
            <div class="percentage-circles-report">
                <h1>Percentage of working test cases</h1>
    `;

    const sheetNames = workbook.SheetNames.filter(name => name !== 'MasterSheet');
    const selectedSheets = moduleNames.includes('all') ? sheetNames : moduleNames;

    selectedSheets.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(`Processing sheet: ${sheetName}`);
        console.log(data);  // Log data to verify its content

        const moduleName = sheetName;
        const totalCases = data.length - 6; // Assuming first 5 rows are headers or metadata

        let passedCases = 0;
        if (moduleName === 'attendence') { // Adjust the module name
            // For the attendance module, count passed cases based on the status column
            passedCases = data.slice(5).filter(row => row[7] && row[7].toLowerCase() === 'pass').length; // Adjust the column index
        } else {
            // For other modules, count the rows where the status is 'pass'
            passedCases = data.slice(5).filter(row => row[8] && row[8].toLowerCase() === 'pass').length;
        }

        console.log(`Module: ${moduleName}, Total Cases: ${totalCases}, Passed Cases: ${passedCases}`);

        const percentage = totalCases > 0 ? (passedCases / totalCases) * 100 : 0;
        const color = getColor(percentage);

        totalPassedTestCases += passedCases;
        totalTestCases += totalCases;

        reportHTML += `
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="inner-bar" style="width: ${percentage}%; background-color: ${color};"></div>
                    <div class="percentage">${percentage.toFixed(2)}%</div>
                    <div class="module-name">${moduleName}</div>
                </div>
            </div>`;
    });

    const combinedPercentage = totalTestCases > 0 ? (totalPassedTestCases / totalTestCases) * 100 : 0;

    // Display combined percentage in a stunning manner
    reportHTML += `
        <div class="combined-percentage">
            <p style="font-size: 30px; text-align: center;">Total Combined Percentage</p>
            <div class="progress-bar">
                <div class="inner-bar" style="width: ${combinedPercentage}%; background-color: ${getColor(combinedPercentage)};"></div>
                <div class="percentage">${combinedPercentage.toFixed(2)}%</div>
            </div>
        </div>
    </div>
    </body>
    </html>`;

    return reportHTML;
}



function getColor(percentage) {
    if (percentage >= 90) {
        return 'green';
    } else if (percentage >= 70) {
        return 'yellow';
    } else {
        return 'red';
    }
}








  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));