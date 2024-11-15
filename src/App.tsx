import Fuse from 'fuse.js';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm, useFieldArray } from 'react-hook-form';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Input, Box, Button, Typography, InputBase } from '@mui/material';
import { useAppState, useSetIsSubmit, useSetAiOutput, useSetRequestId, useSetSelectAnswer } from '@/store/app/hooks';

import services, { evmService } from '@/services';
import { AISETTLEMENTORACLE_FORM_DEFAULT_VALUES, IAiSettlementOracleFormValues } from '@/constants/config';

import MinusSVG from '@/assets/minus.svg?react';
import AddSVG from '@/assets/add.svg?react';
import CheckSVG from '@/assets/check.svg?react';

export default function App() {
  const appState = useAppState();
  const setIsSubmit = useSetIsSubmit();
  const setAiOutput = useSetAiOutput();
  const setRequestId = useSetRequestId();
  const setSelectAnswer = useSetSelectAnswer();
  const { handleSubmit, control, register, reset, setValue, getValues } = useForm<IAiSettlementOracleFormValues>({
    defaultValues: {
      question: '',
      answers: [{ value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers'
  });

  const handleClickSurpriseMe = () => {
    setValue('answers', [{ value: '' }]);

    const data =
      AISETTLEMENTORACLE_FORM_DEFAULT_VALUES[Math.floor(Math.random() * AISETTLEMENTORACLE_FORM_DEFAULT_VALUES.length)];

    setValue('question', data.question);

    remove(0);

    data.answers.forEach((answer) => {
      append({ value: answer.value });
    });
  };

  const onSubmit = async (data: IAiSettlementOracleFormValues) => {
    try {
      setIsSubmit(true);
      setAiOutput('');
      setRequestId('');
      setSelectAnswer('');
      const user_input = `Q: ${data.question} ${data.answers.map((answer) => answer.value).join(' / ')}`;

      const searchData = await services.search.generate({
        user_input
      });

      await evmService.ora.calculateAIResult({ prompt: searchData.prompt });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appState.isSubmit && appState.aiOutput.length > 1) {
      const answers = getValues('answers');
      const fuse = new Fuse(answers, { keys: ['value'] });

      const answer = appState.aiOutput.match(/(.*?)(?=,)/);

      if (answer && answer.length > 1) {
        const result = fuse.search(answer[1]);

        if (result.length > 0) {
          setSelectAnswer(result[0].item.value);
          console.log(result[0]);
        }
      }
    }
  }, [appState.aiOutput, appState.isSubmit]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '120px',
        height: '100vh'
      }}
    >
      <ConnectButton />
      <form style={{ width: '780px' }} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="prompt"
          aria-describedby="prompt-helper-text"
          style={{ width: '100%' }}
          {...register('question', { required: true })}
          endAdornment={
            <Button variant="text" size="small" style={{ width: '8rem' }} onClick={() => handleClickSurpriseMe()}>
              Surprise me
            </Button>
          }
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: '1rem',
            mb: '0.8rem'
          }}
        >
          <Box sx={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Syncopate-Bold' }}>Answer options: </Box>
        </Box>

        {fields.map((field, index) => (
          <InputBase
            key={field.id}
            {...register(`answers.${index}.value`, { required: true })}
            style={{ fontSize: '1rem', padding: '0', width: '100%' }}
            sx={{
              borderBottom: '2px solid #00F6FF',
              mb: '0.8rem',
              input: {
                fontWeight: appState.selectAnswer === field.value ? 700 : 400
              }
            }}
            endAdornment={
              appState.selectAnswer.length > 0 && appState.selectAnswer === field.value ? (
                <Button
                  sx={{
                    p: 0,
                    height: '1.8rem',
                    backgroundColor: '#00f6ff',
                    borderRadius: '0.625rem 0 0.625rem 0',
                    color: 'black',
                    ':hover': {
                      backgroundColor: '#85eff3'
                    }
                  }}
                >
                  <CheckSVG style={{ width: '1.5rem', height: '1.5rem' }} />
                </Button>
              ) : appState.isSubmit ? null : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Button
                    sx={{
                      p: 0,
                      height: '1.8rem',
                      backgroundColor: '#00f6ff',
                      borderRadius: '0.625rem 0 0.625rem 0',
                      color: 'black',
                      ':hover': {
                        backgroundColor: '#85eff3'
                      }
                    }}
                    onClick={() => {
                      if (fields.length < 5) {
                        append({ value: '' });
                      }
                    }}
                  >
                    <AddSVG style={{ width: '1.5rem', height: '1.5rem' }} />
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      p: 0,
                      height: '1.8rem',
                      backgroundColor: '#00f6ff',
                      borderRadius: '0.625rem 0 0.625rem 0',
                      color: 'black',
                      ':hover': {
                        backgroundColor: '#85eff3'
                      }
                    }}
                    onClick={() => {
                      if (fields.length > 1) {
                        remove(index);
                      }
                    }}
                  >
                    <MinusSVG style={{ width: '1.5rem', height: '1.5rem' }} />
                  </Button>
                </Box>
              )
            }
          />
        ))}

        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            marginTop: '0.8rem'
          }}
        >
          {appState.isSubmit ? (
            <Button
              variant="text"
              size="small"
              sx={{
                p: '0 1rem',
                height: '1.8rem',
                backgroundColor: '#00f6ff',
                borderRadius: '0.625rem 0 0.625rem 0',
                ':hover': {
                  backgroundColor: '#85eff3'
                },
                ':disabled': {
                  backgroundColor: '#cccccc',
                  color: '#666666',
                  cursor: 'not-allowed'
                }
              }}
              onClick={() => {
                setIsSubmit(false);
                reset();
              }}
            >
              <Typography fontFamily={'SpaceMono-Bold'} style={{ textAlign: 'left', fontSize: '1rem', color: 'black' }}>
                Reset
              </Typography>
            </Button>
          ) : (
            <LoadingButton
              sx={{
                width: '8.5rem',
                height: '1.8rem',
                backgroundColor: '#00f6ff',
                borderRadius: '0.625rem 0 0.625rem 0',
                ':hover': {
                  backgroundColor: '#85eff3'
                },
                ':disabled': {
                  backgroundColor: '#cccccc',
                  color: '#666666',
                  cursor: 'not-allowed'
                }
              }}
              type="submit"
            >
              <Typography
                fontFamily={'SpaceMono-Bold'}
                style={{ textAlign: 'left', fontSize: '1rem', color: 'black', textDecoration: 'underline' }}
              >
                SETTLE
              </Typography>
            </LoadingButton>
          )}
        </Box>
      </form>
    </Box>
  );
}
