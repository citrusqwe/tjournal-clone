export interface OutputBlockData {
    id?: string;
    type: string | 'paragraph';
    data: any;
}
export declare class CreatePostDto {
    title: string;
    body: OutputBlockData[];
    tags: string;
}
