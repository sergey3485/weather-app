import './skeleton.css';

export interface SkeletonProps {
  width?: string;
  height?: string;
}

export const Skeleton = (props: SkeletonProps): JSX.Element => {
  const { width, height } = props;
  return (
    <div className="skeleton" style={{ width, height }} />
  );
};
