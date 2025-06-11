import {ActivityIcon} from '@sanity/icons'

export default {
  name: 'formBuilder',
  title: 'Form Builder',
  type: 'object',
  fields: [
    {
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{type: 'formFields'}],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Custom form setup`,
        subtitle: `Form Builder`,
      }
    },
  },
}