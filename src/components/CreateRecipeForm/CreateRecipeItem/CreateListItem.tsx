import React, { FC } from 'react'
import { FaMinus } from 'react-icons/fa'
import { Reorder } from 'framer-motion'

import ItemEditModal from './ItemEditModal'

import {
  Badge,
  Box,
  Text,
  IconButton,
  Spacer,
  ButtonGroup,
} from '@chakra-ui/react'

import { RecipeStep } from '../../../stor/slices/recipeSlice'

interface CreateListItemProps {
  item: RecipeStep
  onEdit: (value: RecipeStep) => void
  onRemove: (id: string) => void
}

const CreateListItem: FC<CreateListItemProps> = ({
  item,
  onEdit,
  onRemove,
}) => {
  // const [done, setDone] = useState(false)
  // const handlerDone = () => {
  //   setDone(done ? false : true)
  // }

  return (
    <Reorder.Item value={item} id={item.id}>
      <Box
        minW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        // backgroundColor={done ? 'green.500' : undefined}
        cursor="grab"
        pos="relative"
        mb={4}
        mt={4}
        key={item.id}
        // onClick={() => {
        //   // handlerDone()
        // }}
      >
        <Box p="4">
          <Box display="flex" alignItems="baseline">
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
              {item.text}
            </Box>
            <Spacer />
            <ButtonGroup gap="0.4">
              <ItemEditModal step={item} onEdit={onEdit} />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="delate"
                icon={<FaMinus />}
                onClick={() => {
                  onRemove(item.id)
                }}
              />
            </ButtonGroup>
          </Box>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {item.timer ? <Text>Timer</Text> : <Text>Operation</Text>}
          </Badge>
        </Box>
      </Box>
    </Reorder.Item>
  )
}

export default CreateListItem
