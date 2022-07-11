import React, { FC } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { Recipe } from '../../stor/slices/recipeSlice'
import { useForm } from 'react-hook-form'
import { useDeleteRecipeMutation } from '../../stor/api/recipeApi'

interface DeleteRecipeProps {
  recipe: Recipe
  // deleteRecipe: (recipe: Recipe) => void
}

const DeleteRecipe: FC<DeleteRecipeProps> = ({ recipe }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const { handleSubmit } = useForm()

  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation()

  const onSubmit = () => {
    deleteRecipe(recipe.id).then(() => navigate(`/recipes`))
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        colorScheme="red"
        aria-label="Delate"
        fontSize="20px"
        icon={<FaTrashAlt />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Удалить рецепт </ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <Text>Вы уверены что хотите удалить {recipe.name}?</Text>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isDeleting}
              >
                Да
              </Button>
              <Button onClick={onClose}>Отмена</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteRecipe
