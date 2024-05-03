import { FC } from 'react';
import { Flex, Grid, GridItem, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

interface SkeletonProps {
  size: number;
}

export const Skeleton: FC<SkeletonProps> = ({ size }) => {
  const skeletons = new Array(size).fill(1);
  const columns = ['1fr', '1fr', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)'];

  return (
    <Grid gridTemplateColumns={columns} gap="10px">
      {skeletons.map((_, idx) =>
        <GridItem key={idx}>
          <Flex
            padding="15px"
            boxShadow="md"
            flexDirection="column"
            justify="space-between"
            w="205px"
            h="130px"
            borderRadius="sm"
          >
            <SkeletonCircle size="10" borderRadius="0px"/>
            <SkeletonText noOfLines={1} skeletonHeight="2" />
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};
