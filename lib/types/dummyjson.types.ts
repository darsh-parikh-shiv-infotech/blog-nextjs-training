export interface DummyJSONUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface DummyJSONPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface DummyJSONPostsResponse {
  posts: DummyJSONPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyJSONLoginResponse extends DummyJSONUser {
  accessToken: string;
  refreshToken: string;
}

export interface DummyJSONAuthUser extends DummyJSONUser {
  accessToken?: string;
  refreshToken?: string;
}
