# Remote Insurance Corp.

## Architecture

Application is based on the NX monorepo architecture and consists of the following application and libraries:

- field-sales - application entry point (dummy)
- layout - application layout (dummy)
- core - domain-independent utils, helpers, services shared across all modules
- products - products feature library
- applications - applications feature library

NOTE: run `npm run dep-graph` to generate modules dependencies graph.

Application architecture could be easily scaled by adding new libraries and expanding existing ones by adding new feature modules.
The team could easily define new schematics and add them `tools` to scaffold new libraries.

### Architecture principles

- Modular architecture (see `/libs`)
- Strict modules boundaries (see `libs/products/products/src/index.ts`, `.eslintrc.json` -> `@nrwl/nx/enforce-module-boundaries`, `nx.json` -> `projects`)
- Lazy loading for routes (see `AppRoutingModule`)
- Inputs validation (see `ApplicationFromComponent.ngOnChanges`)
- Params validation (see `@required` and `Assert`)
- Immutable models (see `Product`)
- API models are mapped into UI models (see `ApplicationsApiMappingService`, this allows BE and UI to have different naming conventions, reduces coupling between BE and UI, allows UI to support multiple API's versions without changing components, allows to use JS/custom types in models (not just JSON types))
- Low cyclomatic complexity (use async/await to keep code flat (Promises could be replaced with Observables if the team prefers them), splitting large methods)
- Single object responsibility (see `ApplicationFormFieldComponent`)
- Business logic encapsulation (see `ApplicationFormBuilderService`)
- ChangeDetectionStrategy: OnPush
- Split components into 3 categories:
  - Containers: resolve dependencies, handle state (see `ProductsComponent`)
  - Dummy: render state (see `ProductsListComponent`)
  - Entry: resolve params (routes, dialog), manage layout (see `ProductsPageComponent`)

## Pre-requirements

- Collect requirements, use- and edge- cases from all users categories (first of all - field sales)
- Define high-level requirements, split them into epics -> user stories / tasks -> sub-tasks
- Define API (e.g. use OAS)
- Design UI (at least high-level mockups)
- Define the list of supported browsers, devices, screen resolutions
- Define budgets for bundles sizes, performance, memory consumption
- Define the list of supported locales and languages
- Define unit and e2e tests coverage requirements
- Define code style guide, architecture, common patterns, and practices (adjust editor/eslint/prettier configs if required)
- Define content security requirements (CSP, Subresource Integrity)
- Define static content caching and compression policies
- Define CI/CD pipeline to build staging/production images and run tests
- Define pre-commit hooks
- Define visual styleguide (color palette, UX/UI patterns), define core variables, mixins, animations, components
- Define the list of dependencies, lock versions in `package.json`
- Implement authentication and authorization (use `HttpInterceptor` to catch Unauthorized and Forbidden responses, use `CanActivate` guards to protect routes, introduce roles/stereotypes for all users types)
- Implement exceptions handling (implement `LoggerService.captureException`, implement global `ErrorHandler`, implement handlers for 4XX/5XX's responses, implement NotFound page, implement not supported browser/device page)
- Implement `Layout` module
- Implement `AppVersionService` to detect new API/App versions
- Implement Stores (e.g. based on NgRx) to cache data and share it across libraries/components hierarchies (suggestion: introduce middleware if it's required to save/restore the state to/from local storage)
- Implement metrics/stats collection
- Implement GDPR features (application is going to store clients data)

## Implementation and Requirements

Disclaimer: 2 hours is a very strict constraint, so I focused on demonstrating key architecture principles and implementing happy-path scenario for fetching the list of products, displaying them, and rendering the product application form with 2 fields types (text, number).

That's obviously is not enough to solve the problem of Remote Insurance Corp. Looks like they need an app which could work in an offline mode on a laptop or a tablet, so sales could download all product brochures and application forms he needs for a day, go offline, visit clients, store submitted application in local storage/server and submit applications when he's back online. So the overall happy-path workflow will be:

1. Login into the application as a field sales
2. Select list of products that should be available in an offline mode, download brochures and application forms metadata (store them in local storage/server (2nd option is better since it allows to encrypt data, but requires additional setup and could be problematic if iOS/Android tablet is used). If data is going to be stored in the local storage - consider using asymmetric encryption for clients data)
3. Visit clients, demonstrate previously downloaded brochures, offer clients to complete an application form (save application data on local storage/server)
4. Once field sales he should upload all applications forms, resolve all potential conflicts if form structure was updated while he was offline

## Backlog

### Products

- Implement `products/store` module (e.g. based on NxRg)
- Redesign products components for better UX/UI (navigation, sorting, filtering, pagination, categories)
- Implement `ProductBrochure` to render visually appealing product description (currently it's text-only, if brochures are big - consider introducing an `/products/{id}/description` end-point to reduce `/products` payload size)
- Implement the ability to download brochures and application forms metadata and use them instead of calling REST API if there is no internet connection (suggestion: use NgRx effects to encapsulate this logic)

### Applications

- Implement `products/store` module (e.g. based on NxRg)
- Redesign application components for better UX/UI
- Expand the list of supported `ApplicationFieldType`'s, validations, introduce grouping/wizards if forms are large/complicated
- Implement the ability to store submitted applications in local storage/server if there is no internet connection
- Implement the ability to list/update/delete all stored applications (make sure that clients cannot access to them)
- Implement the ability to submit all stored applications (add the ability to resolve potential conflicts)

### All

- Integrate with real API (if BE can generate JSON schema for API - consider replacing `any`/`unknown` in mapping services with auto-generated TS interfaces)
- Implement unit and e2e tests
- Implement i18n for supported locales and languages (potentially replace all texts in API responses with i18n keys)
- Implement accessibility features (aria, titles, tooltips, tab indexes, ...)
- If the product is going to be available on the internet - make sure that it's SEO-friendly

## Other

- Create PR's -> get approves -> merge
- Wait till CI will run tests and deploy changes to staging
- Assign user stories/tasks on QA/Tech Writer/Designer for testing/documenting/reviewing
- Make a demo for field sales to explain new functionality
- Tag release
- Trigger canary deployment
- Perform integration/performance/regression canary testing
- Switch to production
