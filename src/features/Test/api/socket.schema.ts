import { Socket } from "socket.io-client";

interface ListenEvents {
	REGISTERED: (data: { attemptId: number; }, cb: (ack: { isInprogress: boolean }) => void) => void;
	ANSWERED: (data: { attemptId: number; questionId: number; optionId?: number; }, cb: (error: { error?: string; }) => void) => void;
}

interface EmitEvents {
	ENDED: () => void;
	CLOCK_SYNCED: (data: { secondsLeft: number; }) => void;
	ANSWERED: (data: { questionId: number; optionId?: number; }) => void;
}

export type CurrentTestSocket = Socket<EmitEvents, ListenEvents>;