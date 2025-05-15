/// <reference types="cypress" />

const userCredentials = require("../fixtures/user-credentials.json")

import { productsPage } from "./pages/productPage";
import { loginPage } from "./pages/loginPage";



describe("Automation Exercises Login", () => {

    context("1. Register", () => {
        beforeEach(() => {
            cy.deleteUserWithAPI(userCredentials)

            cy.visit('/')
            cy.get("body").should("be.visible")
        })

        it("Test Case 1: Register User", () => {
            cy.intercept('POST', '**/signup').as('register');
            cy.signupUser(userCredentials)
            cy.wait('@register').its('response.statusCode').should('eq', 200)
            loginPage.loggedInAs(userCredentials.name);
            loginPage.deleteAccountBtn().click()
            loginPage.accountDeletedMsg().should("have.text", "Account Deleted!");
            loginPage.continueBtn().click();
            
        })
    })
    
    context("2.Login", () => {
        beforeEach(() => {
            cy.deleteUserWithAPI(userCredentials)
            cy.registerUserWithAPI(userCredentials)

            cy.visit('/')
            cy.get("body").should("be.visible")
        })
        it("Test Case 2: Login User with correct email and password", () => {

            loginPage.signupLoginTab().click()
            cy.fillLoginForm(userCredentials)
            loginPage.loggedInAs(userCredentials.name);
            loginPage.deleteAccountBtn().click()
            loginPage.accountDeletedMsg().should("have.text", "Account Deleted!");
            
        })

        it("Test Case 3: Login User with incorrect email and password", () => {


            loginPage.signupLoginTab().click()
            cy.fillLoginForm({
                email: "invalidEmail@gmail.com",
                password: userCredentials.password,
            })
            loginPage.incorrectLoginMsg().should("be.visible");
            
        })

        it("Test Case 4: Logout User", () => {

            loginPage.signupLoginTab().click();
            cy.fillLoginForm(userCredentials)
            loginPage.loggedInAs(userCredentials.name);
            loginPage.logoutBtn().click();
            cy.url().should("include", "/login")
        })

        it("Test Case 5: Register User with existing email", () => {

            loginPage.signupLoginTab().click()
            cy.fillSignupForm(userCredentials)
            loginPage.emailExistsMsg().should("be.visible");
            
        })
    })

    context("3.Orders and Products", () => {
        beforeEach(() => {
            cy.deleteUserWithAPI(userCredentials)

            cy.visit('/')
            cy.get("body").should("be.visible")
        })
    
        it("Test Case 8: Verify All Products and product detail page", () => {

            productsPage.productsTab().click()
            cy.get("body").should("be.visible")
            cy.url().should("include", "/products")
            productsPage.allProductsTitle().should("have.text", "All Products")
            productsPage.firstProduct().within(() => {
                productsPage.viewProductBtn().click();
            });
            productsPage.productInfoHeader().should("be.visible");
            productsPage.productInfoDetails().forEach(el => el.should("be.visible"));

        })

         it("Test Case 9: Search Product", () => {

            productsPage.productsTab().click()
            cy.get("body").should("be.visible")
            cy.url().should("include", "/products")
            productsPage.allProductsTitle().should("have.text", "All Products");
            productsPage.searchInput().type("Premium Polo T-Shirts");
            productsPage.searchBtn().click();
            productsPage.allProductsTitle().should("have.text", "Searched Products");
            productsPage.firstProduct().should("exist");
            cy.get(".product-image-wrapper").its("length").should("eq", 1)

        })

         it("Test Case 13: Verify Product quantity in Cart", () => {

            productsPage.productsTab().click();
            productsPage.viewProductBtn().click();
            cy.get("body").should("be.visible")
            cy.url().should("include","/product_details",)
            cy.get(".product-details").should("be.visible")
            cy.get("#quantity").clear().type("4")
            cy.contains("Add to cart").click()
            cy.contains("View Cart").click()
            productsPage.cartProduct().should("contain.text", "Blue Top");
            productsPage.cartQuantity().should("have.text", "4");
            
        })

        it("Test Case 21: Add review on product", () => {

        
            productsPage.productsTab().click();
            cy.get("body").should("be.visible")
            cy.url().should("include", "/products")
            productsPage.allProductsTitle().should("have.text", "All Products");
            productsPage.firstProduct().within(() => {
                productsPage.viewProductBtn().click();
            });
            productsPage.reviewName().type(userCredentials.name);
            productsPage.reviewEmail().type(userCredentials.email);
            productsPage.reviewTextarea().type("This is a great product!");
            productsPage.reviewSubmit().click()
            productsPage.reviewSuccess().should("contain.text", "Thank you for your review");
            
        })

        it("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {

            productsPage.footer().scrollIntoView();
            productsPage.subscriptionHeader().should("have.text", "Subscription");
            productsPage.scrollUpBtn().click();
            productsPage.sliderCarousel().should("contain.text", "Full-Fledged practice website for Automation Engineers");
            
        })
      })
    })