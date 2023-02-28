import Search from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from '@src/components/weather.module.css';
import { CurrentWeatherInfo } from '@src/services';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import WeatherResult from './result';
import SwitchColor from './switchColor';

interface FormInput {
  city: string;
}

async function getCurrentWeather(city: string) {
  const url = `/api/current?city=${city}`;
  return await (await fetch(url)).json();
}

export default function Weather() {
  const [weather, setWeatherData] = useState<CurrentWeatherInfo | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();

  const [loading, setLoading] = useState(false);

  const onSubmitHandle: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await getCurrentWeather(data.city);

      setWeatherData(res);
      setLoading(false);
    } catch (error) {
      console.warn(error);

      setWeatherData(null);
    }
  };

  return (
    <>
      <Container className={styles.weather}>
        <Typography>
          <span className={styles.title}>Weather</span>
        </Typography>
        <br />
        <Box component="form" onSubmit={handleSubmit(onSubmitHandle)}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems={'flex-start'}
          >
            <TextField
              id="city"
              size="medium"
              label="City"
              InputLabelProps={{
                shrink: true,
              }}
              {...register('city', { required: 'City name is required' })}
              error={!!errors.city}
              helperText={!!errors.city ? errors.city.message : ''}
            ></TextField>
            <Button
              variant="contained"
              size="large"
              type="submit"
              id="btn-submit"
              startIcon={<Search />}
              sx={{ maxHeight: '3.5rem', height: '3.5rem' }}
            >
              Find
            </Button>

            <Stack direction={'row'} justifyContent="end">
              <SwitchColor />
            </Stack>
          </Stack>
        </Box>
        <Box mt={2}>
          {weather !== null && (
            <WeatherResult data={weather} loading={loading} />
          )}
        </Box>
      </Container>
    </>
  );
}
