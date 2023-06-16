export default interface ITask {
  id: number;
  board_id: number;
  creator_id: number;
  title: string;
  description: string;
  status: Status;
  start_date: Date;
  final_date: Date;
}

enum Status {
  FAILED,
  IN_WORK,
  SUCCESS,
}
