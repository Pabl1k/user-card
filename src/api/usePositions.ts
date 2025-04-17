import { useEffect, useState } from 'react';
import { getPositions } from './endpoints';
import { Position } from './types';

export const usePositions = () => {
  const [state, setState] = useState<Position[]>([]);

  const fetchPositions = async () => {
    try {
      const data = await getPositions();

      if (data.success) {
        setState(data.positions);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return {
    positions: state
  };
};
