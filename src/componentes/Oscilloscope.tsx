import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import * as Tone from "tone";

const Oscilloscope: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [waveType, setWaveType] = useState<"sine" | "square">("sine");

  useEffect(() => {
    if (waveformRef.current) {
      // Inicializa o WaveSurfer
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "blue",
        progressColor: "green",
        cursorColor: "red",
        height: 150,
        barWidth: 3,
      });

      const oscillator = new Tone.Oscillator({
        type: waveType,
      }).toDestination();
      oscillator.start();
      const audioContext = Tone.context;

      const bufferSize = audioContext.sampleRate * 2;
      const buffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate
      );
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.sin((i / audioContext.sampleRate) * 2 * Math.PI * 440);
      }

      wavesurfer.load("audio/SoundHelix-Song-1.mp3");

      return () => {
        oscillator.stop();
        wavesurfer.destroy();
      };
    }
  }, [waveType]);

  const handleWaveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWaveType(event.target.value as "sine" | "square");
  };

  return (
    <div>
      <h3>Osciloscópio com Medição Dinâmica</h3>
      <div>
        <label htmlFor="waveType">Escolha o tipo de onda: </label>
        <select id="waveType" onChange={handleWaveChange} value={waveType}>
          <option value="sine">Senoide</option>
          <option value="square">Quadrada</option>
        </select>
      </div>
      <div ref={waveformRef}></div>
    </div>
  );
};

export default Oscilloscope;
