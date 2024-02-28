const addDateSuffix = date => {
    let dateString = date.toString();
    const lastChar = dateString.charAt(dateString.length - 1);

    if (lastChar === '1' && dateString !== '11') {
        dateString += 'st';
    } else if (lastChar === '2' && dateString !== '12') {
        dateString += 'nd';
    } else if (lastChar === '3' && dateString !== '13') {
        dateString += 'rd';
    } else {
        dateString += 'th';
    }

    return dateString;
};

module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const months = {
        0: monthLength === 'short' ? 'Jan' : 'January',
        1: monthLength === 'short' ? 'Feb' : 'February',
        2: monthLength === 'short' ? 'Mar' : 'March',
        3: monthLength === 'short' ? 'Apr' : 'April',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };

    const dateObj = new Date(timestamp);
    const formatMonth = months[dateObj.getMonth()];
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
    hour = hour === 0 ? 12 : hour;
    const minutes = dateObj.getMinutes();
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    const formatTimeStamp = `${formatMonth} ${dayOfMonth} ${year} at ${hour}:${minutes < 10 ? '0' : ''}${minutes} ${periodOfDay}`;

    return formatTimeStamp;
};
