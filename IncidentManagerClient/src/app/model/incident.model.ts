export class Incident {
  constructor(
    public _id?: number,
    public Title?: string,
    public Description?: string,
    public Reporter?: string,
    public Area?: string,
    public Location?: string,
    public Date?: Date,
    public Status?: string,
    public Severity?: string,
    public RecordNumber?: string,
    public Narrative?: string,
  ) {}
}
