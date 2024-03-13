

interface Task {
    title: string;
    description?: string;
    statusTask: "Pendiente" | "En Proceso" | "Completada" | "Cancelada" | "Rechazada" | "En Espera";
    startDate?: Date;
    endDate?: Date;
    taskDateCompleted?: Date;
    priority: "Alta" | "Media" | "Baja";
}


interface TaskList {
    title: string;
    description?: string;
    createBy: string;
    countTotalTask: number;
    isDeleted: boolean;
    isGlobal: boolean;
    assignedTo: string[];
}

interface TaskNotification {
    uuid?: string;
    lastDateNotification: Date;
    isCompleted: boolean;
    notificationInterval?: "Diaria" | "Semanal" | "Mensual" | "Anual";
    notificationType?: "Email" | "SMS" | "Push" | "WhatsApp";
    notificationMessage?: string;
    notificationTitle?: string;
    notificationIntervalMinutes: number;
}


export type { Task, TaskList, TaskNotification }