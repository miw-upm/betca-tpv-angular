export interface Article {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
}

export interface Review {
    id?: string;
    userId: string;
    article: Article;
    stars: number;
    opinion: string;
}
