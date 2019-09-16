const date = {
    isToday: (value) => {
        const today = new Date();
        const date = new Date(value);
        return today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate();
    },
    format: (value) => {
        return new Date(value).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            time: 'numeric'
        });
    }
};

export default date;
