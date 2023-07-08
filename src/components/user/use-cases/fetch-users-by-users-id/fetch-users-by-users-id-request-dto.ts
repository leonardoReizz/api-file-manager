export interface FetchUsersByUsersIdRequestDTO {
  usersId: string[];
  page: number;
  limit: number;
  search: string;
  filter: {
    name: string;
    order: string;
  };
}
