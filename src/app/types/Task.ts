export interface Task {
  id: string;
  activityName: string;
  assignee: string;
  decision: string;
  message: string;
  locked: boolean;
  done: boolean;
  startTime: Date;
  dueTime: Date;
  bpmActivityId?: string;
  processDefinitionId: string;
  processInstanceId: string;
  performerName: string;
  performerId: string;
  performerEmail: string;
  performerGroup: string;
  requestDto: Request;
}
