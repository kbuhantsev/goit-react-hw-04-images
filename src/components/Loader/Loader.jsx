import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <ThreeDots
      height="60"
      width="60"
      radius="6"
      color="#3f51b5"
      visible="true"
      wrapperStyle={{ justifyContent: 'center' }}
    />
  );
}
