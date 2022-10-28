import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header';
import moment from 'moment';
import 'moment/locale/pt-br'

export default function App({ Component, pageProps }: AppProps) {
  moment().locale("pt-br");
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
