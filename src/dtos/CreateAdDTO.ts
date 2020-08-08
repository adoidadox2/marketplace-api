export default interface CreateAdDTO {
  body: {
    title: string;
    description: string;
    price: number;
  };
  userId: string;
}
