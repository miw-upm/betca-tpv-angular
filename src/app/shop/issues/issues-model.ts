export class NewIssue {
  title: string;
  body: string;
  labels: string[];
}
export class Issue {
  id: number;
  title: string;
  state: 'open' | 'closed';
  assigned: boolean;
  milestone: string;
  created_at: string;
}
