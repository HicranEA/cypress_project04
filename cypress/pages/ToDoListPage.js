class ToDoListPage {
    // Locators
    visit() {
      cy.visit("https://www.techglobal-training.com/frontend/project-6");
    }

    getToDoAppModal() {
       return cy.get('.panel-heading')
    }
    
    getNewTodoInput() {
        return cy.get('#input-add')
    }
   
    getAddButton() {
      return cy.get('#add-btn')
    }

    getSearchField() {
      return cy.get('#search')
    }

    getTaskListEmptyMessage() {
      return cy.get('.todo-item > p')
    }

   getTaskListMessage() {
      return cy.get('.mr-auto > :nth-child(2)')
    }

    getItemMarkCompleted() {
      return cy.get('[style="text-decoration: line-through;"]')
    }

    getRemoveTaskButton() {
      return cy.get('#clear')
    }

    getErrorMessage() {
      return cy.get('.notification')
    }

    // Methods

    ValidateTaskListEmpty() {
      return this.getTaskListEmptyMessage().should('include.text', 'No tasks found!');
    }

    EnterItemsToDoList() {
      const toDoList = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5']   

      return toDoList.forEach(item => {
        this.getNewTodoInput().type(item + '{enter}').clear();
      })
    }

    ValidateTaskListItems() {
      const toDoList = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'] 
      
      toDoList.forEach(item => {
        this.getTaskListMessage().should('include.text', item);
      })
    }

    }
    
  

  
  export default ToDoListPage;