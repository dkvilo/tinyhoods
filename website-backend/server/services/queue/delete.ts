import { emailQueue } from "../../providers";

function deleteAllQueueJobs() {
	emailQueue.clean(0, "delayed");
	emailQueue.clean(0, "wait");
	emailQueue.clean(0, "active");
	emailQueue.clean(0, "completed");
	emailQueue.clean(0, "failed");

	let multi = emailQueue.multi();
	multi.del(emailQueue.toKey("complete"));
	multi.exec();
}

// this will be handy if we want to use async/await in future
(function () {
	deleteAllQueueJobs();
	process.exit();
})();
