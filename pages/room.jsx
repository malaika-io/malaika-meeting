import {useUser} from '../lib/hooks';
import React, {useState, useEffect} from "react";
import Head from "next/dist/next-server/lib/head";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
if (typeof window === 'undefined') {
    global.window = {}
}


const RoomPage = () => {
    let video;
    let webRtcPeer;

    const [user] = useUser();
    const {
        email,
        first_name
    } = user || {};

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {
            path: '/kurento',
            transports: ['websocket', 'polling']
        });
        socket.on('connect', function () {
            console.log('connect');
        });

        socket.on("presenterResponse", message => {
            presenterResponse(message);
        });

        socket.on("stopCommunication", message => {
            dispose();
        });

        socket.on('iceCandidate', function (message) {
            webRtcPeer.addIceCandidate(message.candidate)
        });

        //presenter(socket);

        function presenter(socket) {
            if (!webRtcPeer) {

                let options = {
                    localVideo: video,
                    onicecandidate: onIceCandidate
                };

                webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                    if (error) {
                        console.log(error)
                    }
                    return this.generateOffer((offerSdp) => {
                        socket.emit('presenter', {
                            offerSdp: offerSdp
                        });
                    });
                });
            }
        }

        function presenterResponse(message) {
            if (message.response !== 'accepted') {
                var errorMsg = message.message ? message.message : 'Unknow error';
                console.warn('Call not accepted for the following reason: ' + errorMsg);
                if (webRtcPeer) {
                    webRtcPeer.dispose();
                    webRtcPeer = null;
                }
            } else {
                webRtcPeer.processAnswer(message.sdpAnswer);
            }
        }

        function stop() {
            if (webRtcPeer) {
                socket.emit('stop');
                dispose();
            }
        }

        function dispose() {
            if (webRtcPeer) {
                webRtcPeer.dispose();
                webRtcPeer = null;
            }
        }

        function onIceCandidate(candidate) {
            console.log('Local candidate' + JSON.stringify(candidate));
            socket.emit('onIceCandidate', {
                candidate: candidate
            });
        }
    }, []);


    return (
        <>
            <style jsx>
                {`
          h2 {
            text-align: left;
            margin-right: 0.5rem;
          }
          button {
            margin: 0 0.25rem;
          }
          img {
            width: 10rem;
            height: auto;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
            margin-right: 1.5rem;
          }
          div {
            color: #777;
            display: flex;
            align-items: center;
          }
          p {
            font-family: monospace;
            color: #444;
            margin: 0.25rem 0 0.75rem;
          }
          a {
            margin-left: 0.25rem;
          }
        `}
            </style>
            <Head>
                <title>{first_name}</title>
            </Head>
            <div>
                <section>
                    Email
                    <p>
                        {email}
                    </p>
                </section>
                <section>
                    <div id="videoBig">
                        <video id="video" autoPlay width="640px" height="480px"></video>
                    </div>
                </section>
            </div>
        </>
    );
};
export default RoomPage;
