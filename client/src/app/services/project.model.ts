export interface Project {
    id?: number,
    name: string,
    description: string,
    creator: string,
    deadline: string,
    launchDate?: string
    _links?: {
        self: {
            href: string,
        },
    }
}

export interface EmbeddedProjects {
    projectVOList: Project[]
}

export interface ProjectResponse {
    _embedded: EmbeddedProjects,
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