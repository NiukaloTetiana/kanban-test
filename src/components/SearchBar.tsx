import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { InputGroup } from "./ui/input-group";
import { Button, CloseButton, Flex, Input, Text } from "@chakra-ui/react";

import { githubRepoRegex } from "../constants";
import { getRepoInfo } from "../helpers";
import { useAppDispatch } from "../hooks";
import { getIssues } from "../redux";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const isValid = githubRepoRegex.test(query);

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      setQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (trimmedQuery && isValid) {
      setSearchParams({ query });

      const repoInfo = getRepoInfo(query);

      dispatch(getIssues(repoInfo))
        .unwrap()
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClearClick = () => {
    setQuery("");
    setSearchParams({});
  };

  return (
    <>
      <Flex
        as="form"
        gap={4}
        w="full"
        alignItems="center"
        onSubmit={handleSearch}
      >
        <InputGroup
          flex={1}
          pr={1}
          endElement={
            query ? (
              <CloseButton
                transition="0.35s"
                _hover={{ color: "#f9f9f9", transform: "scale(1.2)" }}
                _focusVisible={{ color: "#f9f9f9", transform: "scale(1.2)" }}
                onClick={handleClearClick}
              />
            ) : null
          }
        >
          <Input
            placeholder="Enter repo URL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="md"
            h={{ base: "44px", md: "50px" }}
            borderRadius="12px"
            bg="#262626"
            px={4}
            color="#f9f9f9"
            border="1px solid"
            borderColor="transparent"
            _placeholder={{ color: "#686868" }}
            _focus={{
              borderColor: "#f9f9f919",
              boxShadow: "0 0 4px #f9f9f919",
            }}
            _hover={{
              borderColor: "#f9f9f919",
              boxShadow: "0 0 4px #f9f9f919",
            }}
            transition="0.5s"
            flex="1"
          />
        </InputGroup>

        <Button
          type="submit"
          h={{ base: "44px", md: "50px" }}
          w={{ base: "110px", md: "138px" }}
          border="1px solid"
          borderColor="#f9f9f933"
          bg="transparent"
          color="#f9f9f9"
          py={{ base: "14px", md: "16px" }}
          borderRadius="30px"
          textAlign="center"
          fontWeight="bold"
          lineHeight="1"
          letterSpacing="0.02em"
          transition="0.5s"
          _hover={{
            borderColor: "transparent",
            bg: "#f9f9f9",
            color: "#1f1f1f",
          }}
          _focusVisible={{
            borderColor: "transparent",
            bg: "#f9f9f9",
            color: "#1f1f1f",
          }}
          disabled={!isValid && Boolean(query)}
        >
          Load issues
        </Button>
      </Flex>

      {!isValid && query && (
        <Text color="red.700" pl={4} fontSize={{ base: "12px", md: "14px" }}>
          Please enter a valid GitHub repository URL
        </Text>
      )}
    </>
  );
};
