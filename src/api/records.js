const PHONEBOOK_RECORDS_KEY = "phoneBookRecords-key"

 export const saveRecords = async (newRecords) => {
     localStorage.setItem(PHONEBOOK_RECORDS_KEY, JSON.stringify(newRecords))
    return Promise.resolve(newRecords)
}

export const getRecords = async () => {
    const records = JSON.parse(localStorage.getItem(PHONEBOOK_RECORDS_KEY)) || []
    return Promise.resolve(records)
}