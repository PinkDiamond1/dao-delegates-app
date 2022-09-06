import {
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Img,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import { THEME } from 'configs';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { BsCalendar4, BsChat } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import { IoIosCheckboxOutline } from 'react-icons/io';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { ISteward } from 'types';
import { getStewardImage, truncateAddress } from 'utils';

interface IStewardCardProps {
  data?: ISteward;
}

export const StewardCard: FC<IStewardCardProps> = props => {
  const { data } = props;
  const isLoaded = !!data;

  const statIcons = [
    {
      title: 'Stewards since',
      icon: BsCalendar4,
      value: data?.stewardSince ? data.stewardSince : '-',
    },
    {
      title: 'Forum activity',
      icon: BsChat,
      value: data?.forumActivity ? data.forumActivity : '-',
    },
    {
      title: 'Voting weight',
      icon: IoIosCheckboxOutline,
      value: data?.votingWeight ? data.votingWeight : '-',
    },
    {
      title: 'Delegators',
      icon: IoPersonOutline,
      value: data?.delegators ? data.delegators : '-',
    },
    {
      title: 'Off-chain votes',
      icon: AiOutlineThunderbolt,
      value: data?.voteParticipation.offChain
        ? `${data.voteParticipation.offChain}%`
        : '-',
    },
    {
      title: 'On-chain votes',
      icon: AiOutlineThunderbolt,
      value: data?.voteParticipation.onChain
        ? `${data.voteParticipation.onChain}%`
        : '-',
    },
  ];

  const shortAddress = data && truncateAddress(data.address);

  return (
    <Flex
      bgColor={THEME.card}
      flexDir="column"
      px="8"
      py="6"
      borderRadius="16"
      w={['full', '28rem']}
      gap="8"
      boxShadow="0px 0px 10px 1px rgba(0,0,0,0.3)"
      h="500"
    >
      <Flex flexDir="row" gap={['2', '8']} w="full" align="center">
        {data ? (
          <Img
            h={['12', '16']}
            w={['12', '16']}
            borderRadius="full"
            src={getStewardImage(data.address)}
            borderWidth="3px"
            borderColor={THEME.branding}
            borderStyle="solid"
          />
        ) : (
          <SkeletonCircle
            h={['12', '16']}
            w={['14', '20']}
            borderRadius="full"
          />
        )}
        <Flex
          flexDir="column"
          gap="0.5"
          justify="center"
          w="full"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="break-spaces"
        >
          {data ? (
            <>
              <Text
                color={THEME.title}
                fontSize={['lg', 'xl']}
                fontWeight="medium"
              >
                {data.ensName || shortAddress}
              </Text>
              <Text color={THEME.branding} fontSize={['lg', 'xl']}>
                {shortAddress}
              </Text>
            </>
          ) : (
            <>
              <Skeleton isLoaded={isLoaded}>SkeletonText</Skeleton>
              <Skeleton isLoaded={isLoaded}>SkeletonSubText</Skeleton>
            </>
          )}
        </Flex>
      </Flex>

      <Grid gridTemplateColumns="1fr 1fr" w="full" gap="4">
        {statIcons?.map((stat, index) =>
          isLoaded ? (
            <GridItem
              key={+index}
              alignContent="start"
              gap="4"
              flexDir="column"
              w="max-content"
            >
              <Flex gap="1" flexDir="column">
                <Icon as={stat.icon} h="6" w="6" color={THEME.branding} />
                <Text color={THEME.title} fontSize="sm" fontWeight="medium">
                  {stat.title}
                </Text>
                <Text color={THEME.title} fontSize="lg" fontWeight="normal">
                  {stat.value}
                </Text>
              </Flex>
            </GridItem>
          ) : (
            <GridItem
              key={+index}
              alignContent="start"
              gap="4"
              flexDir="column"
              w="full"
            >
              <Flex gap="1" flexDir="column" w="full">
                <SkeletonCircle isLoaded={isLoaded} h="6" w="6">
                  SkeletonText
                </SkeletonCircle>
                <Skeleton isLoaded={isLoaded} w="full" h="6">
                  SkeletonText
                </Skeleton>
                <Skeleton isLoaded={isLoaded} w="full" h="6">
                  SkeletonText
                </Skeleton>
              </Flex>
            </GridItem>
          )
        )}
      </Grid>
      <Flex justify="center" align="center">
        {isLoaded ? (
          <Button
            bgColor={THEME.branding}
            fontSize="xl"
            px="6"
            py="6"
            fontWeight="medium"
            _hover={{}}
            _focus={{}}
            _active={{}}
          >
            Delegate
          </Button>
        ) : (
          <Skeleton isLoaded={isLoaded} w="36" h="12">
            SkeletonText
          </Skeleton>
        )}
      </Flex>
    </Flex>
  );
};