import { createContext } from 'react';

interface MailsContextType {
    state: {
        selectedDate: any,
        emails: any,
        lastSync: any,
        isLoading: any,
        chartdata: any,
        folders: any,
    },
    actions: {
        setSelectedDate: (date: any) => void,
        resync: () => void,
    },
}

const MailsContext = createContext<MailsContextType>({
    state: {
        selectedDate: undefined,
        emails: undefined,
        lastSync: undefined,
        isLoading: undefined,
        chartdata: undefined,
        folders: undefined,
    },
    actions: {
        setSelectedDate: () => undefined,
        resync: () => undefined,
    },
});

export default MailsContext;