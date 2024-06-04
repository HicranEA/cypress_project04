/// <reference types="cypress" />

import ToDoListPage from "../../pages/ToDoListPage";

describe('Project04 - Todo List ', () => {

    const toDoListPage = new ToDoListPage()
  
      beforeEach(() => { 
        toDoListPage.visit();
      
      });

      it('Test Case 01 - Todo-App Modal Verification', () => {
        
        toDoListPage.getToDoAppModal().should('be.visible').and('include.text', 'My Tasks');
        toDoListPage.getNewTodoInput().should('be.enabled');
        toDoListPage.getAddButton().should('be.enabled');
        toDoListPage.getSearchField().should('be.enabled');
        toDoListPage.getTaskListEmptyMessage().should('include.text', 'No tasks found!');
     })

     it('Test Case 02 - Single Task Addition and Removal', () => {

        toDoListPage.getNewTodoInput().type(`Finish Homework{enter}`);
        toDoListPage.getTaskListMessage().should('include.text', 'Finish Homework');
        toDoListPage.getTaskListMessage().should('have.length', 1);
        toDoListPage.getTaskListMessage().click();
        toDoListPage.getItemMarkCompleted().should('be.visible');
        toDoListPage.getRemoveTaskButton().click();
        toDoListPage.ValidateTaskListEmpty();
    });

    it('Test Case 03 - Multiple Task Operation', () => {

      toDoListPage.EnterItemsToDoList();

      toDoListPage.ValidateTaskListItems();

      toDoListPage.getTaskListMessage().each(item => {
        cy.wrap(item).click();
      });

      toDoListPage.getRemoveTaskButton().click();

      toDoListPage.ValidateTaskListEmpty();  
    });

    it('Test Case 04 - Search and Filter Functionality', () => {

      toDoListPage.EnterItemsToDoList();

      toDoListPage.ValidateTaskListItems();

      const toDoListItemSearch = 'Item1';

      toDoListPage.getSearchField().type(toDoListItemSearch + '{enter}');

      toDoListPage.getTaskListMessage().should('have.length', 1).and('have.text', toDoListItemSearch);
    });

    it('Test Case 05 - Task Validation and Error Handling', () => {

      const toDoListTestItems = ['', 'this item has more than 30 characters', 'Valid Task']

      toDoListPage.getNewTodoInput().type(toDoListTestItems[0] + '{enter}');
      toDoListPage.getTaskListEmptyMessage().should('include.text', 'No tasks found!');
      toDoListPage.getNewTodoInput().type(toDoListTestItems[1] + '{enter}');
      toDoListPage.getErrorMessage().should('include.text', 'Error: Todo cannot be more than 30 characters!');
      toDoListPage.getNewTodoInput().clear().type(toDoListTestItems[2] + '{enter}');
      toDoListPage.getTaskListMessage().should('have.length', 1);
      toDoListPage.getNewTodoInput().clear().type(toDoListTestItems[2] + '{enter}');
      toDoListPage.getErrorMessage().should('include.text', `Error: You already have ${toDoListTestItems[2]} in your todo list.`);
    })



    })

