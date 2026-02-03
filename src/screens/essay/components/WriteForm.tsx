import { HStack } from "@/components/ui/hstack";
import { Skeleton } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { AuthContext } from "@/src/context/AuthProvider";
import EssayType from "@/src/types/essayType";
import PopoverButton from "@/src/ui/button/PopoverButton";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import SecondaryButton from "@/src/ui/button/SecondaryButton";
import CardBox from "@/src/ui/CardBox";
import Dropdown from "@/src/ui/Dropdown";
import IndicatorText from "@/src/ui/IndicatorText";
import TextAreaInput from "@/src/ui/input/TextAreaInput";
import SmallCardBox from "@/src/ui/SmallCardBox";
import { getNounByNumber } from "@/src/utils/getNounByNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Save, Sparkles, Users } from "lucide-react-native";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import {
  saveExistingEssayWithAnalysis,
  uploadNewEssayWithAnalysis,
} from "../api/analyzeEssay";
import getEssayWithImageData from "../api/getEssayWithImageData";
import { saveExistingEssay, uploadNewEssay } from "../api/saveEssay";
import { WritingFormData, writingFormSchema } from "../forms/writingForm";
import useSetFormData from "../hooks/useSetFormData";
import useUpdateEssayMutation from "../hooks/useUpdateEssayMutation";
import useUploadEssayMutation from "../hooks/useUploadEssayMutation";
import ImageData from "../types/imageData";
import {
  InsertEssayParams,
  InsertEssayWithAnalysisParams,
  UpdateEssayParams,
  UpdateEssayWithAnalysisParams,
} from "../types/saveEssayParams";
import getWordCount from "../utils/getWordCount";
import EssayImagePicker from "./EssayImagePicker";
import Timer from "./Timer";

export default function WriteForm() {
  const { id } = useLocalSearchParams();

  const isNewEssay = id === "new-essay";

  const [type, setType] = useState<EssayType>("task-1A");

  const [imageData, setImageData] = useState<ImageData>(null);

  const [secondsFromStart, setSecondsFromStart] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { user } = use(AuthContext).session!;

  const {
    control,
    formState: { errors },
    handleSubmit: handleSubmitDraft,
    watch,
    reset,
  } = useForm<WritingFormData>({
    resolver: zodResolver(writingFormSchema),
  });

  const responseWordCount = getWordCount(watch("response"));

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["essay", id],
    queryFn: () => getEssayWithImageData(Number(id as string)),
    enabled: !isNewEssay,
  });

  useSetFormData({
    data,
    reset,
    setType,
    setSecondsFromStart,
    setImageData,
  });

  const { mutate: saveEssayAsDraftMutation, isPending: isSavingEssayPending } =
    useUploadEssayMutation({
      mutationFn: (data: InsertEssayParams) => uploadNewEssay(data),
      setIsTimerRunning,
      toastTitle: "Save essay",
      toastSuccessMessage: "Essay was saved as draft",
      redirectToReview: false,
    });

  const {
    mutate: saveExistingEssayAsDraftMutation,
    isPending: isSavingExistingEssayPending,
  } = useUpdateEssayMutation({
    mutationFn: (data: UpdateEssayParams) =>
      saveExistingEssay(data, Number(id as string), user.id),
    setIsTimerRunning,
    toastTitle: "Save essay",
    toastSuccessMessage: "Essay was saved as draft",
    redirectToReview: false,
  });

  const { mutate: analyzeEssayMutation, isPending: isEssayAnalysisPending } =
    useUploadEssayMutation({
      mutationFn: (data: InsertEssayWithAnalysisParams) =>
        uploadNewEssayWithAnalysis(data),
      setIsTimerRunning,
      toastTitle: "Analyze essay",
      toastSuccessMessage: "Essay was analyzed",
      redirectToReview: true,
    });

  const {
    mutate: analyzeExistingEssayMutation,
    isPending: isExistingEssayAnalysisPending,
  } = useUpdateEssayMutation({
    mutationFn: (data: UpdateEssayWithAnalysisParams) =>
      saveExistingEssayWithAnalysis(data, Number(id as string), user.id),
    setIsTimerRunning,
    toastTitle: "Analyze essay",
    toastSuccessMessage: "Essay was analyzed",
    redirectToReview: true,
  });

  if (isError) {
    return (
      <IndicatorText isError>
        Failed to get the essay data: {error.message}
      </IndicatorText>
    );
  }

  const getEssayDataToSave = ({
    instructions,
    response,
  }: WritingFormData): UpdateEssayParams => ({
    type,
    instructions,
    imageUrl: imageData?.uri,
    imageWidth: imageData?.imageDimensions.width,
    imageHeight: imageData?.imageDimensions.height,
    mimeType: imageData?.mimeType,
    time: secondsFromStart,
    wordCount: responseWordCount,
    response,
  });

  const handleSaveEssayAsDraft = handleSubmitDraft((formData) => {
    if (isNewEssay) {
      saveEssayAsDraftMutation({
        ...getEssayDataToSave(formData),
        userId: user.id,
      });
    } else {
      saveExistingEssayAsDraftMutation(getEssayDataToSave(formData));
    }
  });

  const handleAnalyzeEssay = handleSubmitDraft((formData) => {
    if (isNewEssay) {
      analyzeEssayMutation({
        ...getEssayDataToSave(formData),
        base64: imageData?.base64,
        userId: user.id,
      });
    } else {
      analyzeExistingEssayMutation({
        ...getEssayDataToSave(formData),
        base64: imageData?.base64,
      });
    }
  });

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

          <Skeleton
            variant="rounded"
            isLoaded={!isPending || isNewEssay}
            className="rounded-lg h-[6.25rem]"
          >
            <TextAreaInput
              name="instructions"
              control={control}
              placeholder="Type the task instructions"
              keyboardType="default"
              errors={errors}
              maxLength={500}
            />
          </Skeleton>

          {type === "task-1A" && (
            <Skeleton
              variant="rounded"
              isLoaded={!isPending || isNewEssay}
              className="w-full h-auto rounded-lg aspect-video"
            >
              <EssayImagePicker
                imageData={imageData}
                setImageData={setImageData}
              />
            </Skeleton>
          )}
        </VStack>
      </CardBox>

      <CardBox>
        <VStack space="2xl">
          <HStack space="2xl">
            <Timer
              secondsFromStart={secondsFromStart}
              setSecondsFromStart={setSecondsFromStart}
              isRunning={isTimerRunning}
              setIsRunning={setIsTimerRunning}
            />

            <SmallCardBox className="flex-grow">
              <Text className="text-typography-950 text-lg">
                {`${responseWordCount}/${type === "task-2" ? 250 : 150}${responseWordCount < 100 ? getNounByNumber(responseWordCount, " word") : ""}`}
              </Text>
            </SmallCardBox>
          </HStack>

          <Skeleton
            variant="rounded"
            isLoaded={!isPending || isNewEssay}
            className=" rounded-lg h-72"
          >
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
          </Skeleton>
        </VStack>
      </CardBox>

      <CardBox>
        <VStack space="2xl">
          <HStack space="2xl">
            <SecondaryButton
              icon={Save}
              isLoading={isSavingEssayPending || isSavingExistingEssayPending}
              onPress={handleSaveEssayAsDraft}
            >
              Save as draft
            </SecondaryButton>

            <PrimaryButton
              icon={Sparkles}
              isLoading={
                isEssayAnalysisPending || isExistingEssayAnalysisPending
              }
              onPress={handleAnalyzeEssay}
            >
              Analyze
            </PrimaryButton>
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
