Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

daysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};
