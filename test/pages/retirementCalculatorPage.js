const BasePage = require('./basePage');
const testData = require('../testDataManagement/testData.json'); 

class RetirementCalculatorPage extends BasePage {
    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get currentAnnualIncomeInput() { return $("//input[@id = 'current-income']");} 
    get spouseAnnualIncomeInput() { return $("//input[@id = 'spouse-income']");}
    get currentRetirementSavingsInput() { return $('#current-total-savings');}
    get annualSavingsInput() { return $('#current-annual-savings');}
    get savingRateInput() { return $('#savings-increase-rate');}
    get socialBenefitsYesInput() { return $("//label[@for='yes-social-benefits']");}
    get socialBenefitsNoInput() { return $("//label[@for='no-social-benefits']");}
    get calculatorBtnInput() { return $("//button[@data-tag-id='submit']");}
    get resultMessage() { return $('#result-message'); }
    get alertMessage() { return $('#calculator-input-alert-desc'); }
    get ageErrorMessage() { return $('#invalid-retirement-age-error'); }
    get maritalStatus() { return $("//label[@for='married']");}
    get maritalStatusSingle() { return $("//label[@for='single']");}
    get socialSecurity() { return $('#social-security-override'); }
    get defaultValue() { return $("//a[contains(text(), 'Adjust default values')]");}
    get addIncome() { return $("//input[@id='additional-income']"); }
    get retirementDuration() { return $("//input[@id='retirement-duration']"); }
    get inflationCheckbox() { return $("//label[@for='include-inflation']"); }
    get inflationCheckbox1() { return $("//label[@for='exclude-inflation']"); }
    get expectedInflation() { return $("//input[@id='expected-inflation-rate']"); }
    get retirementIncome() { return $("//input[@id='retirement-annual-income']"); }
    get preRetirementIncome() { return $("//input[@id='pre-retirement-roi']"); }
    get postRetirementIncome() { return $("//input[@id='post-retirement-roi']"); }
    get saveButton() { return $("//button[contains(text(), 'Save changes')]"); }

    // Method to fill out the main form on the retirement calculator page.
    // It inputs data for age, income, savings, contribution rates, and toggles options for social benefits and marital status.

    async fillForm(data) {
        await this.enterValue(this.currentAgeInput, data.current_age);
        await this.enterValue(this.retirementAgeInput, data.retirement_age);
        await this.enterValue(this.currentAnnualIncomeInput, data.current_annual_income);
        await this.enterValue(this.spouseAnnualIncomeInput, data.spouse_annual_income);
        await this.enterValue(this.currentRetirementSavingsInput, data.current_retirement_savings);
        await this.enterValue(this.annualSavingsInput, data.current_retirement_contribution);
        await this.enterValue(this.savingRateInput, data.annual_retirement_contribution_increase); 
        await this.toggleOption(this.socialBenefitsYesInput, this.socialBenefitsNoInput, data.social_security_income);
        await this.toggleOption(this.maritalStatus, this.maritalStatusSingle, data.relationship_status);
    }

    // Method to handle default values and save changes.
    // It clicks the 'Default Values' button, fills out additional fields, and saves the changes.

    async handleDefaultsAndSave(data) {
        await this.clickButton(this.defaultValue);
        await this.enterValue(this.addIncome, data.additional_other_income); 
        await this.enterValue(this.retirementDuration, data.number_of_years_retirement_needs_to_last); 
        await this.toggleOption(this.inflationCheckbox, this.inflationCheckbox1, data.post_retirement_income_increase_with_inflation);
        await this.enterValue(this.expectedInflation, data.expected_inflation_rate);   
        await this.enterValue(this.retirementIncome, data.percent_of_final_annual_income_desired);  
        await this.enterValue(this.preRetirementIncome, data.pre_retirement_investment_return);  
        await this.enterValue(this.postRetirementIncome, data.post_retirement_investment_return);  
        await this.clickButton(this.saveButton);
    }

    // Method to click the calculator button to submit the form.

    async clickCalculatorBtn() {
        await this.clickButton(this.calculatorBtnInput);
    }
    
}


module.exports = RetirementCalculatorPage;
