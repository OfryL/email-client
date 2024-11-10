export const fetchEmails = (date: string) =>
    fetch(date ? '/api/v1/emails?forDate=' + date : '/api/v1/emails')
        .then((res) => res.json())
