import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// ... (other imports)

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const apiResponse = await submit(values);
        if (apiResponse.type === "success") {
          // Show success alert using onOpen from useAlertContext
          onOpen("success", `Submitted successfully: ${values.firstName}`);
          // Reset the form
          resetForm();
        } else {
          onOpen("error", apiResponse.message);
        }
      } catch (error) {
        // Handle API call error (e.g., show error message)
        onOpen("error", "An error occurred while submitting the form.");
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      type: Yup.string().required("Type is required"),
      comment: Yup.string().required("Comment is required"),
    }),
  });

  const firstNameProps = formik.getFieldProps("firstName");
  const emailProps = formik.getFieldProps("email");
  const typeProps = formik.getFieldProps("type");
  const commentProps = formik.getFieldProps("comment");

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        {/* ... (rest of the JSX) */}
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...firstNameProps}
                />
                <FormErrorMessage>
                  {formik.errors.firstName}
                </FormErrorMessage>
              </FormControl>
              {/* ... (other form fields) */}
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
