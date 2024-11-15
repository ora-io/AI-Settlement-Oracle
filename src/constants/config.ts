export interface IAiSettlementOracleFormValues {
  question: string;
  answers: { value: string }[];
}

export const AISETTLEMENTORACLE_FORM_DEFAULT_VALUES: IAiSettlementOracleFormValues[] = [
  {
    question: 'Is the Earth the third planet from the Sun?',
    answers: [{ value: 'true' }, { value: 'false' }]
  },
  {
    question: 'Is the capital of France London?',
    answers: [{ value: 'Yes' }, { value: 'No' }]
  },
  {
    question: 'Is the square root of 16 equal to 5?',
    answers: [{ value: 'Yes' }, { value: 'No' }]
  },
  {
    question: 'Do all fish live in saltwater?',
    answers: [{ value: 'Yes' }, { value: 'No' }]
  }
];
