# Library Management System

A simple Library Management System built with **Node.js, Express.js, MongoDB, and Mongoose**.
The project provides REST APIs for managing books and readers, along with a command-line interface (CLI) for interacting with the system.

## Features

* 📚 Book Management

  * Add books
  * Get all books
  * Search books
  * Sort books
  * Update books
  * Delete books

* 👤 Reader Management

  * Add readers
  * Get all readers
  * Search readers
  * Sort readers
  * Update readers
  * Delete readers

* 🔌 RESTful APIs using Express.js

* 🗄️ MongoDB database with Mongoose

* 💻 Command-Line Interface (CLI)

* 🔄 Primary and Backup Servers

* 🛡️ Automatic failover from the primary server to the backup server

* 📡 Axios for API requests

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Axios
* JavaScript
* Readline

## Project Structure

```text
library-management-system/
│
├── server.js
├── backup.js
├── client.js
├── package.json
├── README.md
└── .gitignore
```

### Files

* `server.js` — Main Express server running on port `3000`.
* `backup.js` — Backup Express server running on port `3001`.
* `client.js` — Command-line interface used to interact with the library system.
* `package.json` — Project dependencies and configuration.

## System Architecture

The project uses two Express servers:

```text
                 ┌──────────────┐
                 │     CLI      │
                 │   client.js  │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │ Main Server  │
                 │    :3000     │
                 └──────┬───────┘
                        │
                   If unavailable
                        │
                 ┌──────▼───────┐
                 │Backup Server │
                 │    :3001     │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │   MongoDB    │
                 │   library    │
                 └──────────────┘
```

The CLI first tries to communicate with the main server on port `3000`.
If the request fails, it automatically attempts to use the backup server on port `3001`.

## Database

The project uses MongoDB with a database named:

```text
library
```

The application connects to the local MongoDB instance:

```text
mongodb://localhost:27017/library
```

The system contains two main collections:

* `Books`
* `Readers`

## API Functionality

The Express servers provide APIs for:

### Books

* Create a book
* Retrieve books
* Search books
* Sort books
* Update a book
* Delete a book

### Readers

* Create a reader
* Retrieve readers
* Search readers
* Sort readers
* Update a reader
* Delete a reader

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/rawdamohamed2/library-management-system.git
```

### 2. Navigate to the project

```bash
cd library-management-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Make sure MongoDB is running

The project expects MongoDB to be available locally on:

```text
mongodb://localhost:27017
```

## Running the Project

### Start the Main Server

Open a terminal and run:

```bash
node server.js
```

The main server runs on:

```text
http://localhost:3000
```

### Start the Backup Server

Open another terminal and run:

```bash
node backup.js
```

The backup server runs on:

```text
http://localhost:3001
```

### Start the CLI

Open a third terminal and run:

```bash
node client.js
```

You can then use the CLI menu to manage books and readers.

## Failover Mechanism

The CLI is configured to use the main server first.

```text
CLI
 ↓
Port 3000
 ↓
Request successful → Continue
 ↓
Request failed
 ↓
Port 3001
 ↓
Backup server handles the request
```

This provides basic fault tolerance by allowing the application to continue working when the primary server is unavailable.

## Learning Objectives

This project was developed as a college project to practice:

* Building REST APIs with Node.js and Express
* Working with MongoDB and Mongoose
* Implementing CRUD operations
* Connecting a CLI application to REST APIs
* Handling API requests with Axios
* Working with multiple servers
* Implementing basic server failover
* Structuring a backend application

## Notes

* MongoDB must be running locally before starting the servers.
* The local MongoDB database itself is not included in the repository.

## Author

**Rawda Mohamed**

GitHub: [rawdamohamed2](https://github.com/rawdamohamed2)
