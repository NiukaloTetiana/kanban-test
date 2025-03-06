import { Container } from "@chakra-ui/react";

import { IssuesBoard, Links, Loader, SearchBar } from "../components";
import { useAppSelector } from "../hooks";
import { selectIsLoading } from "../redux";

export const App = () => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <Container maxWidth={{ base: "375px", md: "768px", lg: "1280px" }} py={10}>
      <SearchBar />
      <Links />
      <IssuesBoard />

      {isLoading && <Loader />}
    </Container>
  );
};
