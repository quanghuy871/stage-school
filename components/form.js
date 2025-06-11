"use client"

import React from "react";
import Form from "../primitives/form";
import dynamic from 'next/dynamic';
import { ArrowUp } from "./blocks/icons";
import HyperionLink from "./hyperion-link";
import { Loader } from "./blocks/icons";
const Select = dynamic(() => import('react-select'), { ssr: false });

const FormComponent = (props) => {
  const redirectTo = {
    slug: props?.onRedirect?.internalLink?.slug?.current || '',
    confirmationMessage: props?.onRedirect?.internalLink?.title || '',
  }
  
  return (
    <Form 
      schema={props}
      onPreSubmit={props.onPreSubmit}
      redirectTo={redirectTo}
      renderField={(field) => {
        if ((field.type === "text" || field.type === "email" || field.type === "phone")) {
          return (
            <div className={`form__row form__text form__text--${field.name}`}>
              <label className="hidden" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={field.onChange}
                name={field.name}
                id={field.name}
                className={`input ${field.hasErrors ? 'input--error' : ''}`}
                maxLength={field.label === 'Postcode' ? 6 : undefined}
                autoComplete={field.autoComplete}
                placeholder={`${field.hasErrors ? `${field.label} Missing` : field.placeholder}`}
                aria-required={field.required}
                aria-errormessage={field.hasErrors ? field.errors.join(", ") : undefined}
                aria-invalid={field?.invalid}
              />
              {field.hasErrors && (
                <div className="hidden" role="alert">{field.errors.join(", ")}</div>
              )}
            </div>
          )
        }
        if (field.type === "textarea") {
          return (
            <div className='form__row form__textarea'>
              <label className="mt-4 md:mt-0 mb-5 block" htmlFor={field.name}>
                  {field.label}
              </label>
              <textarea
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={field.onChange}
                name={field.name}
                id={field.id}
                className="input !min-h-[125px] md:!min-h-[10vw]"
                placeholder={field.placeholder}
                aria-required={field.required}
                disabled={field.disabled}
                aria-errormessage={field.hasErrors ? field.errors.join(", ") : undefined}
                aria-invalid={field?.invalid}
              />
              {field.hasErrors && (
                <div className="hidden" role="alert">{field.errors.join(", ")}</div>
              )}
            </div>
          )
        }
        if (field.type === "select") {
          let options = []
          field.options.map((option) => (
            options.push({ value: option.value, label: option.label })
          ))
          const handleTypeSelect = (e) => {
            let event = {
              target: {
                name: field.name,
                value: e.value
              }
            }
            field.onChange(event)
          };
          return (
            <>
              <div className={`form__row form__select form__select--${field.name}`}>
                <label className="hidden" htmlFor={field.id}>
                  {field.label}
                </label>
                <Select
                  classNamePrefix='react-select'
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={handleTypeSelect}
                  id={field.id}
                  name={field.name}
                  aria-required={field.required}
                  disabled={field.disabled}
                  aria-errormessage={field.hasErrors ? field.errors.join(", ") : undefined}
                  aria-invalid={field?.invalid}
                  options={options}
                  placeholder={field.placeholder}
                />
                {field.hasErrors && (
                  <div role="alert">{field.errors.join(", ")}</div>
                )}
              </div>
            </>
          )
        }
        if (field.type === "radio") {
          return (
            <div className='form__row form__radio'>
              <label className="block mb-5 mt-4 md:mt-0 md:mb-0">
                {field.label}
              </label>
              {field.options.map((option, i) => (
                <div className='form__radio-wrapper' key={i}>
                  <input
                    id={option.id}
                    type="radio"
                    value={option.label}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    name={field.name}
                    aria-required={field.required}
                    disabled={field.disabled}
                    aria-errormessage={field.hasErrors ? field.errors.join(", ") : undefined}
                    aria-invalid={field?.invalid}
                  />
                  <label htmlFor={option.id}>{option.label}</label>
                </div>
              ))}
              {field.hasErrors && (
                <div role="alert">{field.errors.join(", ")}</div>
              )}
            </div>
          )
        }
        if (field.type === 'file') {
          return (
            <div className='form__row form__dropzone dropzone w-full mt-[30px]'>
              <label htmlFor={field.id}>
                {field.label}
              </label>
              <p className="text-paragraph-p3 font-[300] mb-4 md:mb-[20px]">{field.subtitle}</p>
              <div className='dropzone__button border border-dashed border-sage-2 bg-wisp-1 px-4 py-[10px] w-full min-h-[80px] md:min-h-[10vh] relative'>
                <div>
                  <input
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      onClick={field.onClick}
                      accept={field.accept}
                      multiple={field.multiple}
                      onDrop={field.onDrop}
                      name={field.name}
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      aria-required={field.required}
                      disabled={field.disabled}
                      aria-errormessage={field.hasErrors ? field.errors.join(", ") : undefined}
                      aria-invalid={field?.invalid}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                    {field.isUploadingFile && "Uploading..."}
                    {field.fileUploadSuccessful && (<div>
                      {
                        field.files && <div className="dropzone__content">
                        {field.files.map((file) => (
                          <p className="font-[700]" key={file.name}>{file.name} (Uploaded)</p>
                        ))}
                      </div>
                      }
                    </div>)}
                    {(!field.isUploadingFile && !field.fileUploadSuccessful) && <div className='text-paragraph-p1 font-[350]'><span className="font-semibold underline">Attach</span> or <span className="font-semibold underline">enter a URL</span> here.</div>}
                </div>
              </div>
                <div className='dropzone__content'>
                  {field.hasErrors ? (
                    <>
                      <p><strong>There was an issue uploading your file.</strong></p>
                      <div role="alert">{field.errors.join(", ")}</div>
                    </>
                  ) : (
                    null
                  )}
                </div>
            </div>
          )
        }
        return (
          <div>Field is not defined!</div>
        )
      }}
      renderApiErrors={({ errors }) => (
        <div role="alert" className="api-error">{errors.join(", ")}</div>
      )}
      renderSubmitButton={({ type, children, disabled }) => (
        <div className="form__row form__submit mt-4 md:mt-[30px] w-full md:w-auto md:ml-auto">
          <HyperionLink tag="button" disabled={disabled} type='submit' className="py-[7px] md:min-w-[230px] h-[42px] max-h-[42px] btn btn-hyperion--orange w-full md:w-auto">
            <span>{children}
            {!disabled ? <ArrowUp color="#ffffff" /> : "" }
            </span>
          </HyperionLink>
        </div>
       ) }
      renderLoadingSpinner={() => <div className='form__loading flex items-center justify-center w-full'><Loader/></div>}
    />
  )
}

export default FormComponent;