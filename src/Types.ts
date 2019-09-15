export type ReduxState = {
  caseId?: string;
};

export type VideoRef = {
  ref_code: string,
  url: string,
  video_title: string,
  downloaded_for_backup: Boolean,
  date: Date,
  startTime: string,
  media: string,
}

export type VideoRefs = {
  [id: string]: VideoRef;
}

export type TGCase = {
  case_id: string,
  case_datetime: string,
  case_site: string,
  lat: number,
  lon: number,
  quantity: number,
  cartridge: string,
  live_video_refs: string[][],
}

export type TGCases = {
  [id: string]: TGCase;
}
