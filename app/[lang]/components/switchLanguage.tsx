"use client"
import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: "'EN'", 
        backgroundImage: 'none', 
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "'FR'", 
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '0.75rem',
      fontWeight: 'bold',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextLocale = event.target.checked ? 'en' : 'fr';
    
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const nextPathname = segments.join('/');

    startTransition(() => {
      router.replace(nextPathname);
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitch 
            sx={{ m: 1 }} 
            checked={locale === 'en'} 
            onChange={handleLanguageChange}
            disabled={isPending}
          />
        }
        label={locale === 'fr' ? 'Langue' : 'Language'} 
        slotProps={{
          typography: {
            sx: {
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }
          }
        }}
      />
    </FormGroup>
  );
}