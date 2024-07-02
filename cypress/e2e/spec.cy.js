describe("template spec", () => {
  it("Verifica se app está abrindo", () => {
    cy.visit("http://127.0.0.1:7001/");
  });

  it("Insere uma tarefa", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("TP2 de Engenharia de Software{enter}");

    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de Engenharia de Software");
  });

  it("Insere e deleta uma tarefa", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("TP2 de Engenharia de Software{enter}");

    cy.get(".todo-list li .destroy").invoke("show").click();

    cy.get(".todo-list li").should("have.length", 0);
  });

  it("Filtra tarefas completas e ativas", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo").type("TP2 de ES{enter}").type("Prova de ES{enter}");

    cy.get(".todo-list li .toggle").first().click();

    cy.contains("Active").click();
    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "Prova de ES");

    cy.contains("Completed").click();
    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de ES");

    cy.contains("All").click();
    cy.get(".todo-list li").should("have.length", 2);
  });

  it("Limpa tarefas completas", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get(".new-todo")
      .type("Levar o cachorro para passear{enter}")
      .type("Maratona{enter}");

    cy.get(".todo-list li").should("have.length", 2);

    cy.get(".todo-list li .toggle").first().click();
    cy.get(".todo-list li .toggle").last().click();

    cy.contains("Clear completed").click();

    cy.get(".todo-list li").should("have.length", 0);
  });

  it("Checa contador de tarefas incompletas", () => {
    cy.visit("http://127.0.0.1:7001");

    cy.get("footer").should("have.css", "display", "none");

    cy.get(".new-todo").type("Estudar para prova de ES{enter}");
    cy.get("footer").should("have.css", "display", "block");
    cy.get(".todo-count").contains("item left").contains("1");

    cy.get(".new-todo").type("Maratonar Dark da Netflix{enter}");
    cy.get(".todo-count").contains("items left").contains("2");

    cy.get(".todo-list li .toggle").first().click();
    cy.get(".todo-count").contains("item left").contains("1");

    cy.get(".todo-list li .toggle").last().click();
    cy.get(".todo-count").contains("items left").contains("0");

    cy.contains("Clear completed").click();
    cy.get("footer").should("have.css", "display", "none");
  });
});
