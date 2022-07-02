import React, { FC } from 'react'
import { Reorder } from 'framer-motion'

import CreateListItem from './CreateListItem'
import { RecipeStep } from '../../../stor/slices/recipeSlice'
interface ItemGroupProps {
  steps: RecipeStep[]
  setSteps: React.Dispatch<React.SetStateAction<RecipeStep[]>>
  onEdit: (value: RecipeStep) => void
  onRemove: (id: string) => void
}
const ItemGroup: FC<ItemGroupProps> = ({
  steps,
  setSteps,
  onEdit,
  onRemove,
}) => {
  return (
    <Reorder.Group axis="y" as="ol" onReorder={setSteps} values={steps}>
      {steps.map((item) => (
        <CreateListItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </Reorder.Group>
  )
}

export default ItemGroup
