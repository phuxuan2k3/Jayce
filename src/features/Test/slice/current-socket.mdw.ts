import io, { Socket } from "socket.io-client";
import { url } from '../../../app/env';
import { Middleware } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../app/redux/hooks";
import { selectTokens } from "../../../app/redux/authSlice";
import { answerQuestion, endTest, socketDisconnected, socketEstablished, startTest, syncSecondsLeft } from "./testSlice";

const events = {
	REGISTERED: 'registered',
	SYNCED: 'synced',
	ANSWERED: 'answered',
	ENDED: 'ended',
}

let socket: Socket | null = null;
function getSocket() {
	if (!socket) {
		socket = io(`${url.thresh.socket}/current`, {
			withCredentials: true,
			transports: ['websocket', 'polling'],
			autoConnect: false,
		});
		socket.on("connect_error", (error) => {
			console.error("connect_error", error);
		});
	}
	return socket;
}

// Ref: https://wanago.io/2021/12/20/redux-middleware-websockets/
const currentSocketMiddleware: Middleware = (store) => (next) => (action) => {
	const token = useAppSelector(selectTokens);
	if (!token) {
		return next(action);
	}
	const currentTestSocket = getSocket();
	if (startTest.match(action)) {
		currentTestSocket.auth = { userId: token?.user_id };
		currentTestSocket.connect();

		// Starts syncing the test
		currentTestSocket.emit(events.REGISTERED, { testId: 1 });

		store.dispatch(socketEstablished());

		// Listens
		currentTestSocket.on(events.SYNCED, ({ secondsLeft }) => {
			store.dispatch(syncSecondsLeft(secondsLeft));
		});

		currentTestSocket.on(events.ANSWERED, ({ questionId, chosenOption }) => {
			store.dispatch(answerQuestion({ questionId, chosenOption }));
		});

		currentTestSocket.on(events.ENDED, () => {
			store.dispatch(endTest());
		});
	}
	if (endTest.match(action)) {
		currentTestSocket.removeAllListeners();
		currentTestSocket.disconnect();
		store.dispatch(socketDisconnected());
	}
	return next(action);
}

export { currentSocketMiddleware };