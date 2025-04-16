import { FC, ReactNode } from 'react';
import Title from '../../components/title/Title';
import './Section.sass';

interface Props {
  title: string;
  children: ReactNode;
}

const Section: FC<Props> = ({ title, children }) => {
  return (
    <div className="section">
      <Title>{title}</Title>
      {children}
    </div>
  );
};

export default Section;
