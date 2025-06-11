export type FormField = {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
};

export type OnRedirect = (url: string) => void;

export type Form = {
  field?: FormField[];
  onRedirect?: OnRedirect;
};