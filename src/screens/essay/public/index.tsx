import { VStack } from "@/components/ui/vstack";
import { getPublicEssay } from "@/src/api/essaysRepo";
import Pager from "@/src/components/Pager";
import SegmentedButtons from "@/src/components/segmentedButtons";
import Container from "@/src/ui/Container";
import TopBar from "@/src/ui/TopBar";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import ReactionsForm from "../shared/components/ReactionsPage";
import ReviewForm from "../shared/components/ReviewPage";
import EssayDataContext from "../shared/context/EssayDataContext";
import { PublicPage } from "../shared/types/page";
import TaskPage from "./components/TaskPage";

export default function PublicEssayScreen() {
  const { id } = useLocalSearchParams();

  const [page, setPage] = useState<PublicPage>("task");

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["essay", id],
    queryFn: () => getPublicEssay(Number(id as string)),
  });

  return (
    <>
      <TopBar title="Public essay" backToHref="/(tabs)/home" solidBackground />

      <Container topAlignment>
        <VStack space="2xl">
          <SegmentedButtons<PublicPage>
            buttons={[
              {
                title: "Task",
                pageName: "task",
              },
              {
                title: "Review",
                pageName: "review",
              },
              {
                title: "Reactions",
                pageName: "reactions",
              },
            ]}
            currentPage={page}
            setPage={setPage}
            noCard
          />

          <EssayDataContext.Provider
            value={{
              type: "public",
              data,
              error,
              isPending,
              isError,
            }}
          >
            <Pager
              currentPage={page}
              pages={[
                {
                  page: "task",
                  component: <TaskPage />,
                },
                {
                  page: "review",
                  component: <ReviewForm />,
                },
                {
                  page: "reactions",
                  component: <ReactionsForm />,
                },
              ]}
            />
          </EssayDataContext.Provider>
        </VStack>
      </Container>
    </>
  );
}
