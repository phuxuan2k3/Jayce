import React, { useEffect, useRef } from 'react';

interface SoundWaveVisualizerProps {
	totalBars?: number;
	barCoefficient?: number;
}

const SoundWaveVisualizer2: React.FC<SoundWaveVisualizerProps> = ({
	totalBars = 8,
	barCoefficient = 5,
}) => {
	const rectanglesRef = useRef<(HTMLDivElement | null)[]>(Array.from({ length: totalBars }, () => null));
	const containerRef = useRef<HTMLDivElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const animationFrameIdRef = useRef<number | null>(null);

	useEffect(() => {

		const setupAudio = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				const audioCtx = new AudioContext();
				const analyser = audioCtx.createAnalyser();

				audioContextRef.current = audioCtx;

				analyser.fftSize = 128; // smaller FFT = fewer bars, (read the docs please)
				const bufferLength = analyser.frequencyBinCount;
				const dataArray = new Uint8Array(bufferLength);

				const source = audioCtx.createMediaStreamSource(stream);
				source.connect(analyser);

				const render = () => {
					if (
						!audioContextRef.current ||
						!containerRef.current
					) return;
					analyser.getByteTimeDomainData(dataArray);
					const containerHeight = containerRef.current.clientHeight;
					const step = Math.floor(dataArray.length / totalBars);
					for (let i = 0; i < totalBars; i++) {
						const val = dataArray[i * step];
						const normalized = val / 128.0; // 128 is middle of range
						const barHeight = (normalized - 1) * (containerHeight * barCoefficient); // Center the wave
						const barElement = rectanglesRef.current[i];
						if (barElement) {
							barElement.style.height = `${Math.abs(barHeight)}px`;
						}
					}

					animationFrameIdRef.current = requestAnimationFrame(render);
				};

				render();

			} catch (err) {
				console.error('Microphone access denied or error:', err);
			}
		};

		setupAudio();

		return () => {
			if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
			if (audioContextRef.current) audioContextRef.current.close();
		};
	}, [totalBars]);

	return (
		<div className='flex items-center gap-x-1 w-full h-8 bg-transparent'
			ref={containerRef}
		>
			{Array.from({ length: totalBars }).map((_, index) => (
				<div
					key={index}
					className='flex-1 bg-primary rounded-full overflow-y-visible'
					ref={el => (rectanglesRef.current[index] = el)}
				>
				</div>
			))}
		</div>
	);
};

export default SoundWaveVisualizer2;