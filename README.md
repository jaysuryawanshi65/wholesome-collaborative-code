# 💻 Wholesome - Real-Time Collaborative Code Editor

Wholesome is a real-time collaborative code editor that allows multiple users to join the same coding room and work together on code simultaneously.

Users can create or join a room using a Room ID and collaborate with other users in real time.

---

## 🚀 Features

- 👥 Real-time collaborative code editing
- 🏠 Create coding rooms
- 🔗 Join existing rooms using Room ID
- 👤 User name identification
- ⚡ Real-time synchronization between users
- 💻 Online collaborative code editor
- 🌐 Client-server architecture
- 🔄 Multiple users can work in the same room
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- WebSocket / Socket-based real-time communication

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

# 🏗️ Application Architecture

```text
                 ┌─────────────────────┐
                 │       User 1        │
                 │      Browser        │
                 └──────────┬──────────┘
                            │
                            │
                            ▼
                 ┌─────────────────────┐
                 │                     │
                 │   Node.js Server    │
                 │                     │
                 │  Real-Time Server   │
                 │                     │
                 └──────────┬──────────┘
                            │
                            │
                            ▼
                 ┌─────────────────────┐
                 │       User 2        │
                 │      Browser        │
                 └─────────────────────┘

                     Shared Room
                         │
                         ▼
                  Collaborative Code

📂 Project Structure
real-time-collaborative-code-editor/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
⚙️ Installation
1. Clone the Repository
git clone https://github.com/jaysuryawanshi65/wholesome-collaborative-code.git

Move into the project:

cd wholesome-collaborative-code
📦 Backend Setup

Open a terminal in the project root.

Move into the server directory:

cd server

Install dependencies:

npm install

Start the server:

npm start

If the project uses a development script, you can also use:

npm run dev
⚛️ Frontend Setup

Open a new terminal.

Move into the client directory:

cd client

Install dependencies:

npm install

Start the frontend:

npm start

If the project uses Vite:

npm run dev
👥 How to Test Collaboration

The easiest way to test the application is by opening it in two browser windows.

User 1
Open the application.
Enter your name.
Create a new room.
Copy the Room ID.
Start writing code.
User 2
Open the application in another browser window.
Enter a different name.
Enter the same Room ID.
Join the room.
Start editing the code.

Both users should be able to see the code changes in real time.

🔄 Real-Time Collaboration Flow
User 1
   │
   │ Code Change
   ▼
Frontend
   │
   │ WebSocket
   ▼
Server
   │
   │ Broadcast
   ▼
Frontend
   │
   ▼
User 2

When one user changes the code, the change is sent to the server and synchronized with the other users connected to the same room.

🏠 Room System

Each collaboration session is associated with a Room ID.

Room ID
   │
   ├── User 1
   ├── User 2
   ├── User 3
   └── User N

Users with the same Room ID can collaborate in the same coding session.

🧪 Testing

Test the following workflow:

1. Start the backend server
2. Start the frontend application
3. Open the application
4. Create a room
5. Copy the Room ID
6. Open another browser window
7. Join using the same Room ID
8. Enter code from User 1
9. Verify the code appears for User 2
10. Edit code from User 2
11. Verify the changes appear for User 1
📸 Screenshots
Home Page

Add your project screenshot here.

![Home Page](screenshots/home.png)
Create / Join Room

Add your screenshot here.

![Room](screenshots/room.png)
Collaborative Editor

Add your screenshot here.

![Collaborative Editor](screenshots/editor.png)
🔮 Future Improvements
Add syntax highlighting for multiple programming languages
Add language selection
Add file/folder management
Add user authentication
Add private rooms
Add room passwords
Add code execution
Add chat functionality
Add cursor/selection indicators for each user
Add user presence indicators
Add code saving
Add database persistence
Add deployment with Docker
Add CI/CD pipeline
Deploy frontend and backend to cloud
🔐 Security Considerations

For production deployment:

Validate Room IDs
Validate user input
Add authentication
Protect WebSocket connections
Add rate limiting
Secure environment variables
Use HTTPS/WSS
Restrict code execution capabilities
📌 Project Purpose

This project was developed to demonstrate:

React development
Node.js backend development
Real-time communication
WebSocket-based collaboration
Client-server architecture
Git and GitHub workflow
👨‍💻 Author

Jay Suryavanshi

Full Stack Developer

Skills
React.js
JavaScript
Node.js
Python
Django
.NET
Java
SQL
Machine Learning
Git & GitHub
⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
```
