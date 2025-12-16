export interface todoResponse{
    id: number;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    pos:string
}

export interface todoRequest{
    name: string;
    description: string;
}