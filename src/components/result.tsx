import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CurrentWeatherInfo } from '@src/services';
import Image from 'next/image';
import { memo } from 'react';
import styles from './result.module.css';

interface WeatherResultProps {
  data: CurrentWeatherInfo | null;
  loading?: boolean;
}
function getWindDir(shortDir?: string) {
  switch (shortDir) {
    case 'N':
      return 'North';
    case 'W':
      return 'West';
    case 'E':
      return 'East';
    case 'S':
      return 'South';

    default:
      return shortDir;
  }
}
function WeatherResult(props: WeatherResultProps) {
  const { data, loading } = props;

  return (
    <Grid>
      {data === null || data.error ? (
        <Card>
          <Typography variant="h3" color={'error'}>
            {data?.error?.message ?? 'No result'}
          </Typography>
        </Card>
      ) : (
        <Box border={2} borderRadius={4} bgcolor={'grey'}>
          <Stack spacing={1}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack textAlign={'start'} paddingLeft={'1rem'}>
                <Typography fontSize={20}>
                  {loading ? (
                    <Skeleton animation="wave" width={'10rem'} />
                  ) : (
                    `${data.location.name}`
                  )}
                </Typography>
                <Typography fontSize={14}>
                  {loading ? (
                    <Skeleton animation="wave" />
                  ) : (
                    `${data.location.country}`
                  )}
                </Typography>
              </Stack>
              {!loading && (
                <Typography fontSize={16} paddingRight={'1rem'}>
                  {data.current.last_updated}
                </Typography>
              )}
            </Stack>
            <Stack
              direction={'row'}
              justifyContent="center"
              spacing={1}
              flexWrap={'wrap'}
            >
              {loading ? (
                [1, 2, 3].map((id) => (
                  <Skeleton animation="wave" key={id}>
                    <Box sx={{ width: 64, height: 64 }}></Box>
                  </Skeleton>
                ))
              ) : (
                <>
                  <Typography variant="h2">{data.current.temp_c}°C</Typography>
                  {data.current.condition?.icon && (
                    <Image
                      src={`https:${data.current.condition.icon}`}
                      alt={data.current.condition.text}
                      width={64}
                      height={64}
                    ></Image>
                  )}
                  <Typography>{data.current.condition?.text}</Typography>
                </>
              )}
            </Stack>
          </Stack>
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={6} textAlign="start">
              <Typography>
                {loading ? (
                  <Skeleton animation="wave" sx={{ mr: { sm: 6 } }} />
                ) : (
                  `Humidity: ${data.current.humidity} %`
                )}
              </Typography>
              <Divider className={styles.divide} sx={{ mr: { sm: 6 } }} />
            </Grid>
            <Grid item xs={12} sm={6} textAlign="start">
              <Typography>
                {loading ? (
                  <Skeleton animation="wave" sx={{ mr: { sm: 6 } }} />
                ) : (
                  `Pressure: ${data.current.pressure_in} / inch`
                )}
              </Typography>
              <Divider className={styles.divide} sx={{ mr: { sm: 6 } }} />
            </Grid>
            <Grid item xs={12} sm={6} textAlign="start">
              <Typography>
                {loading ? (
                  <Skeleton animation="wave" sx={{ mr: { sm: 6 } }} />
                ) : (
                  `Visibility: ${data.current.vis_km} km`
                )}
              </Typography>
              <Divider className={styles.divide} sx={{ mr: { sm: 6 } }} />
            </Grid>
            <Grid item xs={12} sm={6} textAlign="start">
              <Typography>
                {loading ? (
                  <Skeleton animation="wave" sx={{ mr: { sm: 6 } }} />
                ) : (
                  `Wind direction: ${data.current.wind_degree} ${getWindDir(
                    data.current.wind_dir
                  )}`
                )}
              </Typography>
              <Divider className={styles.divide} sx={{ mr: { sm: 6 } }} />
            </Grid>
            <Grid item xs={12} sm={6} textAlign="start">
              <Typography>
                {loading ? (
                  <Skeleton animation="wave" sx={{ mr: { sm: 6 } }} />
                ) : (
                  `Wind speed: ${data.current.wind_kph} km/hour`
                )}
              </Typography>
              <Divider className={styles.divide} sx={{ mr: { sm: 6 } }} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default memo(WeatherResult);
