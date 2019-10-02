
import moment from "moment"

moment.locale('ru');

export function StringifyDuration(duration) {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = (duration % 3600) % 60;
	let result = '';
	if (hours > 0) {
		result += `${hours} час `;
	}
	if ((hours > 0) || (minutes > 0)) {
		result += `${minutes} мин `;
	}
	if (hours == 0) {
		result += `${seconds} сек`;
	}
	return result;
}

export function StringifyTimestamp(timestamp) {
	const now = new Date();
	if (now.getFullYear() == timestamp.getFullYear()) {
		var format = "D MMM";
	} else {
		var format = "D MMM YYYY";
	}
	return moment(timestamp).format(format);
}
