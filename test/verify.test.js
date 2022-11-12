const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should define a string variable named introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    expect(introduction).toBeDefined();
  });
  
  it('should include a new line within introduction should include a tab within introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    expect(introduction).toContain('\n')
  });
  
  it('should include a tab within introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    expect(introduction).toContain('\t')
  });
  
  it('should include a single quote within introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    expect(introduction).toContain('\'')
  });
  
  it('should include a double quote within introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    expect(introduction).toContain('\"')
  });
  
  it('should include a backslash within introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    expect(introduction).toContain('\\')
  });
  
  it('should assign the innerHTML of the HTML element with the id result to the introduction', async () => {
    const introduction = await page.evaluate(() => introduction);
    const innerHtml = await page.$eval("#result", (result) => {
      return result.innerHTML;
    });
    
    expect(innerHtml).toBe(introduction);
  });
});