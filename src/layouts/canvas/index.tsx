import Starscanvas from './start-canvas';

type CanvasLayoutProps = {
  children?: React.ReactNode;
};

const CanvasLayout = ({ children }: CanvasLayoutProps) => {
  return (
    <div>
      <Starscanvas />
      {children}
    </div>
  );
};

export default CanvasLayout;
