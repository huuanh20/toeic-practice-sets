export interface Test {
  id: number;
  audio: string;
  practicePage: number;
  transcriptPage: number;
}

export interface LibraryConfig {
  bookTitle: string;
  practicePdf: string;
  transcriptPdf: string;
  vocabularyPdf: string;
  tests: Test[];
}
