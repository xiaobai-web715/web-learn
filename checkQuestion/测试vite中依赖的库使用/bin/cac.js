#!/usr/bin/env node
console.log("我开始执行了")
const cac = require('cac');

const cli = cac();

cli.command('start', 'Start the app').option('--mode <mode>', 'The start mode').action((options) => {
    console.log('Starting the app...', options);
})

cli.command('build', 'Build the app').option('--mode <mode>', 'The build mode').action((options) => {
    console.log('Building the app...', options);
})

cli.parse();