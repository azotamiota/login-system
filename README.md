# Login system
## Installation & Usage
### Installation
- Clone the repo
#### Server-side
- Navigate to the `server` folder: `cd login_system/server`
- Install dependencies: `npm install`
- Make sure your MySQL server is up and running
- Run `npm run create-db-table` script to create a `users` table in a `mydb` database
- Create `.env` file with the following environment variables:
    Database credentials:
    - `HOST`
    - `USER`
    - `PASSWORD`
    For token creation:
    - `SECRET_PASSWORD`
- Run the server: `npm run dev`
- Make sure the server is running by visiting: `http://localhost:3000/`
#### Client-side
- Navigate to the `client` folder: `cd client`
- Install dependencies: `npm install`
- Run the client side: `npm run dev`
- Open your `localhost` address accordingly.
- Most probably at `http://127.0.0.1:5173/` if this port is free

### Usage
- Register a user with an email and password
- Both email address and password quality will be validated
- Only a secure password can be chosen, follow the instructions
- After successful registration, the email address will pop up in the `Login` form
- Provide the password to log in
- A simple welcome page will be visible for logged-in users
- Log out and try again
- Follow flashed feedback messages
