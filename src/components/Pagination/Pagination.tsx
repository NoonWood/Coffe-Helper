import React, { FC } from 'react'
import { Box, HStack, Button, Icon } from '@chakra-ui/react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

interface PaginationProps {
  setPage: (value: React.SetStateAction<number>) => void
  isFetching: boolean
  page: number | undefined
  totalPage: number | undefined
}

const Pagination: FC<PaginationProps> = ({
  setPage,
  isFetching,
  page = 1,
  totalPage = 1,
}) => {
  // if (page === totalPage) {
  //   return null
  // }
  return (
    <HStack spacing="14px">
      <Button
        onClick={() => setPage((prev) => prev - 1)}
        isLoading={isFetching}
        disabled={page === 1}
      >
        <Icon as={MdArrowBack} />
      </Button>
      <Button
        onClick={() => setPage((prev) => prev + 1)}
        isLoading={isFetching}
        disabled={page === totalPage}
      >
        <Icon as={MdArrowForward} />
      </Button>
      <Box>{`${page} / ${totalPage}`}</Box>
    </HStack>
  )
}

export default Pagination
