/* eslint-disable no-unused-vars */
const portfinder = require('portfinder')
/* eslint-ensable no-unused-vars */
const puppeteer = require('puppeteer')

const app = require('../../express.ts')
console.log('app', app)
let server = null
let port = null

beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen()
})
afterEach(async () => {
    server.close()
})

test('home page links to about page', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]')
    ])
    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})
