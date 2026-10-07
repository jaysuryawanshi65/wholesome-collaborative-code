import React,{useState} from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

export default function Home(){
 const navigate=useNavigate(); const [roomId,setRoomId]=useState(''); const [username,setUsername]=useState('');
 const createNewRoom=()=>{const id=Math.floor(1000+Math.random()*9000).toString();setRoomId(id);toast.success('Created a new room');};
 const joinRoom=()=>{if(!roomId.trim()||!username.trim()){toast.error('ROOM ID & username is required');return;}navigate(`/editor/${roomId.trim()}`,{state:{username:username.trim()}})};
 const onKeyUp=e=>{if(e.key==='Enter')joinRoom()};
 return <main className="home"><section className="card"><h1 className="logo">Welcome To Wholesome</h1><p className="muted">Create or enter a room ID and name to start coding together in real time.</p><div className="form"><input className="input" placeholder="Enter Room ID" value={roomId} onChange={e=>setRoomId(e.target.value)} onKeyUp={onKeyUp}/><input className="input" placeholder="Enter Your Name" value={username} onChange={e=>setUsername(e.target.value)} onKeyUp={onKeyUp}/><div className="row"><button className="btn primary" onClick={joinRoom}>Join Room</button><button className="btn secondary" onClick={createNewRoom}>Make Room</button></div></div><p className="muted" style={{fontSize:12,marginTop:20}}>Tip: Open this app in two browser windows and join the same room to test collaboration.</p></section></main>
}
