import React,{useEffect,useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from 'react-avatar';
import {EditorView,basicSetup} from 'codemirror';
import {EditorState} from '@codemirror/state';
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';
import ACTIONS from '../Actions';

const starter=`// Welcome to the real-time collaborative editor\nfunction randomNumber(min, max) {\n  return Math.floor(Math.random() * (max - min) + min);\n}\n\nconsole.log("Random Number:", randomNumber(1, 100));`;

export default function Editor({clients,socketRef,roomId,onCodeChange,setOutput}){
 const navigate=useNavigate(); const host=useRef(null); const viewRef=useRef(null); const applyingRemote=useRef(false);
 useEffect(()=>{
  const state=EditorState.create({doc:starter,extensions:[basicSetup,javascript(),oneDark,EditorView.updateListener.of(v=>{if(v.docChanged){const code=v.state.doc.toString();onCodeChange(code);if(!applyingRemote.current)socketRef.current?.emit(ACTIONS.CODE_CHANGE,{roomId,code});}})]});
  const view=new EditorView({state,parent:host.current}); viewRef.current=view; return()=>view.destroy();
 },[]);
 useEffect(()=>{if(!socketRef.current)return;const handler=({code})=>{if(code==null||!viewRef.current)return;const current=viewRef.current.state.doc.toString();if(current===code)return;applyingRemote.current=true;viewRef.current.dispatch({changes:{from:0,to:viewRef.current.state.doc.length,insert:code}});applyingRemote.current=false;onCodeChange(code)};socketRef.current.on(ACTIONS.CODE_CHANGE,handler);return()=>socketRef.current.off(ACTIONS.CODE_CHANGE,handler)},[socketRef.current]);
 const run=()=>{const code=viewRef.current?.state.doc.toString()||'';try{let result;const oldLog=console.log;console.log=(...args)=>{result=args.join(' ')};const fn=new Function(code);const returned=fn();console.log=oldLog;if(result===undefined&&returned!==undefined)result=String(returned);setOutput(result===undefined?'Code executed successfully.':String(result));}catch(e){console.log=console.log;setOutput(`${e.name}: ${e.message}`)}};
 const clear=()=>{viewRef.current?.dispatch({changes:{from:0,to:viewRef.current.state.doc.length,insert:''}});setOutput('');};
 return <><div className="toolbar"><span className="title">Code Editor <span className="muted">· Room {roomId}</span></span><div className="toolbar-actions"><button className="icon-btn" title="Run code" onClick={run}>▶</button><button className="icon-btn" title="Clear editor" onClick={clear}>⌫</button><button className="icon-btn" title="Leave room" onClick={()=>navigate('/')}>↩</button></div></div><div className="editor-wrap" ref={host}/><div className="clients">{clients.map(c=><div className="client" key={c.socketId}><Avatar name={c.username} size="25" round="50%"/><span>{c.username}</span></div>)}</div></>
}
