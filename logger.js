
import dateFormat from 'dateformat';
import { loginData, selectors } from './constants.js';
import { browser } from './enviroment.js';

export const logJiraIssue = async (issues) => {
  console.log('New logger instance starting...');

  const newBrowser = await browser();
  const page = await newBrowser.newPage();

  try {
    await page.goto(selectors.hostUrl, { waitUntil: 'load', timeout: 0 });

    await page.waitForSelector(selectors.loginUsername);

    await page.focus(selectors.loginUsername);
    await page.keyboard.type(loginData.username, { delay: 10 }); // Delay needed for realistic typing action

    await page.focus(selectors.loginPassword);
    await page.keyboard.type(loginData.password, { delay: 10 });

    await page.click(selectors.loginButton);
    await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });
  } catch (error) {
    console.error('Error while trying to login ->', error);
    return;
  }

  for (let issue of issues) {
    let { key, date, duration, log } = issue;

    try {
      await page.goto(`${selectors.browseUrl}${key}`, { waitUntil: 'load', timeout: 0 });

      const param = selectors.issueLogWork;

      await page.evaluate((param) => {
        document.querySelector(param).click();
      }, param);

      await page.waitForSelector(selectors.modalLog);

      await page.waitForSelector(selectors.timeBox);
      await page.focus(selectors.timeBox);
      await page.keyboard.type(duration, { delay: 10 });

      await page.focus(selectors.dateBox);
      await page.click(selectors.dateBox, { clickCount: 3 });
      await page.keyboard.type(`${dateFormat(date, 'dd/mmm/yy')} 10:00 AM`, { delay: 50 }); 

      await page.waitForSelector(selectors.textBox);
      await page.focus(selectors.textBox);
      await page.type(selectors.textBox, log, { delay: 30 });

      await page.click(selectors.saveModalLog);

      await page.waitForSelector(selectors.success);

      console.log('Logged ', duration, ' time on ', key);
    } catch (error) {
      console.error('Error while trying to log time on issue ->', key, error);
      return;
    }
  }

  await newBrowser.close();
};
