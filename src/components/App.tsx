import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { IssuesBoard, Links, Loader, SearchBar } from "../components";
import { useAppSelector } from "../hooks";
import { selectIsLoading } from "../redux";
import { getRepoInfo } from "../helpers";

export const App = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const [repoKey, setRepoKey] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      const repoInfo = getRepoInfo(query);
      const repoId = repoInfo.owner + "/" + repoInfo.repo;

      setRepoKey(repoId);
    }
  }, [searchParams]);

  return (
    <Container maxWidth={{ base: "375px", md: "768px", lg: "1280px" }} py={10}>
      <SearchBar />
      <Links repoKey={repoKey} />
      <IssuesBoard repoKey={repoKey} />

      {isLoading && <Loader />}
    </Container>
  );
};
