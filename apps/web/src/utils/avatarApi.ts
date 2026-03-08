interface AvatarApiOptions {
	userId?: string | null;
	displayName?: string | null;
	photoUrl?: string | null;
}

const getAvatarInitials = (displayName?: string | null) => {
	const normalizedName = displayName?.normalize('NFKC').trim() ?? '';
	if (!normalizedName) {
		return '';
	}
	const nameParts = normalizedName.match(/[\p{L}\p{N}]+/gu) ?? [];
	const firstInitial = nameParts[0]?.charAt(0)?.toUpperCase() ?? '';
	const lastInitial = nameParts.length > 1
		? nameParts[nameParts.length - 1]?.charAt(0)?.toUpperCase() ?? ''
		: nameParts[0]?.charAt(1)?.toUpperCase() ?? '';
	return `${firstInitial}${lastInitial}`;
};

export const getAvatarApiUrl = (options: AvatarApiOptions) => {
	const sanitizedPhotoUrl = options.photoUrl?.trim();
	if (sanitizedPhotoUrl) {
		const isAvatarVercelImage = sanitizedPhotoUrl.includes('avatar.vercel.sh/');
		if (!isAvatarVercelImage) {
			return sanitizedPhotoUrl;
		}
	}

	const sanitizedUserId = options.userId?.trim() || 'guest-user';
	const initials = getAvatarInitials(options.displayName);
	return `https://avatar.vercel.sh/${encodeURIComponent(sanitizedUserId)}.svg?text=${encodeURIComponent(initials)}`;
};
