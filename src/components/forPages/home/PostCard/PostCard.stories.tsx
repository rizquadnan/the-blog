import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { PostCard } from './PostCard'

type TPostCard = React.ComponentProps<typeof PostCard>
export default {
  title: 'Data Display/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
} as Meta<TPostCard>

const Template: Story<TPostCard> = (args) => <PostCard {...args} />

const requiredProps: TPostCard = {
  imageProps: {
    src: 'https://picsum.photos/1000/1000',
    alt: 'Random',
  },
  title:
    'Inventore patruus traho decens accedo socius umbra est caritas ullam autem statua surculus.',
  content:
    'Laboriosam candidus conventus. Bestia adipisci vicissitudo. Appono iure victus. Omnis vito aut. Umbra vero capillus. Unus quis thesis. Alioqui constans ipsum. Acsi deprecator vitae. Tergum tepesco supellex. Viriliter asporto pecunia. Velit deduco eum. Spargo toties totus. Trepide avoco depopulo. Sublime et creber. Nihil quos vero. Suggero itaque vorax. Sui thema decens. Et aestivus colo. Solio administratio alienus. Unde amoveo tristis. Arto accipio solum. Solium socius strenuus.',
  author: String(267738),
}
export const Default = Template.bind({})
Default.args = requiredProps

export const Loading = Template.bind({})
Loading.args = {
  ...requiredProps,
  isLoading: true,
}
