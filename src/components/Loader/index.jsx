import { h } from 'preact';

import LoaderContainer from './LoaderContainer';
import LoaderDot from './LoaderDot';

export default function Loader() {
  return (
    <LoaderContainer>
      <LoaderDot delay="-0.3s" />
      <LoaderDot delay="-0.15s" />
      <LoaderDot />
    </LoaderContainer>
  );
}
