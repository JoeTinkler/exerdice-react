declare module 'sqlocal/drizzle' {
  export class SQLocalDrizzle {
    constructor(database: string)
    driver: RemoteCallback;
    batchDriver: AsyncRemoteCallback;
  }
}