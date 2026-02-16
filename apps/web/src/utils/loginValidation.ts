// Helper function to determine form validation classes
export const getValidationClass = (value: string, isInvalid: boolean): string => {
	if (!value) return ''; // No validation class if empty
	return isInvalid ? 'is-invalid' : 'is-valid';
};
