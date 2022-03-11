Feature: Calculator Scenario

  Scenario Outline: Calculate Substraction and Division
    Given Open browser and start application
    When I input number "<input1>"
    And I choose "<operation>" operation
    And I input number "<input2>"
    And I see the result
    And Result should be "<result>"
    Then close the browser

  Examples:
    | input1 | input2 | result | operation |
    | 8      | 6       | 11     | substract |
    | 9      | 9       | 0      | substract |
    | 16     | 0       | error  | divide    |