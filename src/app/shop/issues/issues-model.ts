export class NewIssue {
  title: string;
  body: string;
  labels: string[];
}
export class Issue {
  id: number;
  title: string;
  state: string;
  assigned: boolean;
  created_at: string;
}
