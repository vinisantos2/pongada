import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default function useAudio() {
    const [moveSound, setMoveSound] = useState<any>(null);
    const [winSound, setWinSound] = useState<any>(null);

    useEffect(() => {
        const loadSounds = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/move.mp3') // Caminho do som de movimento
            );
            setMoveSound(sound);

            const { sound: winSound } = await Audio.Sound.createAsync(
                require('../assets/sounds/win.mp3') // Caminho do som de vitória
            );
            setWinSound(winSound);
        };

        loadSounds();

        return () => {
            if (moveSound) {
                moveSound.unloadAsync();
            }
            if (winSound) {
                winSound.unloadAsync();
            }
        };
    }, []);

    const playMoveSound = () => {
        moveSound?.replayAsync();
    };

    const playWinSound = () => {
        winSound?.replayAsync();
    };

    return {
        playMoveSound,
        playWinSound,
    };
}
