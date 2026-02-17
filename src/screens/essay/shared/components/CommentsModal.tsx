import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
} from "@/components/ui/actionsheet";
import { HStack } from "@/components/ui/hstack";
import { SkeletonText } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { Comment, getComments } from "@/src/api/commentsRepo";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import { AlertDialogContext } from "@/src/context/AlertDialogProvider";
import { AuthContext } from "@/src/context/AuthProvider";
import PrimaryButton from "@/src/ui/button/PrimaryButton";
import IndicatorText from "@/src/ui/IndicatorText";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react-native";
import { use } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import EssayDataContext from "../context/EssayDataContext";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

interface CommentsModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentsModal({
  isOpened,
  setIsOpened,
}: CommentsModalProps) {
  const { user } = use(AuthContext).session!;
  const { showDialog } = use(AlertDialogContext)!;

  const { data: essayData } = use(EssayDataContext)!;

  const {
    data,
    isPending,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeyPrefixes.comments, essayData?.id],
    queryFn: ({ pageParam }) => getComments(essayData!.id, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  const commentsData = data?.pages.flatMap((page) => page.items);

  return (
    <>
      <Actionsheet isOpen={isOpened} onClose={() => setIsOpened(false)}>
        <ActionsheetBackdrop />
        <View className="pt-20 flex-1">
          <ActionsheetContent className="flex-1 px-5 py-8">
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

            <VStack space="2xl" className="px-5 py-8">
              <HStack>
                <Text className="text-2xl text-typography-950">Comments</Text>

                <View className="px-3 py-1"></View>
              </HStack>
            </VStack>

            <ActionsheetFlatList
              data={commentsData}
              renderItem={({ item }) => (
                <CommentItem data={item as Comment} showDialog={showDialog} />
              )}
              keyExtractor={(item) => (item as Comment).id!.toString()}
              contentContainerClassName="gap-4"
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) fetchNextPage();
              }}
              ListEmptyComponent={
                isPending ? (
                  <SkeletonText className="h-2" _lines={3} />
                ) : isError ? (
                  <IndicatorText isError>
                    Failed to get comments: {error.message}
                  </IndicatorText>
                ) : (
                  <IndicatorText>Be the first to comment!</IndicatorText>
                )
              }
              onEndReachedThreshold={1}
              ListFooterComponent={() =>
                isFetchingNextPage && (
                  <Spinner size={32} className="text-typography-950" />
                )
              }
              className="flex-1"
            />

            {essayData && (
              <KeyboardAvoidingView behavior="position" className="w-full pb-8">
                <CommentInput essayId={essayData.id} userId={user.id} />
              </KeyboardAvoidingView>
            )}
          </ActionsheetContent>
        </View>
      </Actionsheet>

      <PrimaryButton icon={MessageCircle} onPress={() => setIsOpened(true)}>
        View comments
      </PrimaryButton>
    </>
  );
}
