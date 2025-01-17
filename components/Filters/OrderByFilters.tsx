import { Flex, Text } from '@chakra-ui/react';
import { useDAO } from 'contexts';
import { InterestsFilter } from './InterestsFilter';
import { OrderFilter } from './OrderFilter';
import { PeriodFilter } from './PeriodFilter';
import { StatFilter } from './StatFilter';

export const OrderByFilters = () => {
  const { theme } = useDAO();
  return (
    <Flex gap="4" align="end" flexDir={['row']} flexWrap="wrap">
      <Flex flexDir="column" w={{ base: 'full', md: 'max-content' }}>
        <Text fontFamily="heading" color={theme.filters.head}>
          Filter by
        </Text>
        <InterestsFilter />
      </Flex>
      <Flex flexDir="column" w={{ base: 'full', md: 'max-content' }}>
        <Text fontFamily="heading" color={theme.filters.head}>
          Order by
        </Text>
        <StatFilter />
      </Flex>
      <Flex
        flex="1"
        gap={{ base: '1', sm: '2' }}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <OrderFilter />
        <PeriodFilter />
      </Flex>
    </Flex>
  );
};
