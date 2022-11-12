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

describe("the index.js file", () => {
  it("should define a string variable named firstName", async () => {
    const firstName = await page.evaluate(() => firstName);
    expect(firstName).toBeDefined();
  });

  it("should define a string variable named jobTitle", async () => {
    const jobTitle = await page.evaluate(() => jobTitle);
    expect(jobTitle).toBeDefined();
  });

  it("should define a string variable named city", async () => {
    const city = await page.evaluate(() => city);
    expect(city).toBeDefined();
  });

  it("should define a string template named newJobPost that contains firstName", async () => {
    const newJobPost = await page.evaluate(() => newJobPost);
    const firstName = await page.evaluate(() => firstName);
    expect(newJobPost).toContain(firstName);
  });

  it("should define a string template named newJobPost that contains jobTitle", async () => {
    const newJobPost = await page.evaluate(() => newJobPost);
    const jobTitle = await page.evaluate(() => jobTitle);
    expect(newJobPost).toContain(jobTitle);
  });

  it("should define a string template named newJobPost that contains city", async () => {
    const newJobPost = await page.evaluate(() => newJobPost);
    const city = await page.evaluate(() => city);
    expect(newJobPost).toContain(city);
  });

  it("should assign the innerHTML of the HTML element with the id result to the newJobPost", async () => {
    const newJobPost = await page.evaluate(() => newJobPost);
    const innerHtml = await page.$eval("#result", (result) => {
      return result.innerHTML.trim();
    });
    expect(innerHtml).toBe(newJobPost);
  });
});
