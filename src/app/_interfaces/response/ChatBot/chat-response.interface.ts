export interface ChatResponse {
  keyword: string;
  candidates: Candidate[];
}

export interface Candidate {
  content: Content;
}

export interface Content {
  parts: Part[];
}

export interface Part {
  text: string;
}
