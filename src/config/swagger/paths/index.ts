import piusPaths from './piusPaths';
import sessionsPaths from './sessionsPaths';
import usersPaths from './usersPaths';

const paths = {
  ...sessionsPaths,
  ...usersPaths,
  ...piusPaths,
};

export default paths;
