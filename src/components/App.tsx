import { Container } from "@chakra-ui/react";
import { Links, SearchBar } from "../components";

export const App = () => {
  return (
    <Container maxWidth={{ base: "375px", md: "768px", lg: "1280px" }} py={10}>
      <SearchBar />
      <Links />
    </Container>
  );
};
