export interface Task {
    id?: number,
    status?: string,
    name: string, 
    description: string, 
    creator: string, 
    deadline: string, 
    projectId: number, 
    memberIds: number[]
    launchDate?: string
    _links?: {
        self: {
            href: string,
        },
    }
}

export interface EmbeddedTasks {
    taskVOList: Task[]
}

export interface TasksResponse {
    _embedded: EmbeddedTasks,
    _links: {
        first: { href: string },
        self: { href: string },
        next: { href: string },
        last: { href: string },
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number,
    },
}