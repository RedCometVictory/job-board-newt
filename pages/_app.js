import '../styles/globals.scss';
import { StoreProvider } from '../context/Store';

const MyApp = ({ Component, pageProps }) => (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
);
export default MyApp;