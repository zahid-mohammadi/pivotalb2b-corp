type CountryPhoneConfig = {
  code: string;
  prefix: string;
  format: (digits: string) => string;
  localPattern?: RegExp;
};

const countryPhoneConfigs: Record<string, CountryPhoneConfig> = {
  'United States': {
    code: 'US',
    prefix: '+1',
    format: (digits) => {
      if (digits.length === 10) {
        return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
      return `+1 ${digits}`;
    },
    localPattern: /^[2-9]\d{9}$/,
  },
  'USA': {
    code: 'US',
    prefix: '+1',
    format: (digits) => {
      if (digits.length === 10) {
        return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
      return `+1 ${digits}`;
    },
    localPattern: /^[2-9]\d{9}$/,
  },
  'Canada': {
    code: 'CA',
    prefix: '+1',
    format: (digits) => {
      if (digits.length === 10) {
        return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
      return `+1 ${digits}`;
    },
    localPattern: /^[2-9]\d{9}$/,
  },
  'United Kingdom': {
    code: 'GB',
    prefix: '+44',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      if (digits.length === 10) {
        return `+44 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+44 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{9,10}$/,
  },
  'UK': {
    code: 'GB',
    prefix: '+44',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      if (digits.length === 10) {
        return `+44 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+44 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{9,10}$/,
  },
  'Germany': {
    code: 'DE',
    prefix: '+49',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+49 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{6,12}$/,
  },
  'France': {
    code: 'FR',
    prefix: '+33',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      if (digits.length === 9) {
        return `+33 ${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
      }
      return `+33 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'UAE': {
    code: 'AE',
    prefix: '+971',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+971 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'United Arab Emirates': {
    code: 'AE',
    prefix: '+971',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+971 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'India': {
    code: 'IN',
    prefix: '+91',
    format: (digits) => {
      if (digits.length === 10) {
        return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
      }
      return `+91 ${digits}`;
    },
    localPattern: /^[6-9]\d{9}$/,
  },
  'Australia': {
    code: 'AU',
    prefix: '+61',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+61 ${digits}`;
    },
    localPattern: /^0?[2-9]\d{8}$/,
  },
  'Singapore': {
    code: 'SG',
    prefix: '+65',
    format: (digits) => {
      if (digits.length === 8) {
        return `+65 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+65 ${digits}`;
    },
    localPattern: /^[3689]\d{7}$/,
  },
  'Netherlands': {
    code: 'NL',
    prefix: '+31',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+31 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'Spain': {
    code: 'ES',
    prefix: '+34',
    format: (digits) => {
      if (digits.length === 9) {
        return `+34 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
      return `+34 ${digits}`;
    },
    localPattern: /^[6-9]\d{8}$/,
  },
  'Italy': {
    code: 'IT',
    prefix: '+39',
    format: (digits) => {
      return `+39 ${digits}`;
    },
    localPattern: /^[0-9]\d{8,10}$/,
  },
  'Oman': {
    code: 'OM',
    prefix: '+968',
    format: (digits) => {
      if (digits.length === 8) {
        return `+968 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+968 ${digits}`;
    },
    localPattern: /^[2-9]\d{7}$/,
  },
  'Saudi Arabia': {
    code: 'SA',
    prefix: '+966',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+966 ${digits}`;
    },
    localPattern: /^0?5\d{8}$/,
  },
  'South Africa': {
    code: 'ZA',
    prefix: '+27',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+27 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'Brazil': {
    code: 'BR',
    prefix: '+55',
    format: (digits) => {
      return `+55 ${digits}`;
    },
    localPattern: /^[1-9]\d{9,10}$/,
  },
  'Mexico': {
    code: 'MX',
    prefix: '+52',
    format: (digits) => {
      return `+52 ${digits}`;
    },
    localPattern: /^[1-9]\d{9}$/,
  },
  'Japan': {
    code: 'JP',
    prefix: '+81',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+81 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8,9}$/,
  },
  'China': {
    code: 'CN',
    prefix: '+86',
    format: (digits) => {
      return `+86 ${digits}`;
    },
    localPattern: /^1[3-9]\d{9}$/,
  },
  'South Korea': {
    code: 'KR',
    prefix: '+82',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+82 ${digits}`;
    },
    localPattern: /^0?1[0-9]\d{7,8}$/,
  },
  'Ireland': {
    code: 'IE',
    prefix: '+353',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+353 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{6,9}$/,
  },
  'Sweden': {
    code: 'SE',
    prefix: '+46',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+46 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{6,9}$/,
  },
  'Norway': {
    code: 'NO',
    prefix: '+47',
    format: (digits) => {
      if (digits.length === 8) {
        return `+47 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+47 ${digits}`;
    },
    localPattern: /^[2-9]\d{7}$/,
  },
  'Denmark': {
    code: 'DK',
    prefix: '+45',
    format: (digits) => {
      if (digits.length === 8) {
        return `+45 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+45 ${digits}`;
    },
    localPattern: /^[2-9]\d{7}$/,
  },
  'Switzerland': {
    code: 'CH',
    prefix: '+41',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+41 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'Belgium': {
    code: 'BE',
    prefix: '+32',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+32 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{7,8}$/,
  },
  'Austria': {
    code: 'AT',
    prefix: '+43',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+43 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{6,12}$/,
  },
  'Poland': {
    code: 'PL',
    prefix: '+48',
    format: (digits) => {
      if (digits.length === 9) {
        return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
      return `+48 ${digits}`;
    },
    localPattern: /^[1-9]\d{8}$/,
  },
  'Portugal': {
    code: 'PT',
    prefix: '+351',
    format: (digits) => {
      return `+351 ${digits}`;
    },
    localPattern: /^[2-9]\d{8}$/,
  },
  'Greece': {
    code: 'GR',
    prefix: '+30',
    format: (digits) => {
      return `+30 ${digits}`;
    },
    localPattern: /^[2-9]\d{9}$/,
  },
  'New Zealand': {
    code: 'NZ',
    prefix: '+64',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+64 ${digits}`;
    },
    localPattern: /^0?[2-9]\d{7,9}$/,
  },
  'Malaysia': {
    code: 'MY',
    prefix: '+60',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+60 ${digits}`;
    },
    localPattern: /^0?1[0-9]\d{7,8}$/,
  },
  'Philippines': {
    code: 'PH',
    prefix: '+63',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+63 ${digits}`;
    },
    localPattern: /^0?9\d{9}$/,
  },
  'Thailand': {
    code: 'TH',
    prefix: '+66',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+66 ${digits}`;
    },
    localPattern: /^0?[689]\d{8}$/,
  },
  'Vietnam': {
    code: 'VN',
    prefix: '+84',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+84 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8,9}$/,
  },
  'Indonesia': {
    code: 'ID',
    prefix: '+62',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+62 ${digits}`;
    },
    localPattern: /^0?8\d{8,11}$/,
  },
  'Hong Kong': {
    code: 'HK',
    prefix: '+852',
    format: (digits) => {
      if (digits.length === 8) {
        return `+852 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+852 ${digits}`;
    },
    localPattern: /^[2-9]\d{7}$/,
  },
  'Israel': {
    code: 'IL',
    prefix: '+972',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+972 ${digits}`;
    },
    localPattern: /^0?5\d{8}$/,
  },
  'Turkey': {
    code: 'TR',
    prefix: '+90',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+90 ${digits}`;
    },
    localPattern: /^0?5\d{9}$/,
  },
  'Russia': {
    code: 'RU',
    prefix: '+7',
    format: (digits) => {
      if (digits.startsWith('8')) {
        digits = digits.slice(1);
      }
      if (digits.length === 10) {
        return `+7 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
      }
      return `+7 ${digits}`;
    },
    localPattern: /^[89]?\d{10}$/,
  },
  'Argentina': {
    code: 'AR',
    prefix: '+54',
    format: (digits) => {
      return `+54 ${digits}`;
    },
    localPattern: /^[1-9]\d{9,10}$/,
  },
  'Chile': {
    code: 'CL',
    prefix: '+56',
    format: (digits) => {
      return `+56 ${digits}`;
    },
    localPattern: /^[2-9]\d{8}$/,
  },
  'Colombia': {
    code: 'CO',
    prefix: '+57',
    format: (digits) => {
      return `+57 ${digits}`;
    },
    localPattern: /^3\d{9}$/,
  },
  'Egypt': {
    code: 'EG',
    prefix: '+20',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+20 ${digits}`;
    },
    localPattern: /^0?1[0-9]\d{8}$/,
  },
  'Nigeria': {
    code: 'NG',
    prefix: '+234',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+234 ${digits}`;
    },
    localPattern: /^0?[7-9]\d{9}$/,
  },
  'Kenya': {
    code: 'KE',
    prefix: '+254',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+254 ${digits}`;
    },
    localPattern: /^0?[17]\d{8}$/,
  },
  'Pakistan': {
    code: 'PK',
    prefix: '+92',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+92 ${digits}`;
    },
    localPattern: /^0?3\d{9}$/,
  },
  'Bangladesh': {
    code: 'BD',
    prefix: '+880',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+880 ${digits}`;
    },
    localPattern: /^0?1[3-9]\d{8}$/,
  },
  'Qatar': {
    code: 'QA',
    prefix: '+974',
    format: (digits) => {
      if (digits.length === 8) {
        return `+974 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+974 ${digits}`;
    },
    localPattern: /^[3-7]\d{7}$/,
  },
  'Kuwait': {
    code: 'KW',
    prefix: '+965',
    format: (digits) => {
      if (digits.length === 8) {
        return `+965 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+965 ${digits}`;
    },
    localPattern: /^[5-9]\d{7}$/,
  },
  'Bahrain': {
    code: 'BH',
    prefix: '+973',
    format: (digits) => {
      if (digits.length === 8) {
        return `+973 ${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
      return `+973 ${digits}`;
    },
    localPattern: /^[3-9]\d{7}$/,
  },
  'Jordan': {
    code: 'JO',
    prefix: '+962',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+962 ${digits}`;
    },
    localPattern: /^0?7[789]\d{7}$/,
  },
  'Lebanon': {
    code: 'LB',
    prefix: '+961',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+961 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{6,7}$/,
  },
  'Morocco': {
    code: 'MA',
    prefix: '+212',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+212 ${digits}`;
    },
    localPattern: /^0?[5-7]\d{8}$/,
  },
  'Taiwan': {
    code: 'TW',
    prefix: '+886',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+886 ${digits}`;
    },
    localPattern: /^0?9\d{8}$/,
  },
  'Czech Republic': {
    code: 'CZ',
    prefix: '+420',
    format: (digits) => {
      if (digits.length === 9) {
        return `+420 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
      return `+420 ${digits}`;
    },
    localPattern: /^[1-9]\d{8}$/,
  },
  'Hungary': {
    code: 'HU',
    prefix: '+36',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+36 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{7,8}$/,
  },
  'Romania': {
    code: 'RO',
    prefix: '+40',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+40 ${digits}`;
    },
    localPattern: /^0?7\d{8}$/,
  },
  'Ukraine': {
    code: 'UA',
    prefix: '+380',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+380 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{8}$/,
  },
  'Finland': {
    code: 'FI',
    prefix: '+358',
    format: (digits) => {
      if (digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      return `+358 ${digits}`;
    },
    localPattern: /^0?[1-9]\d{6,9}$/,
  },
};

const countryCodePrefixes: Record<string, string> = {
  '+1': 'USA',
  '+44': 'United Kingdom',
  '+49': 'Germany',
  '+33': 'France',
  '+971': 'United Arab Emirates',
  '+91': 'India',
  '+61': 'Australia',
  '+65': 'Singapore',
  '+31': 'Netherlands',
  '+34': 'Spain',
  '+39': 'Italy',
  '+968': 'Oman',
  '+966': 'Saudi Arabia',
  '+27': 'South Africa',
  '+55': 'Brazil',
  '+52': 'Mexico',
  '+81': 'Japan',
  '+86': 'China',
  '+82': 'South Korea',
  '+353': 'Ireland',
  '+46': 'Sweden',
  '+47': 'Norway',
  '+45': 'Denmark',
  '+41': 'Switzerland',
  '+32': 'Belgium',
  '+43': 'Austria',
  '+48': 'Poland',
  '+351': 'Portugal',
  '+30': 'Greece',
  '+64': 'New Zealand',
  '+60': 'Malaysia',
  '+63': 'Philippines',
  '+66': 'Thailand',
  '+84': 'Vietnam',
  '+62': 'Indonesia',
  '+852': 'Hong Kong',
  '+972': 'Israel',
  '+90': 'Turkey',
  '+7': 'Russia',
  '+54': 'Argentina',
  '+56': 'Chile',
  '+57': 'Colombia',
  '+20': 'Egypt',
  '+234': 'Nigeria',
  '+254': 'Kenya',
  '+92': 'Pakistan',
  '+880': 'Bangladesh',
  '+974': 'Qatar',
  '+965': 'Kuwait',
  '+973': 'Bahrain',
  '+962': 'Jordan',
  '+961': 'Lebanon',
  '+212': 'Morocco',
  '+886': 'Taiwan',
  '+420': 'Czech Republic',
  '+36': 'Hungary',
  '+40': 'Romania',
  '+380': 'Ukraine',
  '+358': 'Finland',
};

function extractDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

function detectCountryFromPhone(phone: string): string | null {
  const normalized = phone.trim();
  
  if (normalized.startsWith('+')) {
    const sortedPrefixes = Object.keys(countryCodePrefixes).sort((a, b) => b.length - a.length);
    
    for (const prefix of sortedPrefixes) {
      if (normalized.startsWith(prefix)) {
        return countryCodePrefixes[prefix];
      }
    }
  }
  
  if (normalized.startsWith('00')) {
    const withPlus = '+' + normalized.slice(2);
    return detectCountryFromPhone(withPlus);
  }
  
  return null;
}

export function normalizePhoneNumber(phone: string | null | undefined, country: string | null | undefined): string {
  if (!phone) return '';
  
  const cleanPhone = phone.trim();
  if (!cleanPhone) return '';
  
  let detectedCountry = country;
  
  if (cleanPhone.startsWith('+')) {
    const countryFromPhone = detectCountryFromPhone(cleanPhone);
    if (countryFromPhone && !country) {
      detectedCountry = countryFromPhone;
    }
    
    if (countryFromPhone) {
      const config = countryPhoneConfigs[countryFromPhone];
      if (config) {
        const digits = extractDigits(cleanPhone.slice(config.prefix.length));
        return config.format(digits);
      }
    }
    
    const digits = extractDigits(cleanPhone);
    return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
  }
  
  if (!detectedCountry) {
    const digits = extractDigits(cleanPhone);
    if (digits.length === 10) {
      return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    return cleanPhone;
  }
  
  const config = countryPhoneConfigs[detectedCountry];
  if (!config) {
    return cleanPhone;
  }
  
  const digits = extractDigits(cleanPhone);
  
  if (digits.startsWith(config.prefix.replace('+', ''))) {
    const localDigits = digits.slice(config.prefix.length - 1);
    return config.format(localDigits);
  }
  
  return config.format(digits);
}

export function detectCountryFromPhoneNumber(phone: string | null | undefined): string | null {
  if (!phone) return null;
  return detectCountryFromPhone(phone.trim());
}

export function getAvailableCountries(): string[] {
  return Object.keys(countryPhoneConfigs).filter(
    (country, index, array) => array.indexOf(country) === index
  ).sort();
}

export function validatePhoneFormat(phone: string, country: string): boolean {
  const config = countryPhoneConfigs[country];
  if (!config) return true;
  
  const digits = extractDigits(phone);
  
  if (config.localPattern) {
    return config.localPattern.test(digits);
  }
  
  return digits.length >= 7 && digits.length <= 15;
}
