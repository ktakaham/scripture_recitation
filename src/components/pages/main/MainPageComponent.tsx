import {
  Center,
  Box,
  Container,
  Textarea,
  Button,
  Highlight,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const MainPageComponent = () => {
  let [array, setArray] = useState(null);
  let [hide, setHide] = useState([""]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    const myArray = values.name.replaceAll("　", " ").split(" ");
    setArray(myArray);
    setValue("name", "");
  };

  return (
    <Container maxW="900px">
      <Center h="100px" mt={50}>
        <Heading lineHeight="tall">あんしょうせいく</Heading>
      </Center>
      {array ? (
        <Box w="90%" p={5}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>みことば</Th>
                  <Th w="4">かくすボタン</Th>
                  <Th w="4">みるボタン</Th>
                </Tr>
              </Thead>
              <Tbody>
                {array.map((text) => (
                  <Tr key={text}>
                    <Td>
                      <Heading lineHeight="tall">
                        <Highlight
                          query={hide}
                          styles={{
                            px: "1",
                            py: "1",
                            bg: "black",
                            rounded: "4",
                          }}
                        >
                          {text}
                        </Highlight>
                      </Heading>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={(e) => {
                          setHide([...hide, text]);
                        }}
                      >
                        かくす
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={(e) => {
                          setHide(hide.filter((hide, index) => hide !== text));
                        }}
                      >
                        みる
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box mt={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="name">
                暗記箇所ごとにスペースで区切って入力ください
              </FormLabel>
              <Textarea
                id="name"
                placeholder="みことば"
                {...register("name", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
};
