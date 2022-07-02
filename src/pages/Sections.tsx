import { FC } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useAppSelector } from '../hooks/hooksRedux'
import CardAdd from '../components/CardAdd/CardAdd'
import CardList from '../components/CardList/CardList'
import useAuth from '../hooks/useAuth'

const Sections: FC = () => {
  const sections = useAppSelector((state) => state.section)

  const { isAuth } = useAuth()
  return (
    <>
      <Box py="2">
        <Heading size="xl">Recipe Sections</Heading>
        <CardList cards={sections} />

        {isAuth && <CardAdd to={'/sections/new'} name="Section" />}
      </Box>
    </>
  )
}

export default Sections
