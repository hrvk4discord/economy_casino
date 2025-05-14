const chalk = require('chalk');
const dayjs = require('dayjs');

module.exports = {
    info(msg) {
        console.log(`${chalk.blue('[INFO]')} ${dayjs().format('HH:mm:ss')} - ${msg}`);
    },

    warn(msg) {
        console.warn(`${chalk.yellow('[WARN]')} ${dayjs().format('HH:mm:ss')} - ${msg}`);
    },

    error(msg) {
        console.error(`${chalk.red('[ERROR]')} ${dayjs().format('HH:mm:ss')} - ${msg}`);
    },

    success(msg) {
        console.log(`${chalk.green('[SUCCESS]')} ${dayjs().format('HH:mm:ss')} - ${msg}`);
    }
};
