import { AppProps } from 'next/app';
import './styles/globals.css'; // Example for global CSS

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;