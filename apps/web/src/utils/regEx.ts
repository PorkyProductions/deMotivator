export const emailRegExp: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const pwRegExp: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const isEmailValid = (email: string): boolean => emailRegExp.test(email);
export const isPwValid = (pw: string): boolean => pwRegExp.test(pw);

export default {
	isEmailValid,
	isPwValid,
	emailRegExp,
	pwRegExp
}