# Tech stack
- Frontend
  - React (v16)
  - Bootstrap (v4.1.3)
  - Node.js (v14.15.4)
  - TypeScript (v3.9.7)
- Backend
  - .NET Core (v3.1) 

# Architecture notes
- Frontend sends API requests
- Backend receives API requests
  - data are stored in singleton in-memory collection database 
  
# REST API

| URL | HTTP method | Operation | On Success | On Error | Example call
| ------ | ------ | ------ | ----- | ----- | ----- |
| api/tasks | GET | GET all tasks | return task collection (json) | return text message | api/tasks
| api/tasks/{guid} | GET | GET specific task | return task object (json) | return text message | api/tasks/184c67fd-cabd-4fd6-ba68-72341226fb19
| api/tasks | POST | ADD | return task object (json) | return text message | /api/tasks?name=Foo&priority=1
| api/tasks/{guid} | PUT | UPDATE | return task object (json) | return text message | /api/tasks/c11bee0d-5504-4781-8e4b-b7cc2388e9e5?name=Foo&priority=1&status=1
| api/tasks/{guid} | DELETE | DELETE |  | return text message | api/tasks/184c67fd-cabd-4fd6-ba68-72341226fb19

# Frontend unit tests
Tests are located in **src\Web\ClientApp\src\\_\_tests\_\_** directory.
```sh
src\Web\ClientApp> npm test
```

# Backend unit tests
Tests are located in **Domain.Tests** project.
```sh
project_folder> dotnet test
```

# Demo

![](app-demo.gif)