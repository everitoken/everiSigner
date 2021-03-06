import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}
addDecorator(withInfo)

configure(loadStories, module)
