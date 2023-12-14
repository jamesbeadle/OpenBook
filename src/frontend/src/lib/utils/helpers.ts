export function formatUnixDateToReadable(unixNano: number) {
  const date = new Date(unixNano / 1000000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-UK', options).format(date);
}

export function formatUnixDateToSmallReadable(unixNano: number) {
  const date = new Date(unixNano / 1000000);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-UK', options).format(date);
}

export function getCountdownTime(unixNano: number) {
  const targetDate = new Date(unixNano / 1000000);
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export function replacer(key: string, value: bigint) {
  if (typeof value === 'bigint') {
    return value.toString();
  } else {
    return value;
  }
}

export function formatUnixTimeToTime(unixTimeNano: number): string {
  const unixTimeMillis = unixTimeNano / 1000000;
  const date = new Date(unixTimeMillis);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

export function convertDateToReadable(nanoseconds: number): string {
  const milliseconds = nanoseconds / 1e6;
  const date = new Date(milliseconds);
  return date.toLocaleDateString('en-GB');
}

export function calculateAgeFromNanoseconds(nanoseconds: number) {
  const milliseconds = nanoseconds / 1e6;
  const birthDate = new Date(milliseconds);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

import * as FlagIcons from 'svelte-flag-icons';
export function getFlagComponent(countryCode: string) {
  switch (countryCode) {
    case 'Albania':
      return FlagIcons.Al;
    case 'Algeria':
      return FlagIcons.Dz;
    case 'Argentina':
      return FlagIcons.Ar;
    case 'Australia':
      return FlagIcons.Au;
    case 'Austria':
      return FlagIcons.At;
    case 'Belgium':
      return FlagIcons.Be;
    case 'Bosnia and Herzegovina':
      return FlagIcons.Ba;
    case 'Brazil':
      return FlagIcons.Br;
    case 'Burkina Faso':
      return FlagIcons.Bf;
    case 'Cameroon':
      return FlagIcons.Cm;
    case 'Canada':
      return FlagIcons.Ca;
    case 'Colombia':
      return FlagIcons.Co;
    case 'Costa Rica':
      return FlagIcons.Cr;
    case 'Croatia':
      return FlagIcons.Hr;
    case 'Czech Republic':
      return FlagIcons.Cz;
    case 'Denmark':
      return FlagIcons.Dk;
    case 'DR Congo':
      return FlagIcons.Cg;
    case 'Ecuador':
      return FlagIcons.Ec;
    case 'Egypt':
      return FlagIcons.Eg;
    case 'England':
      return FlagIcons.Gb;
    case 'Estonia':
      return FlagIcons.Ee;
    case 'Finland':
      return FlagIcons.Fi;
    case 'France':
      return FlagIcons.Fr;
    case 'Gabon':
      return FlagIcons.Ga;
    case 'Germany':
      return FlagIcons.De;
    case 'Ghana':
      return FlagIcons.Gh;
    case 'Greece':
      return FlagIcons.Gr;
    case 'Grenada':
      return FlagIcons.Gd;
    case 'Guinea':
      return FlagIcons.Gn;
    case 'Iceland':
      return FlagIcons.Is;
    case 'Iran':
      return FlagIcons.Ir;
    case 'Ireland':
      return FlagIcons.Ie;
    case 'Israel':
      return FlagIcons.Il;
    case 'Italy':
      return FlagIcons.It;
    case 'Ivory Coast':
      return FlagIcons.Ci;
    case 'Jamaica':
      return FlagIcons.Jm;
    case 'Japan':
      return FlagIcons.Jp;
    case 'Macedonia':
      return FlagIcons.Mk;
    case 'Mali':
      return FlagIcons.Ml;
    case 'Mexico':
      return FlagIcons.Mx;
    case 'Montserrat':
      return FlagIcons.Ms;
    case 'Morocco':
      return FlagIcons.Ma;
    case 'Netherlands':
      return FlagIcons.Nl;
    case 'Nigeria':
      return FlagIcons.Ne;
    case 'Northern Ireland':
      return FlagIcons.Gb;
    case 'Norway':
      return FlagIcons.No;
    case 'Paraguay':
      return FlagIcons.Py;
    case 'Poland':
      return FlagIcons.Pl;
    case 'Portugal':
      return FlagIcons.Pt;
    case 'Scotland':
      return FlagIcons.Gb;
    case 'Senegal':
      return FlagIcons.Sn;
    case 'Serbia':
      return FlagIcons.Rs;
    case 'Slovakia':
      return FlagIcons.Sk;
    case 'South Africa':
      return FlagIcons.Za;
    case 'South Korea':
      return FlagIcons.Kr;
    case 'Spain':
      return FlagIcons.Es;
    case 'Sweden':
      return FlagIcons.Se;
    case 'Switzerland':
      return FlagIcons.Ch;
    case 'Tunisia':
      return FlagIcons.Tn;
    case 'Turkey':
      return FlagIcons.Tr;
    case 'Ukraine':
      return FlagIcons.Ua;
    case 'United States':
      return FlagIcons.Us;
    case 'Uruguay':
      return FlagIcons.Uy;
    case 'Wales':
      return FlagIcons.Gb;
    case 'Zimbabwe':
      return FlagIcons.Zw;
    default:
      return null;
  }
}

export function getDateFromBigInt(dateMS: bigint): string {
  const dateInMilliseconds = Number(dateMS / 1000000n);
  const date = new Date(dateInMilliseconds);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function isUsernameValid(username: string): boolean {
  if (!username) {
    return false;
  }

  if (username.length < 0 || username.length > 16) {
    return false;
  }

  return /^[a-zA-Z0-9]+$/.test(username);
}

export function isDisplayNameValid(displayName: string): boolean {
  if (!displayName) {
    return false;
  }

  if (displayName.length < 0 || displayName.length > 30) {
    return false;
  }

  return /^[a-zA-Z0-9 ]+$/.test(displayName);
}

export function isNameValid(name: string): boolean {
  if (!name) {
    return false;
  }

  if (name.length < 0 || name.length > 30) {
    return false;
  }

  return /^[a-zA-Z0-9 -]+$/.test(name);
}

export function isEmailValid(email: string): boolean {
  if (!email || email.length < 5 || email.length > 254) {
    // too short or too long
    return false;
  }

  let atFound = false;
  let dotFound = false;

  for (const c of email) {
    if (c === '@') {
      if (atFound) {
        // Multiple '@' symbols found
        return false;
      }
      atFound = true;
    } else if (atFound && c === '.') {
      dotFound = true;
    }
  }

  return atFound && dotFound;
}

export function isPhoneValid(phone: string): boolean {
  if (!phone || phone.length > 30) {
    return false;
  }

  const isAlphanumeric = (s: string): boolean => {
    for (const c of s) {
      if (!/[a-zA-Z0-9 +()-]/.test(c)) {
        return false;
      }
    }
    return true;
  };

  return isAlphanumeric(phone);
}
