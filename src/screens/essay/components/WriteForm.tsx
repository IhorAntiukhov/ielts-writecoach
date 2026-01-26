import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { AuthContext } from "@/src/context/AuthProvider";
import useToast from "@/src/hooks/useToast";
import EssayType from "@/src/types/essayType";
import PopoverButton from "@/src/ui/button/PopoverButton";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import CardBox from "@/src/ui/CardBox";
import Dropdown from "@/src/ui/Dropdown";
import TextAreaInput from "@/src/ui/input/TextAreaInput";
import SmallCardBox from "@/src/ui/SmallCardBox";
import { getNounByNumber } from "@/src/utils/getNounByNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Save, Sparkles, Users } from "lucide-react-native";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { WritingFormData, writingFormSchema } from "../forms/writingForm";
import ImageData from "../types/imageData";
import { InsertEssayParams } from "../types/saveEssayParams";
import getWordCount from "../utils/getWordCount";
import uploadEssayWithImage from "../utils/uploadEssayWithImage";
import EssayImagePicker from "./EssayImagePicker";
import Timer from "./Timer";

export default function WriteForm() {
  const { id } = useLocalSearchParams();

  const isNewEssay = id === "new-essay";
  console.log(id);

  const [type, setType] = useState<EssayType>("task-1A");
  const [imageData, setImageData] = useState<ImageData>(null);
  const [secondsFromStart, setSecondsFromStart] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const { user } = use(AuthContext).session!;

  const {
    control,
    formState: { errors },
    handleSubmit: handleSubmitDraft,
    watch,
  } = useForm<WritingFormData>({
    resolver: zodResolver(writingFormSchema),
  });

  const { mutate: saveEssayAsDraftMutation, isPending } = useMutation({
    mutationFn: (data: InsertEssayParams) => uploadEssayWithImage(data),
    onMutate: () => {
      setIsRunning(false);
    },
    onSuccess: (id) => {
      toast("success", "Save essay", "Essay was saved as draft");

      router.navigate({
        pathname: "/(tabs)/private/[id]",
        params: {
          id,
        },
      });
    },
    onError: (error) => {
      toast("error", "Save essay", error.message);
    },
  });

  const responseWordCount = getWordCount(watch("response"));

  const handleSaveEssayAsDraft = handleSubmitDraft(
    ({ instructions, response }) => {
      saveEssayAsDraftMutation({
        type,
        instructions,
        image: imageData?.uri ?? undefined,
        mimeType: imageData?.mimeType ?? undefined,
        time: secondsFromStart,
        wordCount: responseWordCount,
        response,
        userId: user.id,
      });
    },
  );

  return (
    <VStack space="2xl">
      <CardBox>
        <VStack space="2xl">
          <Dropdown<EssayType>
            selectedValue={type}
            onChange={setType}
            options={[
              {
                label: "General Task 1",
                value: "task-1G",
              },
              {
                label: "Academic Task 1",
                value: "task-1A",
              },
              {
                label: "Task 2",
                value: "task-2",
              },
            ]}
            initialLabel="Academic Task 1"
          />

          <TextAreaInput
            name="instructions"
            control={control}
            placeholder="Type the task instructions"
            keyboardType="default"
            errors={errors}
            maxLength={500}
          />

          {type === "task-1A" && (
            <EssayImagePicker
              imageData={imageData}
              setImageData={setImageData}
            />
          )}
        </VStack>
      </CardBox>

      <CardBox>
        <VStack space="2xl">
          <HStack space="2xl">
            <Timer
              secondsFromStart={secondsFromStart}
              setSecondsFromStart={setSecondsFromStart}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />

            <SmallCardBox className="flex-grow">
              <Text className="text-typography-950 text-lg">
                {`${responseWordCount}/${type === "task-2" ? 250 : 150} ${getNounByNumber(responseWordCount, "word")}`}
              </Text>
            </SmallCardBox>
          </HStack>

          <TextAreaInput
            name="response"
            control={control}
            placeholder="Start writing the essay"
            keyboardType="default"
            errors={errors}
            autoCorrect={false}
            maxLength={5000}
            largeTextArea
          />
        </VStack>
      </CardBox>

      <CardBox>
        <VStack space="2xl">
          <HStack space="2xl">
            <SecondaryButton
              icon={Save}
              isLoading={isPending}
              onPress={handleSaveEssayAsDraft}
            >
              Save as draft
            </SecondaryButton>

            <PrimaryButton icon={Sparkles}>Analyze</PrimaryButton>
          </HStack>

          {isNewEssay ? (
            <PopoverButton
              icon={Users}
              buttonTitle="Share with others"
              placement="top"
              popoverContent="You must save your essay before making it public"
            />
          ) : (
            <SecondaryButton icon={Users}>Share with others</SecondaryButton>
          )}
        </VStack>
      </CardBox>
    </VStack>
  );
}
