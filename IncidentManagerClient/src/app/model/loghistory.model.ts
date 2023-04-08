export class LogHistory {
  constructor(
    public User?: string,
    public From?: string,
    public To?: string,
    public Narrative?: string,
    public Date?: Date
  ) {}
}
