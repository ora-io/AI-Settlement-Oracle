export interface IAiSettlementOracleFormValues {
  question: string;
  answers: { value: string }[];
}

export const AISETTLEMENTORACLE_FORM_DEFAULT_VALUES: IAiSettlementOracleFormValues[] = [
  {
    question: 'Who is the US Presidential Election Winner in 2020?',
    answers: [{ value: 'Donald Trump' }, { value: 'Joe Biden' }]
  },
  {
    question: 'Is Mount Everest the tallest mountain on Earth?',
    answers: [{ value: 'Yes' }, { value: 'No' }]
  },
  {
    question: 'Did the price of Bitcoin (BTC) close above $70,000 on October 30, 2024?',
    answers: [{ value: 'Yes' }, { value: 'No' }]
  },
  {
    question: 'Which country won the 2022 FIFA World Cup?',
    answers: [{ value: 'Argentina' }, { value: 'Brazil' }, { value: 'France' }, { value: 'Germany' }]
  },
  {
    question: 'Which company had the highest market capitalization by the end of 2023?',
    answers: [{ value: 'Apple' }, { value: 'Microsoft' }, { value: 'Amazon' }, { value: 'Google' }, { value: 'Tesla' }]
  },
  {
    question: 'Which movie won the Academy Award for Best Picture in 2024?',
    answers: [
      { value: 'Everything Everywhere All at Once' },
      { value: 'Oppenheimer' },
      { value: 'Killers of the Flower Moon' },
      { value: 'Dune: Part Two' },
      { value: 'The Fabelmans' }
    ]
  }
];
