export interface AbstractColDef {
  /** The name to render in the column header */
  headerName?: string;
}

export interface ColDef extends AbstractColDef {
   /** The unique ID to give the column. This is optional. If missing, the ID will default to the field.
     *  If both field and colId are missing, a unique ID will be generated.
     *  This ID is used to identify the column in the API for sorting, filtering etc. */
  colId?: string;
  /** The field of the row to get the cells data from */
  field?: string;
}
