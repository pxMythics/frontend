import isNil from 'ramda/src/isNil';
import { useState } from 'react';

/**
 * Hook to add syntactic sugar to a state to control a modal/overlay shown state
 * It returns an array containing 3 things:
 * 1. shown (boolean)
 * 2. show function
 * 3. hide function
 *
 * e.g.: const [modalShown, showModal, hideModal] = useModalControls();
 * if (modalShown) {
 *   hideModal();
 * } else {yea
 *   showModal();
 * }
 * @param initialSate Optional parameter to set the initial display state of the modal
 */
export const useModalControls = (initialSate?: boolean): [boolean, () => void, () => void] => {
  const [shown, setShown] = useState<boolean>(isNil(initialSate) ? false : initialSate);
  return [
    shown,
    () => {
      setShown(true);
    },
    () => {
      setShown(false);
    },
  ];
};
