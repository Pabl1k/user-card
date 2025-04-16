import { FC } from 'react';
import './Title.sass';

interface Props {
  children: string;
}

const Title: FC<Props> = ({ children }) => {
  return <h1 className="title">{children}</h1>;
};

export default Title;
