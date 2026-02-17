import { VStack } from "@/components/ui/vstack";
import Pager from "@/src/components/Pager";
import SegmentedButtons from "@/src/components/segmentedButtons";
import queryKeyPrefixes from "@/src/constants/queryKeyPrefixes";
import Container from "@/src/ui/Container";
import TopBar from "@/src/ui/TopBar";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { use, useEffect, useState } from "react";
import ReactionsPage from "../shared/components/ReactionsPage";
import ReviewPage from "../shared/components/ReviewPage";
import EssayDataContext from "../shared/context/EssayDataContext";
import { EssayNavigationContext } from "../shared/context/EssayNavigationProvider";
import { PrivatePage } from "../shared/types/page";
import getEssayWithImageData from "./api/getEssayWithImageData";
import WriteForm from "./components/WriteForm";

export default function PrivateEssayScreen() {
  const { id } = useLocalSearchParams();
  const isNewEssay = id === "new-essay";

  const [page, setPage] = useState<PrivatePage>("write");

  const { navigationIntent, setNavigationIntent } = use(
    EssayNavigationContext,
  )!;

  useEffect(() => {
    if (navigationIntent === "review") {
      setPage("review");
      setNavigationIntent?.(null);
    }
  }, [navigationIntent, setNavigationIntent]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryKeyPrefixes.privateEssay, Number(id as string)],
    queryFn: () => getEssayWithImageData(Number(id as string)),
    enabled: !isNewEssay,
  });

  return (
    <>
      <TopBar
        title={`${isNewEssay ? "New" : "Edit"} essay`}
        backToHref="/(tabs)/private"
        solidBackground
      />

      <Container topAlignment>
        <VStack space="2xl">
          <SegmentedButtons<PrivatePage>
            buttons={[
              {
                title: "Write",
                pageName: "write",
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
              type: "private",
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
                  page: "write",
                  component: <WriteForm />,
                },
                {
                  page: "review",
                  component: <ReviewPage />,
                },
                {
                  page: "reactions",
                  component: <ReactionsPage />,
                },
              ]}
            />
          </EssayDataContext.Provider>
        </VStack>
      </Container>
    </>
  );
}
