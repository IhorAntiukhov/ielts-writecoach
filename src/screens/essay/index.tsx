import { VStack } from "@/components/ui/vstack";
import Pager from "@/src/components/Pager";
import SegmentedButtons from "@/src/components/segmentedButtons";
import Container from "@/src/ui/Container";
import TopBar from "@/src/ui/TopBar";
import { useState } from "react";
import ReactionsForm from "./components/ReactionsForm";
import ReviewForm from "./components/ReviewForm";
import WriteForm from "./components/WriteForm";

type Page = "write" | "review" | "reactions";

export default function EssayScreen() {
  const [page, setPage] = useState<Page>("write");

  return (
    <>
      <TopBar title="New essay" backToHref="/(tabs)/private" solidBackground />

      <Container topAlignment>
        <VStack space="2xl">
          <SegmentedButtons<Page>
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

          <Pager
            currentPage={page}
            pages={[
              {
                page: "write",
                component: <WriteForm />,
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
        </VStack>
      </Container>
    </>
  );
}
