class BasePage {

     // Method to enter a value into an input field.
     // It waits for the input field to be displayed, clears any existing value, 
     // focuses the input field by clicking on it, and then sets the specified value.
     
     async enterValue(inputField, value) {
    try {
        await inputField.waitForDisplayed({ timeout: 5000 });
        await inputField.clearValue(); 
        await inputField.click();
        await inputField.setValue(value);    
    } catch (error) {
        console.error(`Error entering value: ${error.message}`);
        throw error;
    }
    }

    // Method to toggle a 'yes' or 'no' option based on the provided toggle value.
    // It clicks the appropriate option based on whether the value is 'yes' or 'no'.

    async toggleOption(yesOptionSelector, noOptionSelector, toggleValue) {
        try {
            if (toggleValue) {
                const lowerCaseToggleValue = toggleValue.toLowerCase();
                if (lowerCaseToggleValue === 'yes') {
                    await yesOptionSelector.waitForClickable({ timeout: 5000 });
                    await yesOptionSelector.click();
                } else if (lowerCaseToggleValue === 'no') {
                    await noOptionSelector.waitForClickable({ timeout: 5000 });
                    await noOptionSelector.click();
                } else {
                    console.warn(`Unrecognized toggle value: ${toggleValue}`);
                }
            } else {
                console.warn('Toggle value is undefined or null.');
            }
        } catch (error) {
            console.error(`Error toggling option: ${error.message}`);
            throw error;
        }
    }

    // Method to click on a button or element.
    // It waits for the element to be displayed and clickable, moves the mouse over it, and clicks.

    async clickButton(locator) {
    try {
        await locator.waitForDisplayed({ timeout: 5000 });
        await locator.waitForClickable({ timeout: 5000 });
        await locator.moveTo();
        await locator.click();
    } catch (error) {
        console.error(`Error clicking button: ${error.message}`);
        throw error;
    }
    }

    // Method to retrieve the text from an element.
    // It waits for the element to be displayed and then returns its text content.

    async getText(element) {
    try {
        await element.waitForDisplayed({ timeout: 5000 });
        return await element.getText();
    }catch (error) {
        console.error(`Error getting text: ${error.message}`);
        throw error;
    }    
    }

    // Method to verify that an element contains the expected message.
    // It waits for the element to be visible, retrieves its text, and checks if it contains the expected message.
    // If the message does not match, it uses the provided error message for the assertion.

    async verifyMessage(element, expectedMessage, errorMessage) {
        try {
            await element.waitForDisplayed({ timeout: 5000 }); 
            const message = await element.getText();
            expect(message).toContain(expectedMessage, errorMessage);
        } catch (error) {
            console.error(`Error verifying message: ${error.message}`);
            throw error;
        }
    }
    
    
}

module.exports = BasePage;
