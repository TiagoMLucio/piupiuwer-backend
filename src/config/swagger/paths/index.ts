import piusPaths from './piusPaths';
import sessionsPaths from './sessionsPaths';
import usersPaths from './usersPaths';

const paths = {
  ...usersPaths,
  ...sessionsPaths,
  ...piusPaths,
};

export default paths;
