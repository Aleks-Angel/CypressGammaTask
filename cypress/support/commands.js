/// <reference types="cypress" />

import { commandsPage } from "../e2e/pages/commandsPage";
import { loginPage } from "../e2e/pages/loginPage";



Cypress.Commands.add("fillLoginForm", (userCredentials) => {
    const { email, password } = userCredentials

    commandsPage.loginFormHeader()
        .should("be.visible")
        .and("contain.text", "Login to your account");

    commandsPage.loginEmailInput().type(email);
    commandsPage.loginPasswordInput().type(password);
    commandsPage.loginButton().click();
})



Cypress.Commands.add("fillSignupForm", (userCredentials) => {
    const { name, email } = userCredentials

    commandsPage.signupFormHeader()
        .should("be.visible")
        .and("contain.text", "New User Signup!");

    commandsPage.signupNameInput().type(name);
    commandsPage.signupEmailInput().type(email);
    commandsPage.signupButton().click();
})



Cypress.Commands.add("fillAccountInformationForm", (userCredentials) => {

    commandsPage.accountInfoHeader().should("be.visible");

    commandsPage.genderMaleRadio().click();
    commandsPage.accountPasswordInput().type(userCredentials.password);

    commandsPage.daysSelect().select(userCredentials.days);
    commandsPage.monthsSelect().select(userCredentials.months);
    commandsPage.yearsSelect().select(userCredentials.years);

    commandsPage.newsletterCheckbox().click();
    commandsPage.optinCheckbox().click();

    commandsPage.firstNameInput().type(userCredentials.firstName);
    commandsPage.lastNameInput().type(userCredentials.lastName);

    commandsPage.companyInput().type(userCredentials.company);
    commandsPage.addressInput().type(userCredentials.address);

    commandsPage.countrySelect().select(userCredentials.country);
    commandsPage.stateInput().type(userCredentials.state);
    commandsPage.cityInput().type(userCredentials.city);
    commandsPage.zipcodeInput().type(userCredentials.zipcode);

    commandsPage.mobileNumberInput().type(userCredentials.mobile);

    commandsPage.createAccountButton().click();
})



Cypress.Commands.add("signupUser", (userCredentials) => {

    loginPage.signupLoginTab().click();
    cy.fillSignupForm(userCredentials)
    cy.fillAccountInformationForm(userCredentials)

    commandsPage.accountCreatedMsg()
        .should("be.visible")
        .and("contain.text", "Account Created!");

    commandsPage.continueButton().click();
})



Cypress.Commands.add("registerUserWithAPI", (userCredentials) => {
    return cy.request({
        method: "POST",
        url: "https://automationexercise.com/api/createAccount",
        failOnStatusCode: false,
        form: true,
        body: {
            name: userCredentials.name,
            email: userCredentials.email,
            password: userCredentials.password,

            birth_date: userCredentials.days,
            birth_month: userCredentials.months,
            birth_year: userCredentials.years,

            firstname: userCredentials.firstName,
            lastname: userCredentials.lastName,

            company: userCredentials.company,
            address1: userCredentials.address,

            country: userCredentials.country,
            state: userCredentials.state,
            city: userCredentials.city,
            zipcode: userCredentials.zipcode,

            mobile_number: userCredentials.mobile,
        },
    })
})



Cypress.Commands.add("deleteUserWithAPI", (userCredentials) => {
    const { email, password } = userCredentials
    return cy.request({
        method: "DELETE",
        url: `https://automationexercise.com/api/deleteAccount`,
        failOnStatusCode: false,
        form: true,
        body: {
            email,
            password,
        },
    })
})