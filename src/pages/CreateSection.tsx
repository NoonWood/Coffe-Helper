import React, { FC } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import CreateSectionForm from '../components/CreateSectionForm/CreateSectionForm'
import { addSectionAction, Section } from '../stor/slices/sectionSlice'
import { useAppDispatch } from '../hooks/hooksRedux'
import { v4 as uid } from 'uuid'

const CreateSection: FC = () => {
  const dispatch = useAppDispatch()

  const addSection = (newSection: Section) => {
    newSection.id = uid()
    dispatch(addSectionAction(newSection))
  }

  return (
    <>
      <Box py="2">
        <Heading size="xl">Create Section</Heading>
        <CreateSectionForm addSection={addSection} />
      </Box>
    </>
  )
}

export default CreateSection
