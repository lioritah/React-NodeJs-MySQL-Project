export type Vacation = {
  id: number;
  description: string;
  destination: string;
  imageName: string;
  date: string;
  price: number;
  isUserFollowing: boolean;
  followers: number;
};
export type FollowingResponse = { followers: number; isUserFollowing: boolean };

export type VacationData = Pick<
  Vacation,
  "description" | "destination" | "date" | "price"
> & {
  image: File;
};

export interface Follower {
  vacationId: number;
  userId: number;
}
