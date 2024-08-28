const fs = require('fs');
const path = require('path');

class Utils {

     // Logs an informational message to the console and saves it to a log file.
    static logInfo(message) {
        const logMessage = `[INFO] ${new Date().toISOString()}: ${message}`;
        console.log(logMessage);
        Utils.writeLogToFile(logMessage);
    }

     // Logs an error message to the console and saves it to a log file.
    static logError(message) {
        const logMessage = `[ERROR] ${new Date().toISOString()}: ${message}`;
        console.error(logMessage);
        Utils.writeLogToFile(logMessage);
    }

    // Captures a screenshot and saves it to the 'screenshots' directory.
    // Logs the path where the screenshot is saved or an error if the screenshot fails.

    static captureScreenshot(filename) {
    try {
        const screenshotsDir = path.resolve(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }
        const screenshotPath = path.join(screenshotsDir, `${filename}.png`);
        browser.saveScreenshot(screenshotPath);
        Utils.logInfo(`Screenshot saved to: ${screenshotPath}`);
    }catch (error) {
        Utils.logError(`Failed to capture screenshot: ${error.message}`);
    }
}
 
    // Writes a log message to the 'test.log' file in the 'logs' directory.

    static writeLogToFile(message) {
        const logFilePath = path.resolve(__dirname, '../logs/test.log');
        try {
               fs.appendFile(logFilePath, `${message}\n`);
            } catch (err) {
                console.error(`[ERROR] Failed to write log to file: ${err.message}`);
            }
    }


    // Handles exceptions by logging the error message and capturing a screenshot.
    // Throws the error after logging and capturing the screenshot.

    static handleException(error, context = 'Unknown Context') {
        Utils.logError(`Exception in ${context}: ${error.message}`);
        Utils.captureScreenshot(`error_${new Date().toISOString().replace(/:/g, '-')}`);
        throw error;  
    }
}

Utils.logInfo('This is a test info log.');
Utils.logError('This is a test error log.');

module.exports = Utils;
    