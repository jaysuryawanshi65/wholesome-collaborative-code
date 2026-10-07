# Real-Time Collaborative Code Editor

A working implementation based on the uploaded tutorial **“A Real Time Collaborative Code Editor”**. The tutorial uses a React client, Express/Node API server, Socket.IO for real-time events, CodeMirror for the browser editor, React Avatar, React Hot Toast and Tailwind styling. See the source tutorial pages 3–23.

## Features
- Create a 4-digit room ID or join an existing room
- Multiple users can join the same room
- Real-time JavaScript code synchronization with Socket.IO
- User list with avatars
- Join/leave toast notifications
- CodeMirror-based editor with JavaScript syntax highlighting
- Run JavaScript and show output
- Clear editor and leave room
- Responsive two-pane editor UI
- Backend health endpoint at `/api/health`

## Requirements
- Node.js 18+ recommended
- npm

## Run locally

### 1. Server
```bash
cd server
npm install
npm run dev
```
Server: http://localhost:5000

### 2. Client
Open another terminal:
```bash
cd client
npm install
npm start
```
Client: http://localhost:3000

Optional client environment variable:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

## Test collaboration
1. Open http://localhost:3000.
2. Click **Make Room** and note the room ID.
3. Enter your name and click **Join Room**.
4. Open a second browser/incognito window.
5. Enter the same room ID with another name.
6. Type code in either window and watch the other window update in real time.

## Production build
```bash
cd client
npm run build
```
The Express server is configured to serve `client/build` when that directory exists, matching the tutorial's deployment approach. The tutorial discusses Vercel for the client and Render for the server.

## Important note
The PDF contains some older Create React App / CodeMirror 5 snippets and a few incomplete or inconsistent pieces. This project keeps the tutorial's architecture and feature set but uses a current CodeMirror React integration so the project is easier to install and run.
