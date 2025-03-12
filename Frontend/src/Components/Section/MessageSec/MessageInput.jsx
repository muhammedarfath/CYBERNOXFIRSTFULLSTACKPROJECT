import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineAudio,
  AiOutlineSend,
  AiOutlineSmile,
  AiOutlineStop,
  AiOutlineDelete,
  AiOutlineClose,
} from "react-icons/ai";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

function MessageInput({
  message,
  setMessage,
  handleSend,
  audioBlob,
  setAudioBlob,
  isBlocked,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioVisualization, setAudioVisualization] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio context for visualization
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 256;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        setAudioBlob(audioBlob);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setRecordingDuration(seconds);
      }, 1000);

      // Start visualization
      visualizeAudio();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const visualizeAudio = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualization = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      // Sample a few points from the frequency data for visualization
      const sampleSize = 10;
      const samples = [];

      for (let i = 0; i < sampleSize; i++) {
        const index = Math.floor(i * (bufferLength / sampleSize));
        samples.push(dataArray[index]);
      }

      setAudioVisualization(samples);
      animationFrameRef.current = requestAnimationFrame(updateVisualization);
    };

    updateVisualization();
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsRecording(false);
  };

  const cancelRecording = () => {
    stopRecording();
    setAudioBlob(null);
    setRecordingDuration(0);
    setAudioVisualization([]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      {!isRecording && !audioBlob && (
        <>
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex items-center justify-center text-gray-400  hover:text-gray-600"
            >
              <RiEmojiStickerLine className="w-6 h-6 text-primary hover:text-black" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <div className="flex-grow ml-4">
            <div className="relative w-full">
              {isBlocked ? (
                <div className="text-red-500">
                  You have been blocked by this user.
                </div>
              ) : (
                <input
                  type="text"
                  className="flex w-full border border-gray rounded-xl focus:outline-none focus:border-gray pl-4 h-10"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={isBlocked}

                />
              )}
            </div>
          </div>

          {!isBlocked && <div className="ml-4">
            {message.trim() ? (
              <button
                onClick={handleSend}
                className="flex items-center justify-center bg-button hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <AiOutlineSend className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="flex items-center justify-center text-primary hover:text-black"
              >
                <AiOutlineAudio className="w-6 h-6" />
              </button>
            )}
          </div>}
        </>
      )}

      {isRecording && (
        <div className="flex items-center w-full">
          <button
            onClick={cancelRecording}
            className="flex items-center justify-center text-red hover:text-red mr-4"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>

          <div className="flex-grow flex items-center">
            <div className="text-sm font-medium text-gray-700 mr-3">
              {formatTime(recordingDuration)}
            </div>

            <div className="flex-grow h-10 flex items-center">
              <div className="w-full h-8 flex items-center justify-around">
                {audioVisualization.map((value, index) => (
                  <div
                    key={index}
                    className="w-1 bg-button rounded-full mx-px animate-pulse"
                    style={{
                      height: `${Math.max(4, (value / 255) * 32)}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
                {audioVisualization.length === 0 && (
                  <div className="text-sm text-gray-500">Recording...</div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={stopRecording}
            className="flex items-center justify-center bg-button hover:bg-red rounded-full text-white p-2 ml-4"
          >
            <AiOutlineStop className="w-6 h-6" />
          </button>
        </div>
      )}

      {audioBlob && !isRecording && (
        <div className="flex items-center w-full">
          <button
            onClick={cancelRecording}
            className="flex items-center justify-center text-red-500 hover:text-red-600 mr-4"
          >
            <AiOutlineDelete className="w-6 h-6" />
          </button>

          <div className="flex-grow flex items-center">
            <div className="text-sm font-medium text-gray-700 mr-3">
              {formatTime(recordingDuration)}
            </div>

            <div className="flex-grow h-10 flex items-center">
              <div className="w-full h-8 bg-white rounded-full flex items-center px-3">
                <div className="text-sm text-gray-600">
                  Audio recording ready to send
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSend}
            className="flex items-center justify-center bg-button hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          >
            <AiOutlineSend className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default MessageInput;
