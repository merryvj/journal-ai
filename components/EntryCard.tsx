const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString()
    return (
        <div>
            <div className="divide-y">
                <div className="px-4 py-6 sm:px-6"> 
                 {date}
                </div>
                <div className="px-4 py-5 sm:p-6"> 
                    summary
                </div>
                <div className="px-4 py-4 sm:px-6"> 
                    mood
                </div>
            </div>
        </div>
    )
}

export default EntryCard