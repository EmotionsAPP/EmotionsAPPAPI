import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

componentLoader.override("LoggedIn", '../components/LoggedIn');

export { componentLoader };