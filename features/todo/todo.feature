Feature: Todo
  In order to get things done
  As I user
  I want to manage my todos

  Scenario: add todo
    Given I visit the todos page
    Given I have no todos initially
    When I write the todo "clean the kitchen" in the input field
    And I click enter
    Then I expect to see the todo "clean the kitchen" in the list
