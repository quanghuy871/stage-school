export default {
  name: 'formFields',
  title: 'Form Fields',
  type: 'object',
  fields: [
    {
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'fieldName',
      title: 'Field Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      hidden: ({ parent }) => parent.inputType !== 'file',
    },
    {
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'fieldId',
      title: 'Field ID',
      type: 'slug',
      options: {
        source: (doc, options) => options.parent.fieldName,
        maxLength: 200,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent.inputType !== 'select' && parent.inputType !== 'radio',
    },
    {
      name: 'inputType',
      title: 'Input Type',
      type: 'string',
      initialValue: 'text',
      options: {
        layout: 'dropdown',
        list: [
          {value: 'text', title: 'Text Input'},
          {value: 'textArea', title: 'Text Area'},
          {value: 'email', title: 'Email'},
          {value: 'phone', title: 'Phone number'},
          {value: 'select', title: 'Select'},
          {value: 'radio', title: 'Radio'},
          {value: 'file', title: 'File'},
        ],
      },
      validation: Rule => Rule.required(),
    },
  ],
};