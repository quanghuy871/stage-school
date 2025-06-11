"use client";

import React, { JSX } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FormProvider, { useFormProvider } from "./form-provider";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { useDropzone } from "react-dropzone";
import client from "@/sanity/lib/client";

const typeRules = {
  password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  tel: /[0-9 \-\(\)]+/g,
  number: /^-?\d+\.?\d*$/,
  text: undefined,
};

const FieldRenderer = ({
  field,
  renderField,
  schema,
  loading,
  index,
  loadingFiles,
  setLoadingFiles,
}) => {
  
  const [successfulUpload, setSuccessfulUpload] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const fieldName = slugify(field.fieldName, { lower: true, strict: true });
  const typename = field.inputType;
  const provider = useFormProvider();
  const formOriginalId = schema._id
  
  const { getInputProps } = useDropzone({
    multiple: false,
    disabled: loading,
    onDrop: (droppedFiles) => {
      if (loadingFiles.includes(field.fieldId?.current)) return;

      const file = droppedFiles[0];
      const fileReader = new FileReader();
      provider?.clearErrors(fieldName);
      setFile(file);
      setLoadingFiles((e) => [...e, field.fieldId?.current]);
      setSuccessfulUpload(false);

      fileReader.onloadend = (evt) => {

        if (evt.target.readyState === FileReader.DONE) {
          const uint = new Uint8Array(evt.target.result.slice(0, 600));

          fetch(`/api/file`, {
            method: "POST",
            body: JSON.stringify({
              id: formOriginalId,
              fieldId: field.fieldId?.current,
              bytes: uint,
              file: file,
              fullFileName: file.name,
            })
          }).then((res) => res.json()).then((res) => {
                if (res.reason) {
                  provider.setError(fieldName, {
                    type: 'pattern',
                    message: res.reason
                });
                setLoadingFiles((e) => [...e.filter(y => y !== field.id)]);
                setFile(null);
                setSuccessfulUpload(false);
              } 
              else {
                  const fd = new FormData();
                  fd.append('file', file);
                  
                  fetch(`/api/file-upload`, {
                    method: "POST",
                    body: fd,
                  }).then((res) => res.json()).then(res => {
                    if (res.ok) {
                      const uploadedFileUrl = res.meta.previewPDF;
                      provider.setValue(fieldName, uploadedFileUrl, {shouldValidate: true});
                      provider.clearErrors(fieldName);
                      setSuccessfulUpload(true);
                    } else {
                      provider.setError(fieldName, {
                        type: "pattern",
                        message: "File could not be uploaded",
                      });
                      setSuccessfulUpload(false);
                      setFile(null);
                    }

                  setLoadingFiles((e) => [...e.filter((y) => y !== field.fieldId?.current)]);
                })
              }
          })
        }
      }
      fileReader.readAsArrayBuffer(file);
    },
  });

  if (!provider) {
    throw new Error("useFormProvider must be used within a FormProvider");
  }

  const hookRegistration = provider.register(
    slugify(field.fieldName, { lower: true, strict: true }),
    {
      required: field.required,
      pattern: (() => {
        if (field.inputType === "email") {
          return typeRules.email;
        }
        if (field.inputType === "tel") {
          return typeRules.tel;
        }
        return undefined;
      })(),
    }
  );

  const registration = typename === "file" ? getInputProps() : hookRegistration;

  return renderField(
    {
      index: index,
      id: `form-${schema._id}-${field.fieldId?.current}`,
      label: field.fieldName,
      placeholder: field.placeholder,
      subtitle: field.subtitle,
      disabled: loading,
      hasErrors: !!(
        provider.errors &&
        provider.errors[slugify(field.fieldName, { lower: true, strict: true })]
      ),
      errors:
        provider.errors &&
        provider.errors[slugify(field.fieldName, { lower: true, strict: true })]
          ? [
              provider.errors[
                slugify(field.fieldName, { lower: true, strict: true })
              ],
            ].map((x) => {
              if (x?.type === "required") {
                return "This is a required field.";
              }
              if (x?.type === "pattern") {
                if (field.inputType === "email") {
                  return "This is not a valid email.";
                }
                if (field.inputType === "phone") {
                  return "This is not a valid phone number.";
                }
                return "This is not valid.";
              }
              if (x?.type === "maxLength") {
                return "Maximum length exceeded.";
              }
              if (x?.type === "minLength") {
                return "This is not long enough.";
              }
            })
          : [],
      type: (() => {
        return field.inputType.toLowerCase();
      })(),
      invalid: !!(
        provider.errors &&
        provider.errors[slugify(field.fieldName, { lower: true, strict: true })]
      ),
      options: (field.options || []).map((x) => ({
        label: x,
        value: slugify(x, { lower: true, strict: true }),
        id: `field-${field._key}-${index}-${slugify(x, { lower: true, strict: true })}`,
      })),
      required: field.required,
      isUploadingFile: loadingFiles.includes(field.fieldId?.current),
      fileUploadSuccessful:
        !loadingFiles.includes(field.fieldId?.current) && successfulUpload,
      autoComplete: field.autocomplete,
      files: file ? [file] : null,
      ...registration,
    },
    provider.getValues()
  );
};

const Form = ({
  schema,
  redirectTo,
  onSubmitting,
  renderField,
  onPreSubmit,
  renderApiErrors,
  renderSubmitButton,
  renderLoadingSpinner,
}) => {
  const [loadingFiles, setLoadingFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [apiErrors, setApiErrors] = React.useState([]);
  const [confirmationMessage, setConfirmationMessage] = React.useState("");
  const router = useRouter();
  const values = {};

  if (!renderField) {
    throw new Error("renderField must be defined on Form");
  }

  if (!renderSubmitButton) {
    throw new Error("renderSubmitButton must be defined on Form");
  }

  if (!renderApiErrors) {
    throw new Error("renderApiErrors must be defined on Form");
  }

  if (!renderLoadingSpinner) {
    throw new Error("renderLoadingSpinner must be defined on Form");
  }

  const onSubmit = async (data) => {
    setLoading(true);
    setApiErrors([]);
    if (onSubmitting) {
      onSubmitting();
    }

    let formData = onPreSubmit ? onPreSubmit(data) : data;

    if (schema.webhookUrl) {
      const webhookPayload = {
        ...formData,
        webhookUrl: schema.webhookUrl,
      };

      fetch("/api/zapier-webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send data to Zapier.");
          }
          return response.json();
      })
        .then((data) => {
          console.log("Data sent to Zapier successfully:", data);
      })
        .catch((error) => {
          console.error("Error sending data to Zapier:", error);
      });
    }

    fetch(`/api/form-submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: formData,
      }),
    })
      .then((res) => {  
        return new Promise((resolve, reject) => {
          res.text().then((e) => {
            if (!res.ok) {
              if (e.includes("{")) {
                const json = JSON.parse(e);
                // console.error(json.message, json.reason);
                reject({ message: json.message });
              } else {
                const message = "An unknown error occurred.";
                console.log(message, res.statusText);
                reject({ message });
              }
            } else {
              resolve(JSON.parse(e));
            }
          });
        });
      })
      .then((res) => {
        if (res.meta) {
          if (res.meta.redirectTo && res.meta.confirmationMessage) {
            setConfirmationMessage(res.meta.confirmationMessage);
            setTimeout(() => {
              router.push(res.meta.redirectTo);
            }, 4000);
          } else if (res.meta.redirectTo) {
            router.push(res.meta.redirectTo);
          } else if (res.meta.confirmationMessage) {
            setConfirmationMessage(res.meta.confirmationMessage);
          }
        }
      })
      .catch((err) => {
        setApiErrors([err.message]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormProvider values={values} disabled={loading} onSubmit={onSubmit}>
      {schema.field?.formFields.map((field, idx) => (
        <FieldRenderer
          key={field.fieldId?.current}
          field={field}
          renderField={renderField}
          schema={schema}
          loading={loading}
          index={idx}
          loadingFiles={loadingFiles}
          setLoadingFiles={setLoadingFiles}
        />
      ))}
      {renderSubmitButton({
        type: "submit",
        children: loading
          ? renderLoadingSpinner()
          : schema.submitButtonText || "Submit",
        disabled: loading,
      })}
      {apiErrors &&
        apiErrors.length > 0 &&
        renderApiErrors({
          errors: apiErrors,
        })}
    </FormProvider>
  );
};

export default Form;
