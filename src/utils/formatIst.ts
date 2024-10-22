export const formatToShortIST = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
      // year: 'numeric',
      // month: 'long',
      // day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // timeZone: 'Asia/Kolkata',
      // timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
  };