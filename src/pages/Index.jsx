import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };
  const toast = useToast();

  //... rest of the existing handleColorChange and handleInputChange functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = Date.now();
    setUniqueNumber(newUniqueNumber);
    onOpen();
    if (isPreview) {
      setIsPreview(false);
      return;
    }
    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //... rest of the existing return statement up to the <Container>

  const shippingLabel = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Label</ModalHeader>
        <ModalBody>
          <Box p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber}
            </Heading>
            <Box>
              Wilhelm Röntgenstraat 10
              <br />
              8013NC Zwolle
              <br />
              Nederland
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => window.print()}>
            Print Label
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {shippingLabel}
      <Container maxW="container.md" py={10}>
        {isPreview ? (
          <VStack spacing={4} align="stretch" mt={4}>
            <Box>Sample Type: {form.sampleType}</Box>
            <Box>Selected Colors: {form.colors.join(", ")}</Box>
            <Box>Contact Name: {form.name}</Box>
            <Box>Email: {form.email}</Box>
            <Box>Phone: {form.phone}</Box>
            <Box>Company Name: {form.companyName}</Box>
            <Box>Line Speed: {form.lineSpeed}</Box>
            <Box>Print Size: {form.printSize}</Box>
            <Button colorScheme="blue" onClick={handleEdit}>
              Back to Edit
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Confirm and Submit
            </Button>
          </VStack>
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel htmlFor="sampleType">Sample Type</FormLabel>
              <Select id="sampleType" placeholder="Select sample type" onChange={(e) => setForm({ ...form, sampleType: e.target.value })}>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="colors">Colors</FormLabel>
              <CheckboxGroup colorScheme="blue" onChange={(value) => setForm({ ...form, colors: value })}>
                <Stack spacing={5} direction="row">
                  <Checkbox value="red">Red</Checkbox>
                  <Checkbox value="blue">Blue</Checkbox>
                  <Checkbox value="green">Green</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" type="text" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <Input id="phone" type="tel" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <Input id="companyName" type="text" onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lineSpeed">Line Speed (m/s)</FormLabel>
              <Input id="lineSpeed" type="number" onChange={(e) => setForm({ ...form, lineSpeed: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="printSize">Print Size (cm²)</FormLabel>
              <Input id="printSize" type="number" onChange={(e) => setForm({ ...form, printSize: e.target.value })} />
            </FormControl>
            <Button colorScheme="blue" onClick={handlePreview}>
              Preview
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
