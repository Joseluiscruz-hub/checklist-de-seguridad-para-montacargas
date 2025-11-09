# GitHub Copilot Context

This is the central context prompt for the GitHub Copilot extension in this repository.

## 1. Project Description

This project is a **native Android mobile application** named **"FEMSA Inventario Pro"**. It is designed for inventory management at **Coca-Cola FEMSA**.

Its primary goal is to allow production line workers to efficiently scan and manage finished products and materials. The application must function reliably offline by storing data locally and potentially syncing with a central server later.

**Core Features:**
* Multiple scanning modes for different product types.
* Local data storage and management using a robust database.
* Business logic for managing warehouse capacity and inventory rules.
* A clean and intuitive user interface for fast-paced environments.
## 2. Key Technologies & Stack

* **Language:** **Kotlin**
* **Platform:** **Android SDK**
* **Architecture:** **MVVM (Model-View-ViewModel)**. We separate UI logic (Views/Composables), state management (ViewModels), and business logic (Repositories/UseCases).
* **UI Toolkit:** **Jetpack Compose** for building the user interface declaratively.
* **Database:** **Room** for local SQLite database storage. It is the single source of truth for local data.
* **Dependency Injection:** **Hilt** (or Koin) to manage dependencies and lifecycle.
* **Asynchronous Operations:** **Kotlin Coroutines and Flows** for all background tasks and reactive data streams.
* **Networking:** **Retrofit** and **OkHttp** for any future API communications.
* **Testing:** **JUnit 5** for unit tests, **Mockito/MockK** for mocking, and **Espresso** for UI tests.
## 3. General Coding Guidelines

* **Language:** All code, comments, and documentation must be in **Spanish**, as the project is for a Latin American company.
* **Immutability:** Always prefer `val` over `var`. Use immutable data classes and lists (`List` instead of `MutableList`) where possible, especially for UI state.
* **Null Safety:** Leverage Kotlin's null safety. Avoid platform types and the non-null asserted operator (`!!`). Use safe calls (`?.`) and the elvis operator (`?:`) for nullable types.
* **Error Handling:** Use Kotlin's `Result` class or sealed classes to represent success/failure states from repositories and use cases. Avoid throwing generic exceptions.
* **Logging:** Use the **Timber** library for logging. Do not use `android.util.Log` directly.
## 4. Common Patterns & Naming Conventions

* **Variables & Functions:** Use `camelCase`.
* **Classes & Composables:** Use `PascalCase`.
* **ViewModels:** Suffix with `ViewModel` (e.g., `InventoryViewModel`). They should expose state via `StateFlow` and events via `SharedFlow` or `Channel`.
* **Repositories:** Suffix with `Repository` (e.g., `ProductRepository`). This is the only layer that interacts directly with data sources (Room DAO, API).
* **Use Cases/Interactors:** Name classes based on the single action they perform (e.g., `GetProductByBarcodeUseCase`).
* **Composable Functions:** Must be `PascalCase`. Private composables can be prefixed with an underscore (e.g., `_MyPrivateComponent`).
* **Room Entities:** Data classes representing DB tables should be suffixed with `Entity` (e.g., `ProductEntity`).
* **Room DAOs:** Interfaces for DB access should be suffixed with `Dao` (e.g., `ProductDao`).
## 4. Common Patterns & Naming Conventions

* **Variables & Functions:** Use `camelCase`.
* **Classes & Composables:** Use `PascalCase`.
* **ViewModels:** Suffix with `ViewModel` (e.g., `InventoryViewModel`). They should expose state via `StateFlow` and events via `SharedFlow` or `Channel`.
* **Repositories:** Suffix with `Repository` (e.g., `ProductRepository`). This is the only layer that interacts directly with data sources (Room DAO, API).
* **Use Cases/Interactors:** Name classes based on the single action they perform (e.g., `GetProductByBarcodeUseCase`).
* **Composable Functions:** Must be `PascalCase`. Private composables can be prefixed with an underscore (e.g., `_MyPrivateComponent`).
* **Room Entities:** Data classes representing DB tables should be suffixed with `Entity` (e.g., `ProductEntity`).
* **Room DAOs:** Interfaces for DB access should be suffixed with `Dao` (e.g., `ProductDao`).