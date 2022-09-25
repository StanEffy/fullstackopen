Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Stanny",
      username: "Stanny",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.get("#username").type("Stanny");
    cy.get("#password").type("12345");
    cy.get("#login-button").click();
  });

  it("login fails with wrong password", function () {
    cy.contains("logout").click();
    cy.get("#username").type("Stanny");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error").should("contain", "invalid username or password");

    cy.get("html").should(
      "not.contain",
      "Well, Stanny is definetely logged in"
    );
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
  });
  it("there are three blogs initially", function () {
    cy.get(".blog-unit").should("have.length", 0);
    // cy.contains("Trump");
  });
});

describe("creating new blogpost", function () {
  it("can add a post to a db", function () {
    cy.contains("add new blogpost").click();

    cy.get("#form-title").type("First Title");
    cy.get("#form-author").type("Stanny");
    cy.get("#form-url").type("www.google.com");
    cy.get("#form-button-submit").click();

    cy.get("#form-title").clear().type("Second Title");
    cy.get("#form-author").type("Stanny");
    cy.get("#form-url").type("www.gmail.com");
    cy.get("#form-button-submit").click();

    cy.get(".blog-unit").should("have.length", 2);
  });
});

describe("deleting and changing existent blogpost", function () {
  beforeEach(function () {
    cy.login({ username: "Stanny", password: "12345" });
  });

  it("can delete a post to a db", function () {
    cy.get(".blog-unit").should("have.length", 2);
    cy.get(".blog-unit").last().get("button").eq(-1).click();
    cy.get(".post-deletion-button").last().click();

    cy.get(".blog-unit").should("have.length", 1);
  });

  it("should be able to like a post", function () {
    cy.get(".blog-unit button").click();
    cy.get(".blog-likes").should("have.text", "likes 0");

    cy.get(".blog__like-button").click();
    cy.get(".blog-likes").should("have.text", "likes 1");
    cy.get(".blog__like-button").click();
    cy.get(".blog-likes").should("have.text", "likes 2");
  });
});
