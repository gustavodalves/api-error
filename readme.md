# Decoupled Error Handling and HTTP Status Codes

This repository contains a TypeScript implementation aimed at providing a structured way to handle errors in a REST API while maintaining a clear separation between business logic, domain errors, and HTTP status codes. This decoupled approach brings several benefits for code maintenance, scalability, and overall codebase understanding.

## Repository Contents

1. **Base Controller:**
   - The abstract class `Controller<T, K>` serves as a foundation for specific controllers, defining a consistent structure for handling errors and HTTP status codes.

2. **Domain Errors:**
   - The abstract class `DomainException` and the `EmailInvalid` class exemplify the creation of domain-specific errors. These errors represent issues related to business rules and are kept in a separate hierarchy.

3. **`ApiError` Interface:**
   - The `ApiError` interface outlines the standard structure for representing errors in the application, including a descriptive message and an associated HTTP status code.

4. **`StatusCodeEnum` Enumeration:**
   - This enumeration is used to represent HTTP status codes, providing standardization for returning error responses.

5. **README:**
   - This README file provides information on how to use the implementation, highlighting the importance of maintaining a decoupled structure across different layers.

## Importance of Layer Separation

1. **Abstraction and Maintenance:**
   - Separation between business logic, domain errors, and HTTP status codes enables clear abstraction, making independent maintenance of each layer more straightforward.

2. **Understanding and Comprehension:**
   - Keeping domain-specific errors in a separate hierarchy makes it easier to understand and identify issues related to business rules. The decoupled structure contributes to a clearer understanding of the code.

3. **Facilitates Testing:**
   - Decoupled layers make testing simpler. It allows testing business logic in isolation without dealing directly with HTTP communication or infrastructure details.

4. **Adaptation to Different Interfaces:**
   - The decoupled structure makes it easier to adapt the application to different communication interfaces, such as HTTP, WebSocket, or GraphQL, without compromising business logic.

5. **Standardization and Consistency:**
   - Standardizing HTTP status codes and having a clear error structure contributes to consistent and understandable communication between different components of the application.

## How to Use

1. **Create Your Own Controller:**
   - Extend the `Controller<T, K>` class to create controllers specific to your routes or resources.

2. **Define Domain-Specific Errors:**
   - Use the `DomainException` class as a base to create domain-specific errors, as demonstrated in the `EmailInvalid` class.

3. **Customize the `ApiError` Interface:**
   - Adapt the `ApiError` interface as needed to include additional information relevant to your application.

4. **Enumerate Status Codes:**
   - Use the `StatusCodeEnum` enumeration to standardize HTTP status codes returned by your API.

5. **Instantiate and Use Your Controllers:**
   - Create instances of your custom controllers and use the `handle` method to manage business logic execution and error handling.

This repository provides an initial structure that can be expanded and customized based on the specific needs of your application. Keep the layer separation to ensure a more modular, testable, and maintainable codebase.
