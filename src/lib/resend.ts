import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
	if (!_resend) {
		const { env } = require("./env");
		_resend = new Resend(env.RESEND_API_KEY);
	}
	return _resend;
}
