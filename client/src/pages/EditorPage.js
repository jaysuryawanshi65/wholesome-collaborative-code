import React,{useEffect,useRef,useState} from 'react';
import {useLocation,useNavigate,useParams,Navigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {initSocket} from '../socket';
import ACTIONS from '../Actions';
import Editor from '../components/Editor';

export default function EditorPage(){
 const location=useLocation(),navigate=useNavigate(),{roomId}=useParams(); const socketRef=useRef(null); const codeRef=useRef(''); const [clients,setClients]=useState([]); const [output,setOutput]=useState('');
 useEffect(()=>{let active=true;const init=async()=>{try{socketRef.current=await initSocket();if(!active)return;socketRef.current.on('connect_error',()=>toast.error('Socket connection failed, try again later.'));socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{if(username!==location.state?.username)toast.success(`${username} joined the room.`);setClients(clients);socketRef.current.emit(ACTIONS.SYNC_CODE,{code:codeRef.current,socketId})});socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{toast(`${username} left the room.`);setClients(prev=>prev.filter(c=>c.socketId!==socketId))});socketRef.current.emit(ACTIONS.JOIN,{roomId,username:location.state?.username});}catch(e){toast.error('Unable to connect to server')}};init();return()=>{active=false;socketRef.current?.disconnect()}},[roomId]);
 if(!location.state)return <Navigate to="/"/>;
 return <main className="editor-page"><section className="pane"><Editor clients={clients} socketRef={socketRef} roomId={roomId} onCodeChange={c=>codeRef.current=c} setOutput={setOutput}/></section><section className="pane"><div className="toolbar"><span className="title">Output Preview</span><span className="back" onClick={()=>navigate('/')}>Leave room</span></div><div className="output">{output||'Run JavaScript to see the output here.'}</div></section></main>
}
