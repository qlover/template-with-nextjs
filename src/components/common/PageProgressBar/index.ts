import ProgressBar from '@badrap/bar-of-progress';
import { Router } from 'next/router';

export const ProgressBarInstace = new ProgressBar({
  size: 2,
  color: '#38a169',
  className: 'bar-of-progress',
  delay: 100,
});

export function PageProgressBar() {
  Router.events.on('routeChangeStart', ProgressBarInstace.start);
  Router.events.on('routeChangeComplete', ProgressBarInstace.finish);
  Router.events.on('routeChangeError', ProgressBarInstace.finish);
}
