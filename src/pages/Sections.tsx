import { FC, useState } from 'react'
import { Heading, Box, Stack, Skeleton, Flex } from '@chakra-ui/react'
import CardAdd from '../components/CardAdd/CardAdd'
import CardList from '../components/CardList/CardList'
import useAuth from '../hooks/useAuth'
import { useListSectionsLimitQuery } from '../stor/api/sectionApi'
import Pagination from '../components/Pagination/Pagination'

const Sections: FC = (props) => {
  const [page, setPage] = useState(1)
  const { data, error, isLoading, isSuccess, isFetching } =
    useListSectionsLimitQuery({
      page: page,
      limit: 6,
    })
  const { isAuth } = useAuth()

  return (
    <>
      <Box py="2">
        <Heading size="xl">Sections</Heading>

        <Box>
          {error && <p>An error occured</p>}
          {/* {isLoading && <p>Loading...</p>} */}
        </Box>

        {isFetching && (
          <Flex gap={6}>
            <Skeleton p={6} w={'315px'} h={'180px'} isLoaded={false} />
            <Skeleton p={6} w={'315px'} h={'180px'} isLoaded={false} />
          </Flex>
        )}

        {isSuccess && !isFetching && (
          <Box>
            <CardList cards={data?.items} />
            {isAuth && <CardAdd to={'/sections/new'} name="Section" />}
          </Box>
        )}

        <Box pt={4}>
          <Pagination
            setPage={setPage}
            page={page}
            totalPage={data?.meta.totalPages}
            isFetching={isFetching}
          />
        </Box>
      </Box>
    </>
  )
}

export default Sections
