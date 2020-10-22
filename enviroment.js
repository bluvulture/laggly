import puppeteer from 'puppeteer';

export const browser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  return browser;
};
