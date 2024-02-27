import { useState, useEffect } from "react";
export const useFormUpdate = () => {
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormUpdated) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormUpdated]);

  const handleFormUpdate = () => {
    setIsFormUpdated(true);
  };

  useEffect(() => {
    const formElements = document.querySelectorAll(
      "form input, form select, form textarea"
    );
    const handleFieldChange = () => {
      setIsFormUpdated(true);
    };

    formElements.forEach((element) => {
      element.addEventListener("change", handleFieldChange);
    });

    return () => {
      formElements.forEach((element) => {
        element.removeEventListener("change", handleFieldChange);
      });
    };
  }, []);

  return handleFormUpdate;
};
