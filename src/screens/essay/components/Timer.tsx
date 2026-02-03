import { HStack } from "@/components/ui/hstack";
import { AlertDialogContext } from "@/src/context/AlertDialogProvider";
import IconButton from "@/src/ui/button/IconButton";
import SmallCardBox from "@/src/ui/SmallCardBox";
import cssInteropIcon from "@/src/utils/cssInteropIcon";
import { clsx } from "clsx";
import { Pause, Play, Square } from "lucide-react-native";
import React, { use, useEffect, useRef } from "react";
import { Text } from "react-native";
import formatSeconds from "../utils/formatSeconds";

cssInteropIcon(Play);
cssInteropIcon(Pause);
cssInteropIcon(Square);

interface TimerProps {
  secondsFromStart: number;
  setSecondsFromStart: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer({
  secondsFromStart,
  setSecondsFromStart,
  isRunning,
  setIsRunning,
}: TimerProps) {
  const intervalIdRef = useRef<number | null>(null);

  const { showDialog } = use(AlertDialogContext)!;

  useEffect(() => {
    const clearIntervalByRef = () => {
      intervalIdRef.current && clearInterval(intervalIdRef.current);
    };

    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setSecondsFromStart((value) => value + 1);
      }, 1000);
    } else {
      clearIntervalByRef();
    }

    return clearIntervalByRef;
  }, [isRunning, setSecondsFromStart]);

  const handleStartPause = () => {
    setIsRunning((value) => !value);
  };

  const handleStop = () => {
    showDialog({
      title: "Stop timer",
      content: "Are you sure you want to stop the timer?",
      confirmButtonText: "Stop",
      onConfirm() {
        setIsRunning(false);
        setSecondsFromStart(0);
      },
    });
  };

  const PlayOrPauseIcon = isRunning ? Pause : Play;

  return (
    <SmallCardBox>
      <Text
        className={clsx(
          "text-xl",
          isRunning ? "text-typography-950" : "text-typography-500",
        )}
      >
        {formatSeconds(secondsFromStart)}
      </Text>

      <HStack space="xs">
        <IconButton
          action="secondary"
          className="bg-background-transparent"
          onPress={handleStartPause}
        >
          <PlayOrPauseIcon className="text-typography-950" />
        </IconButton>

        <IconButton
          action="secondary"
          className="bg-background-transparent"
          disabled={!secondsFromStart}
          onPress={handleStop}
        >
          <Square
            className={clsx(
              isRunning || secondsFromStart
                ? "text-typography-950"
                : "text-typography-500",
            )}
          />
        </IconButton>
      </HStack>
    </SmallCardBox>
  );
}
