import moment from 'moment';

export const formatDate = function(date) {
    return moment(date).format('MMMM DD YYYY hh:mm:ss a');
};
