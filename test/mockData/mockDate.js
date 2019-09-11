const timeFrameRange = {
    getThisWeek: () => {
        const today = new Date();
        const day = today.getDate();
        const nextDate = day + 1;
        const endDate = new Date(today.setDate(nextDate)).toISOString();
        const beginningOfTheWeek = day + (1 - today.getDay());
        const prevDate = new Date(today.setDate(beginningOfTheWeek)).toISOString();
        return { startDate: prevDate, endDate }
    },
    lastXDays: (days) => {
        return { startDate: timeFrameRange.startXDays(days), endDate: timeFrameRange.endXDay() }
    },
    lastXmonths: (months) => {
        var date = new Date();
        const month = date.getMonth() - months;
        date.setMonth(month)
        const newDate = new Date(date).toISOString();
        const endDate = new Date()
        return { startDate: newDate, endDate: endDate.toISOString() }
    },
    endXDay: () => {
        const today = new Date();
        const day = today.getDate();
        const nextDate = day;
        const endDate = new Date(today.setDate(nextDate))
        return endDate.toISOString();
    },
    nextXDay: (days) => {
        const today = new Date();
        const day = today.getDate();
        const nextDate = day + days;
        const endDate = new Date(today.setDate(nextDate));
        return endDate.toISOString();
    },
    isTommorrow : (someDate) => {
        const today = new Date()
        return someDate.getDate() + 1 == today.getDate() + 1 &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    },
    startXDays: (days) => {
        const today = new Date();
        const day = today.getDate();
        const lastDate = day - days;
        const startDate = new Date(today.setDate(lastDate));
        return startDate.toISOString();
    },
    isIsoDate: (str) => {
        let string = str
        if (str.length > 10) string = str.toISOString().slice(0, 10)
        if (!/\d{4}-\d{2}-\d{2}/.test(string)) return false;
        var d = new Date(string);
        return d.toISOString().slice(0, 10) === str;
    },
    isToday: (value) => {
        const today = new Date();
        const date = new Date(value);
        return today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate();
    }
};

export default timeFrameRange;
