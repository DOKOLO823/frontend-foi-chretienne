// import "../App.css";
// import sortir from '../icons/images/logout.png';
// import micro from '../icons/images/micro.png';
// import camera from '../icons/images/camera.png';
// import profile from '../icons/images/profile.png';
// import fc from '../icons/images/fc.jpg';
// import left from '../icons/images/left.png';
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {CopyToClipboard} from 'react-copy-to-clipboard';
// import ok from '../icons/images/ok.png';
// import {
//   MeetingProvider,
//   MeetingConsumer,
//   useMeeting,
//   useParticipant,
// } from "@videosdk.live/react-sdk";
// import { authToken, createMeeting } from "../API";
// import ReactPlayer from "react-player";
// import { useNavigate } from "react-router-dom";

// function JoinScreen({ getMeetingAndToken }) {
//   const [meetingId, setMeetingId] = useState(null);
//   const [spin, setSpin]=useState(false);
//   const onClicke = async () => {
//     await getMeetingAndToken(meetingId);
//   };
//   const spinner=()=>{
//     setSpin(true);
//   }

//   const navigate=useNavigate();

//   return (
//    <div className="flex flex-col items-center px-4 w-full">
//  <div className="gap-2 flex flex-row justify-center flex-wrap w-full">
//       <span className="text-center m-2 w-full text flex flex-col items-center gap-y-2"> <span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span> <span>Créez ou rejoingnez une prière :</span> </span>
//       <input
//         type="text"
//         placeholder="Entrer le lien de la prière"
//         onChange={(e) => {
//           setMeetingId(e.target.value);
//         }}
//       />
//       <button className="border-2 border-violet-700 px-2 rounded-lg text-violet-700 hover:bg-violet-700 hover:text-white" onClick={()=>{onClicke();spinner()}}>Joindre</button>
//       {" ou "}
//       <button className="border-2 border-violet-700 px-2 rounded-lg text-violet-700 hover:bg-violet-700 hover:text-white" onClick={()=>{onClicke();spinner()}}>Créer un nouveau lien</button>
//     </div>
//     {/* spinner  */}
//       <div style={{display:spin? 'flex' : 'none'}} role="status" className="mt-4 w-full text-center flex-row justify-center">
//     <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//     </svg>
//    &nbsp; <span>Un instant...</span>
// </div>
//     </div>
//   );
// }

// function ParticipantView(props) {
//   const micRef = useRef(null);
//   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//     useParticipant(props.participantId);

//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(webcamStream.track);
//       return mediaStream;
//     }
//   }, [webcamStream, webcamOn]);

//   useEffect(() => {
//     if (micRef.current) {
//       if (micOn && micStream) {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(micStream.track);

//         micRef.current.srcObject = mediaStream;
//         micRef.current
//           .play()
//           .catch((error) =>
//             console.error("videoElem.current.play() failed", error)
//           );
//       } else {
//         micRef.current.srcObject = null;
//       }
//     }
//   }, [micStream, micOn]);

//   return (
//     <div className="text-sm" key={props.participantId}>
//       <p className="text-center">
//         <span className="font-bold"> {displayName.toLocaleUpperCase()}</span> | Caméra: {webcamOn ? "ON" : "OFF"} | Micro:{" "}
//         {micOn ? "ON" : "OFF"}
//       </p>
//       <audio ref={micRef} autoPlay muted={isLocal} />
//       {webcamOn ? (
//         <ReactPlayer
//           //
//           playsinline // very very imp prop
//           pip={false}
//           light={false}
//           controls={false}
//           muted={true}
//           playing={true}
//           //
//           url={videoStream}
//           //
//           borderRadius={"10px"}
//           height={"200px"}
//           width={"300px"}
//           onError={(err) => {
//             console.log(err, "participant video error");
//           }}
//         />
//       ): <div className="flex flex-row justify-center items-center bg-gray-300 rounded-lg" style={{height:"200px",width:"300px"}}> <img className="rounded-lg hover:scale-110 hover:duration-700" style={{height:'70px'}} src={profile}/> </div>}
//     </div>
//   );
// }

// function Controls() {
//   const { leave, toggleMic, toggleWebcam } = useMeeting();
//   return (
//     <div className="flex flex-row flex-wrap gap-y-2 gap-x-4">
//       <button className=" flex flex-row justify-center items-center gap-x-1 border-2 border-violet-700 px-2 rounded-lg text-sm py-1 hover:bg-white hover:text-violet-700 hover:border-white hover:font-bold" onClick={() => leave()}><img style={{height:'20px'}} src={sortir}/> Sortir</button>
//       <button className=" flex flex-row justify-center items-center gap-x-1 border-2 border-violet-700 px-2 rounded-lg text-sm py-1 hover:bg-white hover:text-violet-700 hover:border-white hover:font-bold" onClick={() => toggleMic()}><img style={{height:'20px'}} src={micro}/> Micro</button>
//       <button className=" flex flex-row justify-center items-center gap-x-1 border-2 border-violet-700 px-2 rounded-lg text-sm py-1 hover:bg-white hover:text-violet-700 hover:border-white hover:font-bold" onClick={() => toggleWebcam()}><img style={{height:'20px'}} src={camera}/> Caméra</button>
//     </div>
//   );
// }

// function MeetingView(props) {
//     // copy clipboard 
//      const [textCopy, setTextCopy]=useState('texte a partager')
//      const [statutCopy,setStatutCopy]=useState(false)
  
//   // end copy 

//   const [joined, setJoined] = useState(null);
//   const { join } = useMeeting();
//   const { participants } = useMeeting({
//     onMeetingJoined: () => {
//       setJoined("JOINED");
//     },
//     onMeetingLeft: () => {
//       props.onMeetingLeave();
//     },
//   });
//   const joinMeeting = () => {
//     setJoined("JOINING");
//     join();
//   };

//   const navigate=useNavigate();

//   return (
//     <div className="container flex flex-col items-center gap-y-8">
//        <p className="text-start mb-3 flex flex-row justify-start items-center gap-x-4 w-full pl-3 position-relative top-8"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
//       <span className="text-center position-relative top-4 font-bold text-violet-700 flex flex-row items-center justify-center gap-x-2"> <img style={{height:'20px',borderRadius:'6px'}} src={fc} alt="" />FOI CHRETIENNE</span>
//       <span className="position-relative top-4">Lien de la prière : {props.meetingId}</span>

    
//             <span>
                
// <div style={{width:'100%',flexWrap:'wrap'}} class=" gap-2 w-full flex flex-row">
//     <CopyToClipboard text={props.meetingId}
//           onCopy={() => setStatutCopy(!statutCopy)}>
//          <div>
//          <button style={{backgroundColor:'rgb(109 40 217)',paddingLeft:'10px',paddingRight:'10px',borderRadius:'5px',color:'white'}}>{statutCopy ? <span className='text-small' style={{color: 'red',fontSize:'small',flexWrap:'nowrap',width:'100%'}}> <img src={ok} style={{height:'25px'}} alt="" /> </span> : 'Copier le lien'}</button>
//          <p className="text-sm">NB: Partagez le lien avec les intervenants.</p>
//          </div>
//         </CopyToClipboard>
// </div>

//             </span>
            

//       <Controls />
//       {joined && joined == "JOINED" ? (
//         <div className="flex flex-row justify-center items-center flex-wrap gap-4">
          
//           {[...participants.keys()].map((participantId) => (
//             <ParticipantView
//               participantId={participantId}
//               key={participantId}
//             />
//           ))}
//         </div>
//       ) : joined && joined == "JOINING" ? (
//         <p className="flex flex-row">Joining the meeting...
//           <div role="status">
//     <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//     </svg>
//     <span class="sr-only">Loading...</span>
// </div>
//         </p>
//       ) : (
//         <button className="border-2 border-violet-700 px-4 rounded-lg text-violet-700  w-1/5 hover:bg-violet-700 hover:text-white flex flex-row justify-center items-center boutonjoindrepriere" onClick={joinMeeting}>Joindre</button>
//       )}
//     </div>
//   );
// }

// function Priere() {
//   const [meetingId, setMeetingId] = useState(null);

//   const getMeetingAndToken = async (id) => {
//     const meetingId =
//       id == null ? await createMeeting({ token: authToken }) : id;
//     setMeetingId(meetingId);
//   };

//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   return authToken && meetingId ? (
    
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: "C.V. Raman",
//       }}
//       token={authToken}
//     >
//       <MeetingConsumer>
//         {() => (
//           <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//         )}
//       </MeetingConsumer>
//     </MeetingProvider>
//   ) : (
//     <JoinScreen getMeetingAndToken={getMeetingAndToken} />
//   );
  
// }

// export default Priere;
