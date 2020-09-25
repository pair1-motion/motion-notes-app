class Helper {
    static getNoteTitle (note) {
        let title
        if(note.length > 20) {
            title = note.substring(0,20) + "..."
        } else {
            title = note + "..."
        }
        return title
    }


}

module.exports = Helper