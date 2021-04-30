/**
 *
 * LoggerBoi Client 0.0.101
 *
 */

import fetch from "node-fetch";

interface Logger {
	Success(message: string): void;
	Warning(message: string): void;
	Error(message: string): void;
	Info(message: string): void;
}

// 0 Success, 1 Info, 2 Warning, 3 Error
enum LoggerType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR,
}

interface LoggerPackage {
	service_name: string;
	message: string;
	type: LoggerType;
}

class LoggerClient implements Logger {
	private serviceName: string;

	private baseUrl: string;

	constructor(baseUrl: string, serviceName: string) {
		this.serviceName = serviceName;
		this.baseUrl = baseUrl;
	}

	private async sendRequest(message: string, type: LoggerType): Promise<void> {
		try {
			const data: LoggerPackage = {
				service_name: this.serviceName,
				message,
				type,
			};

			await fetch(new URL("stdin", this.baseUrl), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
		} catch (e) {
			console.log(`LOGGERBOI Bridge failed ${e.message}`);
		}
	}

	Error(message: string): void {
		this.sendRequest(message, LoggerType.ERROR);
	}

	Warning(message: string): void {
		this.sendRequest(message, LoggerType.WARNING);
	}

	Info(message: string): void {
		this.sendRequest(message, LoggerType.INFO);
	}

	Success(message: string): void {
		this.sendRequest(message, LoggerType.SUCCESS);
	}
}

export default new LoggerClient(
	"http://service-loggerboi:4343",
	"website-backend"
);
