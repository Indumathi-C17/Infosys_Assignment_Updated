    const RetirementCalculatorPage = require('../pages/retirementCalculatorPage');
    const utils = require('../utils/testUtils'); 
    const testData = require('../testDataManagement/testData.json'); 

    describe('Retirement Calculator Tests', () => {
        let retirementPage;

        beforeEach(async () => {
            retirementPage = new RetirementCalculatorPage();
            await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
            await browser.maximizeWindow();  
        });
        
        it('should fill the retirement Calculator Form with all required fields (valid data)', async () => {
            await retirementPage.fillForm(testData.validData);  
            await retirementPage.clickCalculatorBtn();
            await retirementPage.verifyMessage(retirementPage.resultMessage, 'Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.'); 
        });

        it('should update default values and verify changes on the Retirement Calculator Form', async () => {
            await retirementPage.fillForm(testData.validDefaultValues);
            await retirementPage.handleDefaultsAndSave(testData.validDefaultValues);
            await retirementPage.clickCalculatorBtn();
            await retirementPage.verifyMessage(retirementPage.resultMessage, 'Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.');
        });

        it('should fill the retirement Calculator Form with invalid data inputs (non-numeric)', async () => {
            await retirementPage.fillForm(testData.invalidData);  
            await retirementPage.clickCalculatorBtn();  
            await retirementPage.verifyMessage(retirementPage.alertMessage, 'Please fill out all required fields');
            
        });

        it('should show an error message for age greater than 100', async () => {
            await retirementPage.fillForm(testData.invalidAge);
            await retirementPage.clickCalculatorBtn();
            await retirementPage.verifyMessage(retirementPage.ageErrorMessage, 'Planned retirement age must be greater than current age');
        });
        


    });

