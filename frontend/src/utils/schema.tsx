interface PostI {
  id: number | null;
  title: string | null;
  year: number | null;
  email: string | null;
  answers: Array<string>;
}

export type { PostI };
