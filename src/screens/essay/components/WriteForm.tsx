import { HStack } from "@/components/ui/hstack";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Save, Sparkles, Users } from "lucide-react-native";
import { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { WritingFormData, writingFormSchema } from "../forms/writingForm";
import ImageData from "../types/imageData";
import ImageDimensions from "../types/imageDimensions";
import {
  InsertEssayParams,
  InsertEssayWithAnalysisParams,
  UpdateEssayParams,
  UpdateEssayWithAnalysisParams,
} from "../types/saveEssayParams";
import {
  saveExistingEssayWithAnalysis,
  uploadNewEssayWithAnalysis,
} from "../utils/analyzeEssay";
import getEssayWithImageData from "../utils/getEssayWithImageData";
import getWordCount from "../utils/getWordCount";
import { saveExistingEssay, uploadNewEssay } from "../utils/saveEssay";
import EssayImagePicker from "./EssayImagePicker";
import Timer from "./Timer";

export default function WriteForm() {
  const { id } = useLocalSearchParams();

  const isNewEssay = id === "new-essay";

  const [type, setType] = useState<EssayType>("task-1A");

  const [imageData, setImageData] = useState<ImageData>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 1920,
    height: 1080,
  });

  const [secondsFromStart, setSecondsFromStart] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const isInitialDataSetRef = useRef(false);

  const { user } = use(AuthContext).session!;

  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const setData = async () => {
      if (data && !isInitialDataSetRef.current) {
        reset({
          instructions: data.instructions,
          response: data.response,
        });
        setType(data.type);
        setSecondsFromStart(data.time || 0);

        if (data.imageData) setImageData(data.imageData);
        if (data.imageDimensions) setImageDimensions(data.imageDimensions);

        isInitialDataSetRef.current = true;
      }
    };

    setData();
  }, [data, reset]);

  const { mutate: saveEssayAsDraftMutation, isPending: isSavingEssayPending } =
    useMutation({
      mutationFn: (data: InsertEssayParams) => uploadNewEssay(data),
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

  const {
    mutate: saveExistingEssayAsDraftMutation,
    isPending: isSavingExistingEssayPending,
  } = useMutation({
    mutationFn: (data: UpdateEssayParams) =>
      saveExistingEssay(data, Number(id as string), user.id),
    onMutate: () => {
      setIsRunning(false);
    },
    onSuccess: () => {
      toast("success", "Save essay", "Essay was saved as draft");

      queryClient.invalidateQueries({
        queryKey: ["essay", id],
      });
    },
    onError: (error) => {
      toast("error", "Save essay", error.message);
    },
  });

  const { mutate: analyzeEssayMutation, isPending: isEssayAnalysisPending } =
    useMutation({
      mutationFn: (data: InsertEssayWithAnalysisParams) =>
        uploadNewEssayWithAnalysis(data),
      onMutate: () => {
        setIsRunning(false);
      },
      onSuccess: (id) => {
        toast("success", "Analyze essay", "Essay was successfully analyzed");

        router.navigate({
          pathname: "/(tabs)/private/[id]",
          params: {
            id,
          },
        });
      },
      onError: (error) => {
        toast("error", "Analyze essay", error.message);
      },
    });

  const {
    mutate: analyzeExistingEssayMutation,
    isPending: isExistingEssayAnalysisPending,
  } = useMutation({
    mutationFn: (data: UpdateEssayWithAnalysisParams) =>
      saveExistingEssayWithAnalysis(data, Number(id as string), user.id),
    onMutate: () => {
      setIsRunning(false);
    },
    onSuccess: () => {
      toast("success", "Analyze essay", "Essay was successfully analyzed");

      queryClient.invalidateQueries({
        queryKey: ["review", id],
      });
    },
    onError: (error) => {
      toast("error", "Analyze essay", error.message);
    },
  });

  if (isError) {
    return (
      <Text className="text-error-950 text-xl text-center">
        Failed to get the essay data: {error.message}
      </Text>
    );
  }

  const getEssayDataToSave = ({ instructions, response }: WritingFormData) => ({
    type,
    instructions,
    image: imageData?.uri ?? undefined,
    mimeType: imageData?.mimeType ?? undefined,
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
            isLoaded={!isPending}
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
              isLoaded={!isPending}
              className="w-full h-auto rounded-lg aspect-video"
            >
              <EssayImagePicker
                imageData={imageData}
                setImageData={setImageData}
                imageDimensions={imageDimensions}
                setImageDimensions={setImageDimensions}
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
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />

            <SmallCardBox className="flex-grow">
              <Text className="text-typography-950 text-lg">
                {`${responseWordCount}/${type === "task-2" ? 250 : 150}${responseWordCount < 100 ? getNounByNumber(responseWordCount, " word") : ""}`}
              </Text>
            </SmallCardBox>
          </HStack>

          <Skeleton
            variant="rounded"
            isLoaded={!isPending}
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
