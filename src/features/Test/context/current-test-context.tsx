import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import currentTestSocket, { events } from '../api/current-test-socket';
import useGetTestIdParams from '../hooks/useGetTestIdParams';
import { AttemptAnswer } from '../types/current';

interface TestContextProps {
	timeLeft: number | null;
	answers: AttemptAnswer[];
	isEnded: boolean;
}

const CurrentTestContext = createContext<TestContextProps | undefined>(undefined);

export const CurrentTestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
	const [isEnded, setIsEnded] = useState<boolean>(false);

	const testId = useGetTestIdParams();

	useEffect(() => {
		currentTestSocket.connect();
		currentTestSocket.emit(events.REGISTERED, { testId });
		return () => {
			currentTestSocket.disconnect();
		};
	}, []);

	useEffect(() => {
		function onSynced(data: number) {
			setTimeLeft(data);
		}
		function onAnswered(data: { questionId: number; optionId: number | undefined }) {
			setAnswers((prevAnswers) => {
				const newAnswers = [...prevAnswers];
				const index = newAnswers.findIndex((answer) => answer.questionId === data.questionId);
				if (index === -1) {
					newAnswers.push({ questionId: data.questionId, optionId: data.optionId });
				}
				else {
					newAnswers[index] = {
						questionId: data.questionId, optionId: data.optionId
					};
				}
				return newAnswers;
			});
		}
		function onEnded() {
			setTimeLeft(0);
			setIsEnded(true);
		}
		currentTestSocket.on(events.SYNCED, onSynced);
		currentTestSocket.on(events.ANSWERED, onAnswered);
		currentTestSocket.on(events.ENDED, onEnded);
		return () => {
			currentTestSocket.off(events.SYNCED, onSynced);
			currentTestSocket.off(events.ANSWERED);
			currentTestSocket.off(events.ENDED);
		};
	}, []);

	return (
		<CurrentTestContext.Provider value={{ timeLeft, answers, isEnded }}>
			{children}
		</CurrentTestContext.Provider>
	);
};

export const useCurrentTestContext = (): TestContextProps => {
	const context = useContext(CurrentTestContext);
	if (!context) {
		throw new Error('useTestContext must be used within a TestProvider');
	}
	return context;
};