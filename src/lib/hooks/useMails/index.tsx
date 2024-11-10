import { useContext } from 'react';
import MailsContext from './context';

const useEmails = () => {
  return useContext(MailsContext);
}


export default useEmails;