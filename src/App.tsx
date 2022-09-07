import { Center } from "@chakra-ui/react";
import * as React from "react";
import { useGetEncountersForActiveAttempt } from "./api/encounters";
import { CreateEncounterForm } from "./components/CreateEncounterForm";

export const App = () => {
  // const { data, isLoading, isError } = useGetEncountersForActiveAttempt();

  // React.useEffect(() => {
  //   console.log("Data: ", data);
  // }, [data]);

  return (
    <Center h="100vh" w="100vw" backgroundColor="AppWorkspace">
      <CreateEncounterForm />
    </Center>
  );
};
