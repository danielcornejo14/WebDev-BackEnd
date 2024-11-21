interface Review {
    product: string; // ObjectId as string
    user: string; // ObjectId as string
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }