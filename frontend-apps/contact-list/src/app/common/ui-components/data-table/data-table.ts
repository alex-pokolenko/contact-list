export class DataTable {
  columns: any[];
  rows: any[];

  constructor(columns?: any, rows?: any) {
    this.columns = columns || [];
    this.rows = rows || [];
  }
}
