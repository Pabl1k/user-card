import { forwardRef, ReactNode } from 'react';
import Title from '../../components/title/Title';
import './Section.sass';

interface Props {
  title: string;
  children: ReactNode;
}

const Section = forwardRef<HTMLDivElement, Props>(({ title, children }, ref) => {
  return (
    <div className="section" ref={ref}>
      <Title>{title}</Title>
      {children}
    </div>
  );
});

export default Section;
