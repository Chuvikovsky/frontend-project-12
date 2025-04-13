// import React, { useEffect, useRef, useState } from "react";

// import { getChannels, getMessages } from "../utils/requests";
// import { useSelector, useDispatch } from "react-redux";
// import { addChannel } from "../store/channelsSlice";
// import { addMessage } from "../store/messagesSlice";

// const dispatch = useDispatch();

// const setChannels = () => {
//   getChannels()
//     .then((response) => {
//       response.data.forEach((ch) => {
//         dispatch(addChannel(ch));
//       });
//       setChannelsLoaded(true);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const setMessages = () => {
//     getMessages()
//       .then((response) => {
//         response.data.forEach((m) => {
//           dispatch(addMessage(m));
//         });
//         setMessagesLoaded(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// };
