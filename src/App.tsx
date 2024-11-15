import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm, useFieldArray } from 'react-hook-form';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Input, Box, Button, Typography, InputBase, Link } from '@mui/material';
import { useAppState, useSetIsSubmit, useSetAiOutput, useSetRequestId, useSetSelectAnswer } from '@/store/app/hooks';

import services, { evmService } from '@/services';
import { IGenerateData } from '@/services/searchService/types';
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
  const [serviceData, setServiceData] = useState<IGenerateData>();
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
    setServiceData(undefined);

    const data =
      AISETTLEMENTORACLE_FORM_DEFAULT_VALUES[Math.floor(Math.random() * AISETTLEMENTORACLE_FORM_DEFAULT_VALUES.length)];

    setValue('question', data.question);

    remove(0);

    data.answers.forEach((answer) => {
      append({ value: answer.value });
    });
  };

  // "A: No

  // Explanation: According to context information, it is stated that "The value of the square root of 16 is a rational number since it can be represented in the form of p/q.... Hence, the square root of 16 is equal to 4." This suggests that the square root of 16 is indeed equal to 4, not 5."

  // "A: true

  // Explanation: Based on the provided context information, it is stated that "The Earth is the third planet from the Sun in our solar system. It follows Mercury and Venus based on proximity to the Sun." Additionally, it is mentioned that "Detailed studies of our solar system confirm this", and "The statement that the Earth is the third planet from the Sun is indeed true"."
  const onSubmit = async (data: IAiSettlementOracleFormValues) => {
    try {
      setIsSubmit(true);
      setAiOutput('');
      setRequestId('');
      setSelectAnswer('');
      setServiceData(undefined);
      const user_input = `Q: ${data.question} ${data.answers.map((answer) => answer.value).join(' / ')}`;

      console.log('user_input', user_input);
      const searchData = await services.search.generate({
        user_input
      });
      console.log('searchData', searchData);

      setServiceData(searchData);

      await evmService.ora.calculateAIResult({ prompt: searchData.prompt });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appState.isSubmit && appState.aiOutput.length > 1) {
      const answers = getValues('answers');
      const fuse = new Fuse(answers, { keys: ['value'] });

      const answer = appState.aiOutput.match(/A:\s*(.*?)\n\nExplanation/);

      console.log(answer);

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
                      if (fields.length < 2) {
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
                setServiceData(undefined);
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '40px' }}>
          {serviceData?.search_result.map((item) => {
            return (
              <Box sx={{ borderBottom: '1px solid #cccccc66', padding: '0.5rem 0' }}>
                <Typography>{item.context}</Typography>
                <Link href={item.url} target="_blank" sx={{ color: '#7664ea' }}>
                  {item.source_from}
                </Link>
              </Box>
            );
          })}
        </Box>
      </form>
    </Box>
  );
}
