import { useCallback, useEffect, useState } from 'react';
import MailsContext from './context';

import { getFolders } from "@/lib/mail-folders";
import { fetchEmails } from './api';
import logger from '@/lib/utils/logger';

const formatChartData = (data: any, folders: any) => {
    const chartdata = Object.keys(data).map(f => [
        folders.find((folder: any) => folder.id === f).name,
        data[f],
    ]);
    return [
        ["Folder name", "emails"],
        ...chartdata,
    ];
};

const formatData = (data: any, folders: any) => data.map((mail: any) => ({
    ...mail,
    folders: mail.folders.map((f: string) => folders.find((folder: any) => folder.id === f).name),
}))

const MailsProvider = ({ children }: any) => {
    const [emails, setEmails] = useState<any>(null)
    const [folders, setFolders] = useState<any>(null)
    const [chartdata, setChartData] = useState<any>(null)
    const [lastSync, setLastSync] = useState<any>(null)
    const [isLoading, setLoading] = useState(false)
    const [selectedDate, setSelectedDateInner] = useState(new Date());


    const fetchMails = useCallback((date: any | null = null) => {
        logger.log('fetch: ' + date);
        getFolders().then(folders => {
            setFolders(folders)
            fetchEmails(date)
                .then((data) => {
                    setEmails(formatData(data.result, folders));
                    setChartData(formatChartData(data.foldersUsage, folders));
                    setLoading(false);
                    setLastSync(new Date().toLocaleString());
                });
        });
    }, []);

    const resync = useCallback(() => {
        if (!isLoading) {
            logger.log('resync ' + selectedDate);
            setLoading(true);
            fetchMails(selectedDate);
        }
    }, [isLoading, selectedDate]);

    const setSelectedDate = useCallback((value: any) => {
        if (value.getTime() !== selectedDate.getTime()) {
            setSelectedDateInner(value);
            setLoading(true);
            fetchMails(value);
        }
    }, [selectedDate, setSelectedDateInner]);

    useEffect(() => {
        resync();
    }, [])

    const value = {
        state: { selectedDate, emails, lastSync, isLoading, chartdata, folders },
        actions: { setSelectedDate, resync, },
    };

    return (
        <MailsContext.Provider value={value}>
            {children}
        </MailsContext.Provider>
    )
}

export default MailsProvider;