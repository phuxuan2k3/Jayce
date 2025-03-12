import io from 'socket.io-client';
import { url } from '../../../app/env';

export const events = {
	REGISTERED: 'registered',
	SYNCED: 'synced',
	ANSWERED: 'answered',
	ENDED: 'ended',
}

const currentTestSocket = io(`${url.thresh.socket}/current`, {
	autoConnect: false,
});

export default currentTestSocket;