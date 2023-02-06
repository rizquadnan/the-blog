export type TPagination = {
  totalItems: number;
  hasMore: boolean;
  nextPage: () => void;
  prevPage: () => void;
};
