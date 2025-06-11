import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

export interface FormContext {
  register: UseFormRegister<FieldValues>;
  control: Control;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  reset: UseFormReset<any>;
  trigger: UseFormTrigger<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
}

export interface FormProviderProps {
  /**
   * On submit, values from the child form components will be
   * returned in the format:
   * [key: string]: value (any) - instead of the native
   * event.
   * This makes it easy to further process the data or send it to an endpoint,
   * without worrying about handling.
   * */
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode | React.ReactNode[] | string | null | undefined;
  values?: Partial<FieldValues>;
  disabled?: boolean;
}

const FormContext = React.createContext<FormContext>(null as any);

/**
 * This creates an instance of <form /> that you can use Primitive Input, Select, Checkbox, Radio, etc elements in.
 * It wraps form elements in a React Context and a form tag so that you can access values and error messages anywhere
 * within your form. React-Hook-Form is used underneath.
 * @alias FormProviderProps
 * */
const FormProvider = React.forwardRef<HTMLFormElement, FormProviderProps>(
  ({ children, onSubmit, values, disabled, ...rest }, ref) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      setValue,
      getValues,
      reset,
      trigger,
      watch,
      setError,
      clearErrors,
    } = useForm();

    const getFormData = () => {
      return getValues();
    };

    /*React.useEffect(() => {
            watch((x) => {
                console.log(x)
            })
        }, [])*/

    // Avoiding useMemo here as it interferes with error messages from hook form because
    // shallow compare won't go deep enough to differentiate
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const value = {
      register,
      control,
      handleSubmit,
      errors,
      setValue,
      getValues,
      reset,
      trigger,
      watch,
      setError,
      clearErrors,
      getFormData,
    };

    const valueComparator = JSON.stringify(values);

    React.useEffect(() => {
      if (values) {
        Object.entries(values).forEach(([k, v]) => {
          setValue(k, v);
        });
      }
      // eslint-disable-next-line
    }, [valueComparator]);

    return (
      <FormContext.Provider value={value}>
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          style={{
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? "0.7" : "1",
          }}
          {...rest}
        >
          <fieldset
            disabled={disabled}
            aria-disabled={disabled}
            /*
             * Little hack to make it WAI-ARIA and disable
             * for non-mouse users, without adding another layer of style
             * */
            // style={{ display: "contents" }}
          >
            {children}
          </fieldset>
        </form>
      </FormContext.Provider>
    );
  }
);

FormProvider.displayName = "FormProvider";

export default FormProvider;

/**
 * This will give you access to a FormProvider parent's values
 * if it exists. It is not guaranteed to exist,
 * so check if it returns values before using.
 * */
export const useFormProvider = (): FormContext | undefined =>
  React.useContext(FormContext);
