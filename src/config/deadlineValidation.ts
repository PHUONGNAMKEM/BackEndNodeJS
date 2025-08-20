import dayjs, { Dayjs } from "dayjs";

type InputDate = string | number | Date | Dayjs | null | undefined;
type DeadlineResult = {
    valid: boolean;
    error?: string;
    startDate?: Dayjs;
    endDate?: Dayjs;
};

const deadlineValidation = (start: InputDate, end: InputDate, now: Dayjs = dayjs()): DeadlineResult => {
    if (!start || !end) {
        return { valid: false, error: "Start Date and End Date is obligated" };
    }

    const startDate = dayjs(start).startOf("day");
    const endDate = dayjs(end).startOf("day");
    const today = now.startOf("day");

    if (!startDate.isValid() || !endDate.isValid()) {
        return { valid: false, error: "Invalid format of Date" };
    }

    // start >= today
    if (startDate.isBefore(today)) {
        return { valid: false, error: "Start Date must start from today" };
    }

    // end > start
    if (!endDate.isAfter(startDate)) {
        return { valid: false, error: "Start Date must be before End Date" };
    }

    return { valid: true, startDate, endDate };
}

export default deadlineValidation;